using MachineAPi.Models.Domain;
using Microsoft.EntityFrameworkCore;


namespace MachineAPi.Data
{
    public class MachineDbContext:DbContext
    {
        public MachineDbContext(DbContextOptions<MachineDbContext> options):base(options) 
        {

        }
        public DbSet<MachineDetails> Machine { get; set; }
        public DbSet<ShopDetails> Shop { get; set; }
        
        
    }
}
