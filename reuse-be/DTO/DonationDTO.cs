using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using reuse_be.Models;

namespace reuse_be.DTO
{
    public class DonationDTO
    {
        [BsonElement("title")]
        public string? Title1 { get; set; }


        [BsonElement("description")]
        public string? Description1 { get; set; }


        [BsonElement("subcategory")]
        public string? Subcategory { get; set; }

        [BsonElement]
        public byte[]? Image { get; set; } = new byte[0];


        public DonationDTO(string? title1, string? description1, string? subcategory, byte[]? image)
        {
            Title1 = title1;
            Description1 = description1;
            Subcategory = subcategory;
            Image = image;
        }
    }
}
