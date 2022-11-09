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

namespace reuse_be.Services
{
    public class AuthenticationService
    {
        private readonly IConfiguration configurationAccessor;
        public AuthenticationService(IConfiguration configuration, IOptions<DatabaseSettings> databaseSettings)
        {
            configurationAccessor = configuration;
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

        }

        public Task<User> Register(User registerRequest)
        {
            User newUser = new User();
            newUser.Email = registerRequest.Email;
            newUser.FirstName = registerRequest.FirstName;
            newUser.LastName = registerRequest.LastName;
            newUser.PhoneNumber = registerRequest.PhoneNumber;
            CreatePasswordHash(registerRequest.Password, out byte[] passwordHash, out byte[] passwordSalt);
            newUser.PasswordHash = passwordHash;
            newUser.PasswordSalt = passwordSalt;
        }
        public Task<User> Login(UserDTO loginRequest)
        {
            throw new NotImplementedException();
        }
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
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