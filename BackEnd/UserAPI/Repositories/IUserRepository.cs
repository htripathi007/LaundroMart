using UserAPI.Model.Domain;

namespace UserAPI.Repositories
{
    public interface IUserRepository
    {
        Task<User> DeleteUserById(int userId);
        Task<IEnumerable<User>> GetAllUsersAsync();
        List<User> GetUsers();
        Task<User> GetUserByIdAsync(int userId);
        Task<User> RegisterUserAsync(User user); 
        Task<IEnumerable<User>> GetUsersByRoleAsync(string userRole);
        Task<User> UpdateUserAsync(int usereId,User user);
        Task<User> GetUserInfoByPh(string phoneNo);

        //Task<string> CheckUserEmailAsync(string UserEmail);

    }
}
