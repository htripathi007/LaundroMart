using AutoMapper;
using JwtAuthenticationManager.JwtAuthenticationManager;
using JwtAuthenticationManager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Specialized;
using System.Data;
using UserAPI.Model.Domain;
using UserAPI.Model.DTO;
using UserAPI.Repositories;

namespace UserAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;
        private readonly JwtTokenHandler jwtAuthenticationManager;
        public UserController(IUserRepository _userRepository, IMapper _mapper, JwtTokenHandler jwtAuthenticationManager)
        {
            userRepository = _userRepository;
            mapper = _mapper;
            this.jwtAuthenticationManager = jwtAuthenticationManager;
        }

        [HttpPost("Authenticate")]
        public ActionResult<AuthenticationResponse> LoginUser([FromBody] AuthenticationRequest _user)
        {

            var authenticationResponse = this.jwtAuthenticationManager.GenerateToken(_user);
            if (authenticationResponse == null)
            {
                return Unauthorized();
            }
            return authenticationResponse;

            //var token = jwtAuthenticationManager.Authenticate(_user.UserName, _user.Password);
            //if (token == null)
            //{
            //    return Unauthorized();
            //}
            //return Ok(token);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUserAsync(User u)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                var uModel = new User()
                {
                    UserFirstName = u.UserFirstName,
                    UserLastName = u.UserLastName,
                    UserPhoneNumber = u.UserPhoneNumber,
                    UserAddress = u.UserAddress,
                    UserEmail = u.UserEmail,
                    UserPassword = u.UserPassword,
                    UserCity = u.UserCity,
                    UserId = u.UserId,
                    UserPinCode = u.UserPinCode,
                    UserRole = u.UserRole,
                    UserState = u.UserState,
                };
                u = await userRepository.RegisterUserAsync(u);
                var uDto = mapper.Map<UserDTO>(u);
                return Ok(uDto);
            }
        }
      

        [HttpGet]
       // [Authorize(Roles = "Admin")]

        public async Task<IActionResult> GetAllUsersAsync()
        {
            var users = await userRepository.GetAllUsersAsync();
            if (users == null)
            {
                return NoContent();
            }
            else
            {
                //var userDTO = mapper.Map<List<UserDTO>>(users);
                return Ok(users);
            }
        }

        [HttpGet("UserId")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserByIdAsync(int uid)
        {
            var u = await userRepository.GetUserByIdAsync(uid);
            if (u == null)
            {
                return NoContent();
            }
            else
            {
                var uDto = mapper.Map<UserDTO>(u);

                return Ok(uDto);
            }
        }

        [HttpPut("UserId")]
        //[Authorize(Roles = "Client,Owner")]
        public async Task<IActionResult> UpdateUserAsync(int uid, User user)
        {
            var u = await userRepository.UpdateUserAsync(uid, user);
            if (u == null)
            {
                return NoContent();
            }
            else
            {
                var uDto = mapper.Map<UserDTO>(u);

                return Ok(uDto);
            }
        }


        [HttpDelete("UserId")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUserById(int uid)
        {
            var u = await userRepository.DeleteUserById(uid);
            if (u == null)
            {
                return NotFound();
            }
            var uDto = mapper.Map<UserDTO>(u);
            return Ok(uDto);
        }

        //[HttpGet("UserNameCheck")]
        //public async Task<IActionResult> CheckUserEmailAsync(string UserEmail)
        //{
        //    var check = await userRepository.CheckUserEmailAsync(UserEmail);
        //    if (check != null)
        //    {
        //        return Ok(UserEmail);
        //    }
        //    else
        //    {
        //        return Conflict();
        //    }
        //}

        [HttpGet("UserRole")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUsersByRoleAsync(String userRole)
        {
            var users = await userRepository.GetUsersByRoleAsync(userRole);
            if (users == null)
            {
                return NoContent();
            }
            else
            {
                var userDTO = mapper.Map<List<UserDTO>>(users);
                return Ok(userDTO);
            }
        }

        [HttpGet("Validate")]
        public ActionResult<List<User>> GetAllUsersForValidation()
        {
            var users = userRepository.GetUsers();
            return Ok(users);
        }

        [HttpGet("UserPh")]
        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserInfo(string phoneNo)
        {
            var u = await userRepository.GetUserInfoByPh(phoneNo);
            if (u == null)
            {
                return NoContent();
            }
            else
            {
                var uDto = mapper.Map<UserDTO>(u);

                return Ok(uDto);
            }
        }

    }
}
