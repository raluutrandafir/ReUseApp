using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace reuse_be.Models
{
    public class Request
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        public string? Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string ProductId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string OwnerId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string RequestorId { get; set; }

        public Request(string productId, string ownerId, string requestorId)
        {
            ProductId = productId;
            OwnerId = ownerId;
            RequestorId = requestorId;
        }
    }
}
