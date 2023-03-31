using AutoMapper;
using BookingApi.Model.Domain;
using BookingApi.Model.DTO;
using BookingApi.Repositories.Interfaces;
using MailKit.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MimeKit.Text;

using MailKit.Net.Smtp;
using System.Reflection.PortableExecutable;
using System.Runtime.InteropServices;
using UserAPI.Model.Domain;
using UserAPI.Repositories;
using System.IO;
using System.Reflection.Metadata;
using System.Threading.Tasks;

namespace BookingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private IConfiguration _config;
        private readonly IBookingRepository bookingRepository;
        private readonly IMapper mapper;
        private readonly IUserRepository userRepository;
        public BookingController(IBookingRepository _bookingRepository, IMapper _mapper, IConfiguration config, IUserRepository _userRepository)
        {
            bookingRepository = _bookingRepository;
            mapper = _mapper;
            _config = config;
            userRepository = _userRepository;
        }

       



       


        //ReservationOfType Controller

        [HttpGet("Reservations")]
        //[Authorize(Roles = "Client")]
        public async Task<IActionResult> GetReservatiosOfTypeAsync()
        {
            var allReserv = await bookingRepository.GetReservatiosOfTypeAsync();

            if (allReserv == null)
            { return NoContent();
            }
            var reservationOfTypeDto = mapper.Map<List<ReservationOfTypeDto>>(allReserv);
            return Ok(reservationOfTypeDto);
        }

        [HttpGet("ReservationsById")]
        //[Authorize(Roles = "Client")]
        public async Task<IActionResult> GetReservationOfTypeByIdAsync(int id)
        {
            var allReserv = await bookingRepository.GetReservationOfTypeByIdAsync(id);
            if (allReserv == null)
            {
                return NoContent();
            }

            var reservationsOfTypeDto = mapper.Map<ReservationOfTypeDto>(allReserv);
            return Ok(reservationsOfTypeDto);
        }

        [HttpPost("Reservations")]
        //[Authorize(Roles = "Owner")]
        public async Task<IActionResult> AddReservationOfTypeAsync(ReservationOfType reservationOfType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                var reserv = new ReservationOfType()
                {
                    ReservationType = reservationOfType.ReservationType,
                    MachineCycleTime= 60,
                    Charges = reservationOfType.Charges,

                };

                reservationOfType = await bookingRepository.AddReservationOfTypeAsync(reserv);
                var reservationOfTypeDto = mapper.Map<ReservationOfTypeDto>(reservationOfType);
                return Ok(reservationOfTypeDto);
            }
        }

        [HttpDelete("ReservationsbyId")]
        //[Authorize(Roles = "Owner")]
        public async Task<IActionResult> DeleteReservationOfTypeAsync(int id)
        {
            var reserv = await bookingRepository.DeleteReservationOfTypeAsync(id);
            if (reserv == null)
                return BadRequest();
            else
            {
                var reservationOfTypeDto = mapper.Map<ReservationOfTypeDto>(reserv);
                return Ok(reservationOfTypeDto);
            }
        }

        [HttpPut("Reservations")]
       // [Authorize(Roles = "Owner")]
        public async Task<IActionResult> UpdateResevationOfTypeAsync(int id, ReservationOfType reservationOfType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                var reserv = await bookingRepository.UpdateResevationOfTypeAsync(id, reservationOfType);
                if (reservationOfType == null)
                {
                    return NoContent();
                }
                else
                {
                    var reservationOfTypeDto = mapper.Map<ReservationOfTypeDto>(reserv);
                    return Ok(reservationOfTypeDto);
                }
            }
        }

        ////SlotBooking Controller

        [HttpGet("SlotBooking")]
       // [Authorize(Roles = "Client")]
        public async Task<IActionResult> GetSlotBookingsAsync()
        {
            var allSlots = await bookingRepository.GetSlotBookingsAsync();

            if (allSlots == null)
            {
                return NoContent();
            }
            var slotBookingDto = mapper.Map<List<SlotBookingDto>>(allSlots);
            return Ok(slotBookingDto);
        }

        [HttpGet("SlotBookingByUserId")]
       // [Authorize(Roles = "Client")]
        public async Task<IActionResult> GetSlotBookingByIdAsync(int id)
        {
            var allSlot = await bookingRepository.GetSlotBookingByUserIdAsync(id);
            if (allSlot == null)
            {
                return NoContent();
            }

           // var slotBookingDto = mapper.Map<SlotBookingDto>(allSlot);
            return Ok(allSlot);
        }


        [HttpPost("SlotBooking")]
        //[Authorize(Roles = "Client")]
        public async Task<IActionResult> AddSlotBookingAsync(SlotBooking slotBooking,string machineName)
         {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                var slot = new SlotBooking()
                {
                    BookingDateTime = DateTime.Now,
                    BookingStartTime = slotBooking.BookingStartTime,
                    BookingEndTime = slotBooking.BookingEndTime,
                    ReservationId = slotBooking.ReservationId,
                    UserId = slotBooking.UserId,
                    MachineId = slotBooking.MachineId,
                    Bill = slotBooking.Bill,
                    Pin = slotBooking.Pin,
                    ShopId= slotBooking.ShopId,

                };
                
                var user = await userRepository.GetUserByIdAsync(slotBooking.UserId);
                slotBooking = await bookingRepository.AddSlotBookingAsync(slot);
                var slotBookingDto = mapper.Map<SlotBooking>(slotBooking);
                SendEmail(slot, user, machineName);
                return Ok(slotBookingDto);
            }
        }

        [HttpDelete("SlotBookingById")]
        //[Authorize(Roles = "Client")] 
        public async Task<IActionResult> DeleteSlotBookingAsync(int id)
        {
            var slot = await bookingRepository.DeleteSlotBookingAsync(id);
            if (slot == null)

                return NotFound();

            else

            {

                var slotBookingDto = mapper.Map<SlotBookingDto>(slot);

                var user = await userRepository.GetUserByIdAsync(slot.UserId);

                SendCancellationEmailByUser(slot, user);

                return Ok(slotBookingDto);

            }

        }

        [HttpPut("SlotBooking")]
       // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSlotBookingAsync(int id, SlotBooking slotBooking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                var slots = await bookingRepository.UpdateSlotBookingAsync(id, slotBooking);
                if (slotBooking == null)
                {
                    return NoContent();
                }
                else
                {
                    var slotBookingDto = mapper.Map<SlotBooking>(slots);
                    return Ok(slotBookingDto);
                }
            }
        }
        [HttpGet("BookingsByShopId")]
        public async Task<IActionResult> GetSlotBookingsByShopIdAsync(int shopId, DateTime bookingStartTime)
        {
            var allSlots = await bookingRepository.GetSlotBookingsByShopIdAsync( shopId, bookingStartTime);

            //if (allSlots == null)
            //{
            //    return NoContent();
            //}
            var slotBookingDto = mapper.Map<List<SlotBookingDto>>(allSlots);
            return Ok(slotBookingDto);
        }

        

        [HttpDelete("SlotBookingByMachineId")]

        //[Authorize(Roles = "Client")] 

        public async Task<IActionResult> DeleteSlotBookingByMachIdAsync(int id)

        {

            var slot = await bookingRepository.DeleteSlotBookingByMachineIdAsync(id);

            if (slot == null)

                return NotFound();

            else

            {

                var slotBookingDto = mapper.Map<SlotBookingDto>(slot);

                var user = await userRepository.GetUserByIdAsync(slot.UserId);

                SendCancellationEmailByOwner(slot, user);

                return Ok(slotBookingDto);

            }

        }

        [HttpDelete("SlotBookingByShopId")]

        //[Authorize(Roles = "Client")] 

        public async Task<IActionResult> DeleteSlotBookingByShopIdAsync(int id)

        {

            var slot = await bookingRepository.DeleteSlotBookingByShopIdAsync(id);

            if (slot == null)

                return NotFound();

            else

            {

                var slotBookingDto = mapper.Map<SlotBookingDto>(slot);

                var user = await userRepository.GetUserByIdAsync(slot.UserId);

                SendCancellationEmailByOwner(slot, user);

                return Ok(slotBookingDto);

            }

        }

        //MachineSlot Controller

        [HttpGet("MachineSlotDetail")]
        public async Task<IActionResult> GetMachineSlotDetailsAsync()
        {
            var allMslot = await bookingRepository.GetMachineSlotDetailsAsync();

            if (allMslot == null)
            {
                return NoContent();
            }
            var machineSlotDetailsDto = mapper.Map<List<MachineSlotDetail>>(allMslot);
            return Ok(machineSlotDetailsDto);
        }

        [HttpGet("MachineSlotDetailById")]
        public async Task<IActionResult> GetMachineSlotDetailByIdAsync(int id)
        {
            var allMslot = await bookingRepository.GetMachineSlotDetailByIdAsync(id);
            if (allMslot == null)
            {
                return NoContent();
            }

            var machineSlotDetailsDto = mapper.Map<MachineSlotDetail>(allMslot);
            return Ok(machineSlotDetailsDto);
        }

        [HttpPost("MachineSlotDetail")]
        public async Task<IActionResult> AddMachineSlotDetailAsync(MachineSlotDetail machineSlotDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                var Mslot = new MachineSlotDetail()
                {
                    MachineId = machineSlotDetail.MachineId,
                    ShopId = machineSlotDetail.ShopId,
                    SlotBookinId = machineSlotDetail.SlotBookinId

                };

                machineSlotDetail = await bookingRepository.AddMachineSlotDetailAsync(Mslot);
                var machineSlotDetailDto = mapper.Map<MachineSlotDetailDto>(machineSlotDetail);
                return Ok(machineSlotDetailDto);
            }
        }

        [HttpDelete("MachineSlotDetailById")]
        public async Task<IActionResult> DeleteMachineSlotDetailAsync(int id)
        {
            var Mslot = await bookingRepository.DeleteMachineSlotDetailAsync(id);
            if (Mslot == null)
                return BadRequest();
            else
            {
                var machineSlotDetailDto = mapper.Map<MachineSlotDetailDto>(Mslot);
                return Ok(machineSlotDetailDto);
            }
        }

        [HttpPut("MachineSlotDetail")]
        public async Task<IActionResult> UpdateMachineSlotDetailAsync(int id, MachineSlotDetail machineSlotDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                var Mslot = await bookingRepository.UpdateMachineSlotDetailAsync(id, machineSlotDetail);
                if (machineSlotDetail == null)
                {
                    return NoContent();
                }
                else
                {
                    var machineSlotDetailtDto = mapper.Map<MachineSlotDetailDto>(Mslot);
                    return Ok(machineSlotDetailtDto);
                }
            }
        }
        //EmailSending...



        [NonAction]
        public void SendEmail(SlotBooking slotBooking, User user, string machineName)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
            email.To.Add(MailboxAddress.Parse(user.UserEmail));
            email.Subject = "LaundroMart Booking Confirmed";


            string body = "<p>Hello, " + user.UserFirstName + " " + user.UserLastName + "</p>\r\n<p>Thank you for booking with LaundroMart.You’ll find details of your reservation and payment details enclosed below. </p>\r\n<p>Booking Date Time :" + slotBooking.BookingDateTime + " ," + " </p>\r\n<p>Booking Start Time : " + slotBooking.BookingStartTime + " ," + "</p>\r\n<p>Booking End Time :  " + slotBooking.BookingEndTime + " ," + "</p>\r\n<p>Machine Name :" + machineName + " ," + "</p>\r\n<p>Machine Pin :" + slotBooking.Pin + " ," + "</p>\r\n<p>Bill : ₹\t" + slotBooking.Bill + " ," + "</p>\r\n<p>If you need to get in touch, you can email or phone us directly.We look forward to welcoming you ! </p>\r\n<p>Thanks again, </p>\r\n<p>The team at Laundromart</p>\r\n<p></p>\r\n</div>";



            email.Body = new TextPart(TextFormat.Html)
            {
                Text = body
            };
            using var smtp = new SmtpClient();
            smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
        //            SendEmail("himanshutrip780@gmail.com");

        [NonAction]

        public void SendCancellationEmailByOwner(SlotBooking slotBooking, User user)

        {

            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));

            email.To.Add(MailboxAddress.Parse(user.UserEmail));

            email.Subject = "Laundromart Booking Reservation Cancellation";

            string body = "<p>Hi," + user.UserFirstName + " " + user.UserLastName + "</p>\r\n<p>Due to Some unavoidable circumstances ,the LaundroMart service  that you booked has been cancelled. You could find your details below.</p>\r\n<p>" + "</p>\r\n<p>Cancellation Date Time:" + DateTime.Now + "</p>\r\n<p>Booking Date :" + slotBooking.BookingDateTime + "</p>\r\n<p>Booking Start Time :" + slotBooking.BookingStartTime + "</p>\r\n<p>Booking End Time :" + slotBooking.BookingEndTime + "</p>\r\n<p></p>\r\n<p>If you need to get in touch, you can email or phone us directly. We look forward to welcoming you !</p>\r\n<p> Thanks again,</p>\r\n<p>The team at Laundromart</p>\r\n</body>\r\n</html>";

            email.Body = new TextPart(TextFormat.Html)

            {

                Text = body

            };

            using var smtp = new SmtpClient();

            smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);

            smtp.Authenticate(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);

            smtp.Send(email);

            smtp.Disconnect(true);



        }

        [NonAction]

        public void SendCancellationEmailByUser(SlotBooking slotBooking, User user)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
            email.To.Add(MailboxAddress.Parse(user.UserEmail));
            email.Subject = "Cancellation of Booking Reservation";
            string body = "<p>Hi," + user.UserFirstName + " "+ user.UserLastName + "</p>\r\n<p>We have received your request to cancel the LaundroMart service  that was booked with us. You could find your cancellation details below.</p>\r\n<p>" + "</p>\r\n<p>Cancellation Date Time:" + DateTime.Now +"</p>\r\n<p>Booking Date :" + slotBooking.BookingDateTime + "</p>\r\n<p>Booking Start Time :" + slotBooking.BookingStartTime+"</p>\r\n<p>Booking End Time :" + slotBooking.BookingEndTime+"</p>\r\n<p></p>\r\n<p>If you need to get in touch, you can email or phone us directly. We look forward to welcoming you !</p>\r\n<p> Thanks again,</p>\r\n<p>The team at Laundromart</p>\r\n</body>\r\n</html>";

            email.Body = new TextPart(TextFormat.Html)

            {

                Text = body

            };

            using var smtp = new SmtpClient();

            smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);

            smtp.Authenticate(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);

            smtp.Send(email);

            smtp.Disconnect(true);



        }
    }
}
