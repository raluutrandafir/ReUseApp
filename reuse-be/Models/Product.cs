using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace reuse_be.Models
{
    [BsonIgnoreExtraElements]
    public class Product
    {

        //[BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnore]
        public string Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("category")]
        public string Category { get; set; }

        [BsonElement("subcategory")]
        public string Subcategory { get; set; }

        [BsonElement("isAvailable")]
        public bool isAvailable { get; set; }
        
    }
}
