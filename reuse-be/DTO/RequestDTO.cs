using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace reuse_be.DTO
{
    public class RequestDTO
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string ProductId { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string OwnerId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string RequestorId { get; set; }

        public string Message { get; set; }

        public string ContactInfo { get; set; }
        public bool EvaluationStatus { get; set; } = false;


    }
}
