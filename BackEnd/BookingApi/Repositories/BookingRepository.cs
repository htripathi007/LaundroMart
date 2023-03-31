using BookingApi.Data;
using BookingApi.Model.Domain;
using BookingApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BookingApi.Repositories
{
    public class BookingRepository : IBookingRepository
    {

        private readonly BookingApiDBContext bookingApiDbContext;

        public BookingRepository(BookingApiDBContext _bookingDbContext)
        {
            bookingApiDbContext = _bookingDbContext;
        }

        //ReservationOTypeRepository


        public async Task<IEnumerable<ReservationOfType>> GetReservatiosOfTypeAsync()
        {
            return await bookingApiDbContext.ReservationOfTypes.ToListAsync();
        }

        public async Task<ReservationOfType> GetReservationOfTypeByIdAsync(int id)
        {
            var reserv = await bookingApiDbContext.ReservationOfTypes.FirstOrDefaultAsync(x => x.ReservationId == id);
            return reserv;
        }

        public async Task<ReservationOfType> AddReservationOfTypeAsync(ReservationOfType reservationOfType)
        {
            await bookingApiDbContext.AddAsync(reservationOfType);
            await bookingApiDbContext.SaveChangesAsync();
            return reservationOfType;
        }

        public async Task<ReservationOfType> DeleteReservationOfTypeAsync(int id)
        {
            var reserv = await bookingApiDbContext.ReservationOfTypes.FirstOrDefaultAsync(x => x.ReservationId == id);
            if (reserv == null)
            {
                return null;
            }
            else
            {
                bookingApiDbContext.ReservationOfTypes.Remove(reserv);
                await bookingApiDbContext.SaveChangesAsync();
            }

            return reserv;
        }

        public async Task<ReservationOfType> UpdateResevationOfTypeAsync(int id, ReservationOfType reservationOfType)
        {
            var reserv = await bookingApiDbContext.ReservationOfTypes.Where(x => x.ReservationId == id).SingleAsync();
            if (reserv == null)
            {
                return null;
            }
            else
            {
                reserv.Charges = reservationOfType.Charges;
                reserv.ReservationType = reservationOfType.ReservationType;
                reserv.MachineCycleTime = reservationOfType.MachineCycleTime;

                bookingApiDbContext.ReservationOfTypes.Update(reserv);
                await bookingApiDbContext.SaveChangesAsync();
            }

            return reserv;
        }

        //SlotBookingRepository

        public async Task<IEnumerable<SlotBooking>> GetSlotBookingsAsync()
        {
            return await bookingApiDbContext.SlotBookings.ToListAsync();
        }

        public async Task<IEnumerable<SlotBooking>> GetSlotBookingByUserIdAsync(int id)
        {
            var bookings = await bookingApiDbContext.SlotBookings.ToListAsync();
            List<SlotBooking> myBookings = new List<SlotBooking>();

            foreach (var item in bookings)
            {
                if (item.UserId == id )
                {
                    myBookings.Add(item);

                }
            }
            return myBookings;
        }

        public async Task<SlotBooking> AddSlotBookingAsync(SlotBooking slotBooking)
        {
            await bookingApiDbContext.AddAsync(slotBooking);
            await bookingApiDbContext.SaveChangesAsync();
            return slotBooking;
        }


        public async Task<SlotBooking> DeleteSlotBookingAsync(int id)
        {
            var slot = await bookingApiDbContext.SlotBookings.FirstOrDefaultAsync(x => x.BookingId == id);
            if (slot == null)
            {
                return null;
            }
            else
            {
                bookingApiDbContext.SlotBookings.Remove(slot);
                await bookingApiDbContext.SaveChangesAsync();
            }

            return slot ;
        }

        public async Task<SlotBooking> UpdateSlotBookingAsync(int id, SlotBooking slotBooking)
        {
            var slot = await bookingApiDbContext.SlotBookings.Where(x => x.BookingId == id).SingleAsync();
            if (slot == null)
            {
                return null;
            }
            else
            {
                slot.BookingDateTime = slotBooking.BookingDateTime;
                slot.BookingStartTime = slotBooking.BookingStartTime;
                slot.BookingEndTime = slotBooking.BookingEndTime;
                slot.ReservationId = slotBooking.ReservationId;
                slot.UserId = slotBooking.UserId;
                slot.MachineId = slotBooking.MachineId;
                slot.Bill = slotBooking.Bill;
                slot.Pin = slotBooking.Pin;

                bookingApiDbContext.SlotBookings.Update(slot);
                await bookingApiDbContext.SaveChangesAsync();

            }

            return slot;
        }
        public async Task<IEnumerable<SlotBooking>> GetSlotBookingsByShopIdAsync(int shopId,DateTime bookingStartTime)
        {
            var bookings = await bookingApiDbContext.SlotBookings.ToListAsync();
            List<SlotBooking> slotBookings = new List<SlotBooking>();

            foreach (var item in bookings)
            {
                if (item.ShopId == shopId&& item.BookingStartTime == bookingStartTime)
                {
                    slotBookings.Add(item);

                }
            }
            return slotBookings;
        }

        public async Task<SlotBooking> DeleteSlotBookingByMachineIdAsync(int id)

        {

            var slot = await bookingApiDbContext.SlotBookings.FirstOrDefaultAsync(x => x.BookingId == id);

            if (slot == null)

            {
                return null;

            }
            else

            {
                bookingApiDbContext.SlotBookings.Remove(slot);

                await bookingApiDbContext.SaveChangesAsync();

            }
            return slot;
        }

        public async Task<SlotBooking> DeleteSlotBookingByShopIdAsync(int id)

        {

            var slot = await bookingApiDbContext.SlotBookings.FirstOrDefaultAsync(x => x.BookingId == id);

            if (slot == null)

            {

                return null;

            }

            else

            {
                bookingApiDbContext.SlotBookings.Remove(slot);

                await bookingApiDbContext.SaveChangesAsync();

            }
            return slot;

        }

       

        //MachineSlotDetailRepository

        public async Task<IEnumerable<MachineSlotDetail>> GetMachineSlotDetailsAsync()
        {
            return await bookingApiDbContext.MachineSlotDetails.ToListAsync();
        }
        public async Task<MachineSlotDetail> GetMachineSlotDetailByIdAsync(int id)
        {
            return await bookingApiDbContext.MachineSlotDetails.FirstOrDefaultAsync(x => x.MachineSlotId == id);
        }

        public async Task<MachineSlotDetail> AddMachineSlotDetailAsync(MachineSlotDetail machineSlotDetail)
        {
            await bookingApiDbContext.MachineSlotDetails.AddAsync(machineSlotDetail);
            await bookingApiDbContext.SaveChangesAsync();
            return machineSlotDetail;
        }

        public async Task<MachineSlotDetail> DeleteMachineSlotDetailAsync(int id)
        {
            var Mslot = await bookingApiDbContext.MachineSlotDetails.FirstOrDefaultAsync(x => x.MachineSlotId == id);
            if (Mslot == null)
            {
                return null;
            }
            else
            {
                bookingApiDbContext.MachineSlotDetails.Remove(Mslot);
                await bookingApiDbContext.SaveChangesAsync();
            }
            return Mslot;
        }

        public async Task<MachineSlotDetail> UpdateMachineSlotDetailAsync(int id, MachineSlotDetail machineSlotDetail)
        {
            var Mslot = await bookingApiDbContext.MachineSlotDetails.SingleAsync(x => x.MachineSlotId == id);
            if (Mslot == null)
            {
                return null;
            }
            else
            {
                Mslot.MachineId = machineSlotDetail.MachineId;
                Mslot.ShopId = machineSlotDetail.ShopId;
                Mslot.SlotBookinId = machineSlotDetail.SlotBookinId;

                bookingApiDbContext.Update(Mslot);
                await bookingApiDbContext.SaveChangesAsync();
            }
            return Mslot;
        }

        
    }
}
