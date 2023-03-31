using MachineAPi.Data;
using MachineAPi.Models.Domain;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Reflection.PortableExecutable;

namespace MachineAPi.Repository
{
    public class MachineRepository : IMachineRepository
    {
        public MachineRepository machineRepository;
        public readonly MachineDbContext machineDbContext;
        public readonly BookingApi.Data.BookingApiDBContext bookingDbContext;
        public MachineRepository(MachineDbContext _machineDbContext, BookingApi.Data.BookingApiDBContext _bookingDbContext)
        {
            machineDbContext = _machineDbContext;
            bookingDbContext = _bookingDbContext;
        }

        public async Task<IEnumerable<MachineDetails>> GetMachineDetailsAsync()
        {
            return await machineDbContext.Machine.ToListAsync();
        }

        public async Task<MachineDetails> AddMachineDetailsAsync(MachineDetails machine)
        {
            await machineDbContext.Machine.AddAsync(machine);
            await machineDbContext.SaveChangesAsync();
            return machine;
        }

        public async Task<IEnumerable<MachineDetails>> GetMachineDetailsByUserIdAsync(int id)
        {
            var mac = await machineDbContext.Machine.ToListAsync();
            List<MachineDetails> machine = new List<MachineDetails>();

            foreach (var item in mac)
            {
                if (item.UserId == id)
                {
                    machine.Add(item);

                }
            }
            return machine;
        }
        public async Task<IEnumerable<MachineDetails>> GetMachineDetailsByShopIdAsync(int id)
        {
            var mac = await machineDbContext.Machine.ToListAsync();
            List<MachineDetails> machine = new List<MachineDetails>();

            foreach (var item in mac)
            {
                if (item.ShopId == id)
                {
                    machine.Add(item);

                }
            }
            return machine;
        }
        public async Task<MachineDetails> GetMachineDetailsByIdAsync(int machineId)
        {
            return await machineDbContext.Machine.FirstOrDefaultAsync(x => x.MachineId == machineId);

        }

        public async Task<MachineDetails> UpdateMachineDetailsAsync(int id, MachineDetails machine)
        {
            var mac = await machineDbContext.Machine.FirstOrDefaultAsync(x => x.MachineId == id);
            if (mac == null)
            {
                return null;
            }
            else
            {

                mac.MachineName = machine.MachineName;
                mac.SerialNumber = machine.SerialNumber;
                mac.MachineCapacity = machine.MachineCapacity;
                mac.WorkingStatus = machine.WorkingStatus;
                mac.LockStatus= machine.LockStatus;
                mac.ShopId= machine.ShopId;
                machineDbContext.Update(mac);
                await machineDbContext.SaveChangesAsync();
            }
            return mac;
        }

        public async Task<MachineDetails> DeleteMachineDetailsAsync(int id)
        {
            var machine = await machineDbContext.Machine.SingleAsync(x => x.MachineId == id);
            if (machine == null)
            {
                return null;
            }
            else
            {
                machineDbContext.Remove(machine);
                await machineDbContext.SaveChangesAsync();
            }
            return machine;
        }

        //Shop
        public async Task<IEnumerable<ShopDetails>> GetShopDetailsAsync()
        {
            return await machineDbContext.Shop.ToListAsync();
        }

        public async Task<ShopDetails> AddShopDetailsAsync(ShopDetails shopDetails,int id)
        {
            await machineDbContext.Shop.AddAsync(shopDetails);
            await machineDbContext.SaveChangesAsync();
            return shopDetails;
        }

        public async Task<IEnumerable<ShopDetails>> GetShopDetailsByUserIdAsync(int id)
        {
            var shop = await machineDbContext.Shop.ToListAsync();
            List<ShopDetails> shopDetails = new List<ShopDetails>();

            foreach (var item in shop)
            {
                if (item.UserId == id)
                {
                    shopDetails.Add(item);

                }
            }
            return shopDetails;
        }
        public async Task<ShopDetails> GetShopByIdAsync(int id)
        {
            return await machineDbContext.Shop.FirstOrDefaultAsync(x => x.ShopId == id);

        }

        public async Task<ShopDetails> UpdateShopDetailsAsync(int id, ShopDetails shopDetails)
        {
            var shop = await machineDbContext.Shop.FirstOrDefaultAsync(x => x.ShopId == id);
            if (shop == null)
            {
                return null;
            }
            else
            {

                shop.ShopArea = shopDetails.ShopArea;
                shop.ShopName = shopDetails.ShopName;
                shop.ShopPinCode = shopDetails.ShopPinCode;
                shop.ShopWorkingStatus = shopDetails.ShopWorkingStatus;
                shop.ShopCity = shopDetails.ShopCity;
                shop.ShopStartTime = shopDetails.ShopStartTime;
                shop.ShopEndTime = shopDetails.ShopEndTime;

                machineDbContext.Update(shop);
                await machineDbContext.SaveChangesAsync();
            }
            return shop;
        }

        public async Task<ShopDetails> DeleteShopDetailsAsync(int id)
        {
            var shop = await machineDbContext.Shop.SingleAsync(x => x.ShopId == id);
            if (shop == null)
            {
                return null;
            }
            else
            {
                machineDbContext.Remove(shop);
                await machineDbContext.SaveChangesAsync();
            }
            return shop;
        }

        public async Task<IEnumerable<ShopDetails>> GetShopByCityAsync(string city)
        {
            var shop = await machineDbContext.Shop.ToListAsync();
            List<ShopDetails> shopDetails = new List<ShopDetails>();

            foreach (var item in shop)
            {
                if (item.ShopCity == city)
                {
                    shopDetails.Add(item);

                }
            }
            return shopDetails;
        }

        public async Task<bool> UnlockMachineAsync(string machineName, int pin)
        {
            var machine = await machineDbContext.Machine.FirstOrDefaultAsync(x => x.MachineName == machineName);
            var booking1 = await bookingDbContext.SlotBookings.FirstOrDefaultAsync(x => x.Pin == pin);
            var booking2 = await bookingDbContext.SlotBookings.FirstOrDefaultAsync(x => x.MachineId == machine.MachineId);
            if (booking1 == booking2)
            {
                if (machine == null)
                {
                    return false;
                }
                else
                {
                    machine.LockStatus = false;
                    machineDbContext.Update(machine);
                    await machineDbContext.SaveChangesAsync();
                    return true;
                }
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> LockMachineAsync(List<string> machineNameList)
        {
            foreach (var machineName in machineNameList)
            {
                var machine = await machineDbContext.Machine.FirstOrDefaultAsync(x => x.MachineName == machineName);
                machine.LockStatus = true;
                machineDbContext.Update(machine);
                await machineDbContext.SaveChangesAsync();
                machine = null;
            }
            return true;
        }
    }
}
