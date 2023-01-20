using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace reuse_be.DTO
{
    public class SwapDTO
    {

        [BsonElement("title1")]
        public string? Title1 { get; set; }

        [BsonElement("title2")]
        public string? Title2 { get; set; }

        [BsonElement("description1")]
        public string? Description1 { get; set; }

        [BsonElement("description2")]
        public string? Description2 { get; set; }

        [BsonElement("subcategory")]
        public string? Subcategory { get; set; }

        [BsonElement]
        public string Image1 { get; set; } 
        [BsonElement]
        public string Image2 { get; set; } 

        [BsonRepresentation(BsonType.ObjectId)]
        public string ownerId { get; set; }

    }
}
