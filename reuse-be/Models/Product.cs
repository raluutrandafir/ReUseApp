using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace reuse_be.Models
{
    [BsonIgnoreExtraElements]
    public class Product
    {
        [BsonIgnore]
        public string? Id { get; set; }

        [BsonElement("title")]
        public string? Title { get; set; }

        [BsonElement("description")]
        public string? Description { get; set; }

        [BsonElement("category")]
        public string? Category { get; set; }

        [BsonElement("subcategory")]
        public string? Subcategory { get; set; }

        [BsonElement("isAvailable")]
        public bool isAvailable { get; set; } = true;
        [BsonElement]
        public byte[]? Image  { get; set; } = new byte[0];
        public Product(string _title, string _description, string _category, string _subcategory)
        {
            Title = _title;
            Description = _description;
            Category = _category;
            Subcategory = _subcategory;
        }
        public Product(string _id, string _title, string _description, string _category, string _subcategory, bool _isAvailable, byte[] _image)
        {
            Id = _id;
            Title = _title;
            Description = _description;
            Category = _category;
            Subcategory = _subcategory;
            isAvailable = _isAvailable;
            Image = _image;
        }

    }

}
