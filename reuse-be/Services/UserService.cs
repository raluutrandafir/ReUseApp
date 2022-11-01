using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using reuse_be.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace reuse_be.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _usersCollection;

        private readonly string key;
        public UserService(
            IOptions<DatabaseSettings> databaseSettings, IConfiguration configuration)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
            _usersCollection = mongoDatabase.GetCollection<User>(databaseSettings.Value.UsersCollectionName);
            key = configuration.GetSection("JwtKey").ToString();

        }

        public async Task<List<User>> GetUsersAsync() => await _usersCollection.Find(_ => true).ToListAsync();

        public async Task<User?> GetUserAsync(string id) => await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateUserAsync(User newUser) => await _usersCollection.InsertOneAsync(newUser);
        public async Task UpdateUserAsync(string id, User updatedUser) => await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);
        public async Task RemoveUserAsync(string id) => await _usersCollection.DeleteOneAsync(x => x.Id == id);

        public string AuthenticateUser(string email, string password)
        {
            var user = this._usersCollection.Find(_ => _.Email == email && _.Password == password).FirstOrDefault();
            if (user == null)
                return null;
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor(){
                Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Email, email), }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature
                    )
                };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);

        }
    }
}
