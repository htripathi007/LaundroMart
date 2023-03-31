using Microsoft.EntityFrameworkCore;
using UserAPI.Model.Domain;

namespace UserAPI.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {

        }
        //protected override void ConfigureConventions(ModelConfigurationBuilder builder)
        //{
        //    builder.Properties<DateOnly>()
        //           .HaveConversion<DateOnlyConverter, DateOnlyComparer>()
        //           .HaveColumnType("date");
        //}
        public DbSet<User> Users { get; set; }
       //
       //public DbSet<Temp> Temps { get; set; }
    }
}
    