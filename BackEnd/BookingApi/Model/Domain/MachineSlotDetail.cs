using System.ComponentModel.DataAnnotations;
using System.Reflection.PortableExecutable;

namespace BookingApi.Model.Domain
{
    public class MachineSlotDetail
    {
        [Key]
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
