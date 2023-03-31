using AutoMapper;
using MachineAPi.Models.Domain;
using MachineAPi.Models.Dto;
using MachineAPi.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Reflection.PortableExecutable;


namespace MachineAPi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private readonly IMachineRepository machineRepository;
        private readonly IMapper mapper; 
        public MachineController(IMachineRepository _machineRepository,IMapper _mapper)
        {
            machineRepository= _machineRepository;
            mapper= _mapper;
        }
        [HttpGet("Machine")]
       // [Authorize(Roles = "Owner")]
        // [Authorize]
        public async Task<IActionResult> GetAllMachinesAsync()
        {
            var allmachines = await machineRepository.GetMachineDetailsAsync();
            if (allmachines.Count() == 0)
            {
                return NoContent();
            }
            var macDto = mapper.Map<List<MachineDto>>(allmachines);
            return Ok(macDto);

        }
        [HttpGet("MachineByShopId")]
       // [Authorize(Roles = "Owner")]
        public async Task<IActionResult> GetMachineByShopIdAsync(int id)
        {
            var machineByShopId = await machineRepository.GetMachineDetailsByShopIdAsync(id);
            if (machineByShopId.Count() == 0)
            {
                return NoContent();
            }
            var macDto = mapper.Map<List<MachineDto>>(machineByShopId);
            return Ok(macDto);
        }
        [HttpGet("MachineId")]
        // [Authorize(Roles = "Client")]
        public async Task<IActionResult> GetMachineByIdAsync(int machineId)
        {
            var machine = await machineRepository.GetMachineDetailsByIdAsync(machineId);
            if (machine == null)
            {
                return NoContent();
            }

            // var slotBookingDto = mapper.Map<SlotBookingDto>(allSlot);
            return Ok(machine);
        }
        [HttpGet("MachineByUserId")]
        //[Authorize(Roles = "Owner")]
        public async Task<IActionResult> GetMachineByUserIdAsync(int id)
        {
            var machineByUserId = await machineRepository.GetMachineDetailsByUserIdAsync(id);
            if (machineByUserId.Count() == 0)
            {
                return NoContent();
            }
            var macDto = mapper.Map<List<MachineDto>>(machineByUserId);
            return Ok(macDto);
        }
        [HttpPost("Machine")]
        //[Authorize(Roles = "Owner")]
        public async Task<IActionResult> AddMachineDetailsAsync(MachineDetails machine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                var machineModel = new MachineDetails()
                {
                    MachineName = machine.MachineName,
                    MachineCapacity= machine.MachineCapacity,
                    SerialNumber= machine.SerialNumber,
                    WorkingStatus= machine.WorkingStatus,
                    UserId= machine.UserId,
                    ShopId= machine.ShopId,
                    
                };
                machine = await machineRepository.AddMachineDetailsAsync(machineModel);

                var machineDto = mapper.Map<MachineDto>(machine);

                return Created("Created Successfully", machineDto);
            }
        }
        [HttpPut("Machine")]
        //[Authorize(Roles = "Owner")]

        public async Task<IActionResult> UpdateMachineAsync(MachineDetails machine, int id)
        {
            var mac = await machineRepository.UpdateMachineDetailsAsync(id,machine);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else if (mac == null)
            {
                return NotFound();
            }
            else
            {
                var macDto = mapper.Map<MachineDetails>(mac);
                return Ok(macDto);
            }
        }
        [HttpDelete("Machine")]
        //[Authorize(Roles = "Owner")]

        public async Task<IActionResult> DeleteMachineAsync(int id)
        {
            var mac = await machineRepository.DeleteMachineDetailsAsync(id);
            if (mac == null)
            {
                return NotFound();
            }
            var macDto = mapper.Map<MachineDto>(mac);
            return Ok(macDto);
        }
        [HttpGet("Shop")]
        //[Authorize(Roles = "Owner")]
        public async Task<IActionResult> GetAllShopsAsync()
        {
            var allShops = await machineRepository.GetShopDetailsAsync();
            if (allShops.Count() == 0)
            {
                return NoContent();
            }
            var shopDto = mapper.Map<List<ShopDto>>(allShops);
            return Ok(shopDto);

        }
        [HttpGet("ShopByUserId")]
        public async Task<IActionResult> GetShopByUserIdAsync(int id)
        {
            var shopByUserId = await machineRepository.GetShopDetailsByUserIdAsync(id);
            if (shopByUserId.Count() == 0)
            {
                return NoContent();
            }
            var macDto = mapper.Map<List<ShopDto>>(shopByUserId);
            return Ok(macDto);
        }
        [HttpPost("Shop")]
        //[Authorize(Roles = "Owner")]
        public async Task<IActionResult> AddShopAsync(ShopDetails shopDetails,int id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                var shopModel = new ShopDetails()
                {
                    ShopName= shopDetails.ShopName,
                    ShopArea= shopDetails.ShopArea,
                    ShopCity= shopDetails.ShopCity,
                    ShopPinCode= shopDetails.ShopPinCode,
                    ShopStartTime = shopDetails.ShopStartTime,
                    ShopEndTime = shopDetails.ShopEndTime,
                    ShopWorkingStatus = shopDetails.ShopWorkingStatus,
                    UserId= id,
                };
                shopDetails = await machineRepository.AddShopDetailsAsync(shopModel,id);

                var shopDto = mapper.Map<ShopDto>(shopDetails);

                return Created("Created Successfully", shopDto);
            }
        }
        [HttpPut("Shop")]
        //[Authorize(Roles = "Owner")]
        public async Task<IActionResult> UpdateShopAsync(ShopDetails shopDetails, int id)
        {
            var shop = await machineRepository.UpdateShopDetailsAsync(id, shopDetails);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else if (shop == null)
            {
                return NotFound();
            }
            else
            {
                var shopDto = mapper.Map<ShopDetails>(shop);
                return Ok(shopDto);
            }
        }
        [HttpDelete("Shop")]
        //[Authorize(Roles = "Owner")]
        public async Task<IActionResult> DeleteShopAsync(int id)
        {
            var shop = await machineRepository.DeleteShopDetailsAsync(id);
            if (shop == null)
            {
                return NotFound();
            }
            var shopDto = mapper.Map<ShopDto>(shop);
            return Ok(shopDto);
        }
        [HttpGet("ShopByCity")]
        // [Authorize(Roles = "Owner")]
        public async Task<IActionResult> GetShopByCityNameAsync(string city)
        {
            var shopByCity = await machineRepository.GetShopByCityAsync(city);
            if (shopByCity.Count() == 0)
            {
                return NoContent();
            }
            var macDto = mapper.Map<List<ShopDto>>(shopByCity);
            return Ok(macDto);
        }
        [HttpGet("ShopId")]
        // [Authorize(Roles = "Client")]
        public async Task<IActionResult> GetShopByIdAsync(int id)
        {
            var shop = await machineRepository.GetShopByIdAsync(id);
            if (shop == null)
            {
                return NoContent();
            }

            // var slotBookingDto = mapper.Map<SlotBookingDto>(allSlot);
            return Ok(shop);
        }

        //lock and unlock machine
        [HttpPost("Unlock")]
        public async Task<IActionResult> UnlockMachineAsync(string machineName, int pin)
        {
            var lockStatus = await machineRepository.UnlockMachineAsync(machineName, pin);
            if (lockStatus == false)
            {
                return NoContent();
            }
            return Ok(lockStatus);
        }

        [HttpPut("Lock")]
        public async Task<IActionResult> lockMachineAsync(List<string> machineNameList)
        {
            var lockStatus = await machineRepository.LockMachineAsync(machineNameList);



            if (lockStatus == false)
            {
                return NoContent();
            }
            return Ok(lockStatus);
        }
    }
}
