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
        public byte[]? Image1 { get; set; } = new byte[0];
        [BsonElement]
        public byte[]? Image2 { get; set; } = new byte[0];

    }
}
