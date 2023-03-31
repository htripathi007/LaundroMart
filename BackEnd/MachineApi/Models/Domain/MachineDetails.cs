using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MachineAPi.Models.Domain
{
    public class MachineDetails
    {
        [Key]
        public int MachineId { get; set; }
        public string MachineName { get; set; }
        public string SerialNumber { get; set; }
        public int MachineCapacity { get; set; }
        [DefaultValue("true")]
        public bool WorkingStatus { get; set; }
        [DefaultValue("true")]
        public bool LockStatus { get; set; }
        public int UserId { get; set; }
        public int ShopId { get; set; }
        public MachineDetails()
        {
            this.WorkingStatus = true;
            this.LockStatus = true;
        }
    }
}
