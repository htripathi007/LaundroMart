namespace MachineAPi.Models.Dto
{
    public class ShopDto
    {
        public int ShopId { get; set; }
        public string ShopName { get; set; }
        public string ShopArea { get; set; }
        public string ShopCity { get; set; }
        public int ShopPinCode { get; set; }
        public DateTime ShopStartTime { get; set; }
        public DateTime ShopEndTime { get; set; }
        public bool ShopWorkingStatus { get; set; }
        public int UserId { get; set; }
        
    }
}
