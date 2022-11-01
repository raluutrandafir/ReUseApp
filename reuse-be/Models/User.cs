using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace reuse_be.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonIgnore]
        public string Id { get; set; }
        public string Username { get; set; }
        [BsonElement("Password")]
        public string Password { get; set; }
        [BsonElement("Email")]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

    }
}
