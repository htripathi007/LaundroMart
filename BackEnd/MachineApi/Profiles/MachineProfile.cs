using AutoMapper;
using MachineAPi.Models.Domain;
using MachineAPi.Models.Dto;

namespace MachineAPi.Profiles
{
    public class MachineProfile:Profile
    {
        public MachineProfile()
        {
            CreateMap<MachineDetails, MachineDto>().ReverseMap();
            CreateMap<ShopDetails, ShopDto>().ReverseMap();
        }
    }
}
