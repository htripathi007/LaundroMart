using AutoMapper;
using UserAPI.Model.Domain;
using UserAPI.Model.DTO;

namespace UserAPI.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
           CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}
