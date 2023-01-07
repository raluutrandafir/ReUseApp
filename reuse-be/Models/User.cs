using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace reuse_be.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        public string? Id { get; set; }
        public string? Username { get; set; }
        public byte[] PasswordSalt { get; set; } = null!;
        public byte[] PasswordHash { get; set; } = null!;

        [BsonElement("Email")]
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }

        //public List<Request> Requests { get; set; } = new List<Request>();
        //public List<Request> Messages { get; set; } = new List<Request> ();

        public User()
        {

        }

    }

}
