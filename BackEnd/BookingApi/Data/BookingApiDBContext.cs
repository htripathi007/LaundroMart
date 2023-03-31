using BookingApi.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace BookingApi.Data
{
    public class BookingApiDBContext : DbContext
    {
        public BookingApiDBContext(DbContextOptions<BookingApiDBContext> options) : base(options)
        {

        }
        public DbSet<MachineSlotDetail> MachineSlotDetails { get; set; }
        public DbSet<ReservationOfType> ReservationOfTypes { get; set; }
        public DbSet<SlotBooking> SlotBookings { get; set; }






    }

}
