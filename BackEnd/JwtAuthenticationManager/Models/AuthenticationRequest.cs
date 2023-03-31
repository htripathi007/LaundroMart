using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JwtAuthenticationManager.Models
{
    public class AuthenticationRequest
    {
        public long UserPhoneNumber { get; set; }
        public string UserPassword { get; set; }
    }
}
