using MachineAPi.Models.Domain;
using System.Reflection.PortableExecutable;

namespace MachineAPi.Repository
{
    public interface IMachineRepository
    {
        //Machine
        Task<IEnumerable<MachineDetails>> GetMachineDetailsAsync();
        Task<MachineDetails> GetMachineDetailsByIdAsync(int machineId);
        Task<MachineDetails> AddMachineDetailsAsync(MachineDetails machine);
        Task<IEnumerable<MachineDetails>> GetMachineDetailsByUserIdAsync(int id);
        Task<IEnumerable<MachineDetails>> GetMachineDetailsByShopIdAsync(int id);
        Task<MachineDetails> UpdateMachineDetailsAsync(int id, MachineDetails machine);
        Task<MachineDetails> DeleteMachineDetailsAsync(int id);
        Task<Boolean> UnlockMachineAsync(string machineName, int pin);
        Task<Boolean> LockMachineAsync(List<string> machineNameList);

        //Shop
        Task<IEnumerable<ShopDetails>> GetShopDetailsAsync();
        Task<ShopDetails> AddShopDetailsAsync(ShopDetails shopDetails,int id);
        Task<IEnumerable<ShopDetails>> GetShopDetailsByUserIdAsync(int id);
        Task<ShopDetails> UpdateShopDetailsAsync(int id, ShopDetails shopDetails);
        Task<ShopDetails> DeleteShopDetailsAsync(int id);
        Task<IEnumerable<ShopDetails>> GetShopByCityAsync(string city);
        Task<ShopDetails> GetShopByIdAsync(int id);



    }
}
