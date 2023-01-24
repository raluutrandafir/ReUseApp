using MongoDB.Driver;
using reuse_be.Models;
using reuse_be.Data;
using Microsoft.Extensions.Options;
using reuse_be.DTO;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace reuse_be.Repository
{
    public class AuthenticationRepository
    {
        private readonly IConfiguration? configurationAccessor;

        public Task<(byte[] passwordHash, byte[] passwordSal)> UpdatePassword(string password)
        {
            
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            return Task.FromResult((passwordHash, passwordSalt));
        }
        public Task<User> Register(RegisterRequest registerRequest)
        {
            User newUser = new User();
            newUser.Email = registerRequest.Email;
            newUser.Name = registerRequest.Name;
            newUser.PhoneNumber = registerRequest.PhoneNumber;
            CreatePasswordHash(registerRequest.Password, out byte[] passwordHash, out byte[] passwordSalt);
            newUser.PasswordHash = passwordHash;
            newUser.PasswordSalt = passwordSalt;

            return Task.FromResult(newUser);
        }
        public bool CheckUserIdentity(User dbUser, UserDTO loginRequest)
        {
            var passwordCheck = VerifyPassword(loginRequest.Password, dbUser.PasswordHash, dbUser.PasswordSalt);
            if (passwordCheck)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); // Create hash using password salt.
                for (int i = 0; i < computedHash.Length; i++)
                { // Loop through the byte array
                    if (computedHash[i] != passwordHash[i]) return false; // if mismatch
                }
            }
            return true; //if no mismatches.
        }
        public Task<string> GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(configurationAccessor.GetSection("JwtKey").ToString());
            var tokenClaims = new ClaimsIdentity(
                new Claim[] {
                    new Claim(ClaimTypes.Email, user.Email),
                });
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = tokenClaims,
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha512Signature
                    )
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return Task.FromResult(jwt);
        }
    }
}