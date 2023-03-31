using System.ComponentModel.DataAnnotations;

namespace BookingApi.Model.DTO
{
    public class SlotBookingDto
    {
        public int BookingId { get; set; }
        
        public DateTime BookingDateTime { get; set; }
        
        public DateTime BookingStartTime { get; set; }

        public DateTime BookingEndTime { get; set; }

        //Foreign key for Resevation

        public int ReservationId { get; set; }
        //public Reservation Reservation { get; set; }


        //Foreign key for User
        public int UserId { get; set; }
        //public User User { get; set; }

        public int ShopId { get; set; }

        //Foreign key for Machine

        public int MachineId { get; set; }
        //public Machine Machine { get; set; }

        public Double Bill { get; set; }

        public long Pin { get; set; }

        //public ICollection<MachineSlotDetail> MachineSlotDetails { get; set; }

    }
}
