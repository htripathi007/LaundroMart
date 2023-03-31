namespace MachineAPi.Models.Dto
{
    public class MachineDto
    {
        public int MachineId { get; set; }
        public string MachineName { get; set; }
        public string SerialNumber { get; set; }
        public int MachineCapacity { get; set; }
        public bool WorkingStatus { get; set; }
        public bool LockStatus { get; set; }
        public int UserId { get; set; }
        public int ShopId { get; set; }

    }
}
