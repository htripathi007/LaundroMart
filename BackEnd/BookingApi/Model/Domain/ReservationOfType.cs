using System.ComponentModel.DataAnnotations;

namespace BookingApi.Model.Domain
{
    public class ReservationOfType
    {
        [Key]
        public int ReservationId { get; set; }
        
        public string ReservationType { get; set; }
        
        public int MachineCycleTime { get; set; }
        
        public double Charges { get; set; }
    }
}
