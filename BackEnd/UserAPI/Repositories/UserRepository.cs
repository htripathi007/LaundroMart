using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using UserAPI.Data;
using UserAPI.Model.Domain;
using UserAPI.Repositories;

namespace UserAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext userDbContext;
        public UserRepository(UserDbContext _userDbContext)
        {
            userDbContext = _userDbContext;
        }
        public async Task<User> DeleteUserById(int userId)   
        {
            var user = await userDbContext.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            if (user == null)
            {
                return null;
            }
            else
            {
                userDbContext.Users.Remove(user);
                await userDbContext.SaveChangesAsync();
            }
            return user;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await userDbContext.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            var userInfo = await userDbContext.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            if (userInfo == null)
                return null;
            return userInfo;
        }

        public async Task<IEnumerable<User>> GetUsersByRoleAsync(string userRole)
        {
            var userList= await userDbContext.Users.ToListAsync();
            List<User> user = new List<User>(); 
            foreach (var item in userList)
            {
                if (item.UserRole == userRole)
                {
                    user.Add(item);
                }
            }
            return user;
        }

        public async Task<User> RegisterUserAsync(User user)
        {
            user.UserPassword = Encrypt(user.UserPassword.ToString());   // Passing the Password to Encrypt method and the method will return encrypted string and stored in Password variable.  
            await userDbContext.Users.AddAsync(user);
            await userDbContext.SaveChangesAsync();
            return user;
        }   

        public async Task<User> UpdateUserAsync(int userId, User user)
        {
            var oldUser = await userDbContext.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            if (oldUser != null)
            {
                oldUser.UserRole = user.UserRole;
                oldUser.UserFirstName = user.UserFirstName;
                oldUser.UserLastName = user.UserLastName;
                oldUser.UserPhoneNumber = user.UserPhoneNumber;
                oldUser.UserAddress = user.UserAddress;
                oldUser.UserCity = user.UserCity;
                oldUser.UserState = user.UserState;
                oldUser.UserPinCode = user.UserPinCode;
                oldUser.ApproveStatus = user.ApproveStatus;
                await userDbContext.SaveChangesAsync();
                return oldUser;
            }
            else
            {
                return null;
            }
        }
        public List<User> GetUsers()
        {
            return userDbContext.Users.ToList();
        }

        public async Task<User> GetUserInfoByPh(string phoneNo)
        {

            var userInfo = await userDbContext.Users.FirstOrDefaultAsync(x => x.UserPhoneNumber == long.Parse(phoneNo));
            userInfo.UserPassword = Decrypt(userInfo.UserPassword);
            if (userInfo == null)
                return null;
            return userInfo;
        }

        public static string Encrypt(string encryptString)
        {
            string EncryptionKey = "0ram@1234xxxxxxxxxxtttttuuuuuiiiiio";  //we can change the code converstion key as per our requirement    
            byte[] clearBytes = Encoding.Unicode.GetBytes(encryptString);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    encryptString = Convert.ToBase64String(ms.ToArray());
                }
            }
            return encryptString;
        }

        public static string Decrypt(string cipherText)
        {
            string EncryptionKey = "0ram@1234xxxxxxxxxxtttttuuuuuiiiiio";  //we can change the code converstion key as per our requirement, but the decryption key should be same as encryption key    
            cipherText = cipherText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
 });
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
