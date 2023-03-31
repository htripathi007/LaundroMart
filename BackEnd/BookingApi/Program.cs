using BookingApi.Data;
using BookingApi.Repositories;
using BookingApi.Repositories.Interfaces;
using JwtAuthenticationManager.Extensions;
using JwtAuthenticationManager.JwtAuthenticationManager;
using Microsoft.EntityFrameworkCore;
using UserAPI.Data;
using UserAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var _Configuration = builder.Configuration;
builder.Services.AddDbContext<BookingApiDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddDbContext<UserDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection1"));
});

builder.Services.AddCustomJwtAuthentication();
//builder.Services.AddSingleton<JwtTokenHandler>();

builder.Services.AddScoped<IBookingRepository, BookingRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
