using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserAPI.Repositories;

namespace UserAPI.Services
{
        public class JwtAuthenticationManager : IJwtAuthenticationManager
        {
            private Microsoft.IdentityModel.Tokens.SecurityToken _token;
            private readonly string key;
            public readonly IUserRepository userRepository;
            public JwtAuthenticationManager(string key, IUserRepository userRepository)
            {
                this.key = key;
                this.userRepository = userRepository;
            }

            private readonly IDictionary<string, string> adminUsers =
               new Dictionary<string, string>
               {
                {"8858802873","password1"},
                {"9381878811", "password2"}
               };

            public string Authenticate(long UserPhoneNumber, string password)
            {
                var users = userRepository.GetUsers();
                if (!users.Any(u => u.UserPhoneNumber == UserPhoneNumber && u.UserPassword == password) && !adminUsers.Any(u => u.Key ==Convert.ToString(UserPhoneNumber) && u.Value == password))
                {
                    return null;
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenKey = Encoding.ASCII.GetBytes(key);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.Name, Convert.ToString(UserPhoneNumber))
                }),
                    Expires = DateTime.UtcNow.AddHours(3),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey),
                        SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
    }
}
