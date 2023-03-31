namespace BookingApi.Model.DTO
{
    public class MachineSlotDetailDto
    {
        public int MachineSlotId { get; set; }

        //Foreign key for Machine

        public int MachineId { get; set; }
        //public Machine? Machine { get; set; }

        //Foreign key for Shop

        public int ShopId { get; set; }
        //public Shop? Shop { get; set; }


        //Foreign key for SlotBooking
        public int SlotBookinId { get; set; }
        //public SlotBooking SlotBooking { get; set; }
    }
}
