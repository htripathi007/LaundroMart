using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MachineAPi.Models.Domain
{
    public class ShopDetails
    {
        [Key]
        public int ShopId { get; set; }
        public string ShopName { get; set; }
        public string ShopArea { get; set; }
        public string ShopCity { get; set; }
        public int  ShopPinCode { get; set; }
        public DateTime ShopStartTime { get; set; }
        public DateTime ShopEndTime { get; set; }
        [DefaultValue("true")]
        public bool ShopWorkingStatus { get; set; }
        public int UserId { get; set; }
        public ShopDetails()
        {
            this.ShopWorkingStatus = true;
        }


    }
}
