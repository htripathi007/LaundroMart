using JwtAuthenticationManager.Models;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace JwtAuthenticationManager
{

namespace JwtAuthenticationManager
    {
        public class JwtTokenHandler
        {
            public const string JWT_SECURITY_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2NDE5OTEyOCwiaWF0IjoxNjY0MTk5MTI4fQ.FZGfQZKyicxnX5NkwWXzPushKnbT9i_3NNThj-sYpUQ";
            private const int JWT_TOKEN_VALIDITY_MINS = 60;
            private List<UserAccount> users;

            public JwtTokenHandler()
            {
                
                //users = new List<UserAccount>
                //{
                //    new UserAccount{ UserName = "admin", Password = "admin@123", Role = "Administrator" },
                //    new UserAccount{ UserName = "user01", Password = "user01@123", Role = "HR" }
                //};
            }

            private void GetUsers()
            {
                HttpClient client = new HttpClient();
                var response = client.GetAsync("http://localhost:5155/api/User/Validate");
                response.Wait();
                if (response.IsCompleted)
                {
                    var result = response.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        var data = result.Content.ReadAsStringAsync();
                        data.Wait();

                        this.users = JsonConvert.DeserializeObject(data.Result, typeof(List<UserAccount>)) as List<UserAccount>;
                    }
                }
            }

            public AuthenticationResponse GenerateToken(AuthenticationRequest authenticationRequest)
            {
                GetUsers();
                if (string.IsNullOrWhiteSpace(Convert.ToString((authenticationRequest.UserPhoneNumber))) || string.IsNullOrWhiteSpace(authenticationRequest.UserPassword))
                {
                    return null;
                }
                var user = users.Where(x => x.UserPhoneNumber == authenticationRequest.UserPhoneNumber && Decrypt( x.UserPassword) == authenticationRequest.UserPassword).FirstOrDefault();

                if (user == null)
                {
                    return null;
                }
                var tokentExpiryTimeStamp = DateTime.Now.AddMinutes(JWT_TOKEN_VALIDITY_MINS);
                var tokenKey = Encoding.ASCII.GetBytes(JWT_SECURITY_KEY);
                var claimsIdentity = new ClaimsIdentity(new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Name, Convert.ToString(authenticationRequest.UserPhoneNumber)),
                new Claim(ClaimTypes.Role, user.UserRole)
            });
                var signingCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(tokenKey),
                        SecurityAlgorithms.HmacSha256Signature
                    );
                var securityTokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claimsIdentity,
                    Expires = tokentExpiryTimeStamp,
                    SigningCredentials = signingCredentials
                };
                var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
                var securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
                var token = jwtSecurityTokenHandler.WriteToken(securityToken);

                return new AuthenticationResponse
                {
                    UserPhoneNumber = user.UserPhoneNumber,
                    ExpiresIn = (int)tokentExpiryTimeStamp.Subtract(DateTime.Now).TotalSeconds,
                    JwtToken = token,
                    Role = user.UserRole
                };
            }
            public static string Decrypt(string cipherText)
            {
                string EncryptionKey = "0ram@1234xxxxxxxxxxtttttuuuuuiiiiio";  //we can change the code converstion key as per our requirement, but the decryption key should be same as encryption key    
                cipherText = cipherText.Replace(" ", "+");
                byte[] cipherBytes = Convert.FromBase64String(cipherText);
                using (Aes encryptor = Aes.Create())
                {
                    Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76});
                    encryptor.Key = pdb.GetBytes(32);
                    encryptor.IV = pdb.GetBytes(16);
                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                        {
                            cs.Write(cipherBytes, 0, cipherBytes.Length);
                            cs.Close();
                        }
                        cipherText = Encoding.Unicode.GetString(ms.ToArray());
                    }
                }
                return cipherText;
            }
        }
    }
}
