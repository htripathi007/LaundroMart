using AutoMapper;
using BookingApi.Model.Domain;
using BookingApi.Model.DTO;

namespace QuizMicroserviceAPI.Profiles
{
    public class BookingProfile : Profile
    {
        public BookingProfile()
        {
            CreateMap<MachineSlotDetail, MachineSlotDetailDto>().ReverseMap();
            CreateMap<ReservationOfType, ReservationOfTypeDto>().ReverseMap();
            CreateMap<SlotBooking, SlotBookingDto>().ReverseMap();


        }
    }
}
