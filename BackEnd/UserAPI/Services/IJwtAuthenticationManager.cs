namespace UserAPI.Services
{
    public interface IJwtAuthenticationManager
    {
        string Authenticate(long UserPhoneNumber, string password);
    }
}
