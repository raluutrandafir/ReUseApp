using MongoDB.Bson.Serialization.Attributes;

namespace reuse_be.DTO
{
    public class ProductDTO
    {
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
        public byte[]? Image { get; set; } = new byte[0];
        public ProductDTO(string _title, string _description, string _category, string _subcategory, bool _isAvailable, byte[] _image)
        {
            Title = _title;
            Description = _description;
            Category = _category;
            Subcategory = _subcategory; 
            isAvailable = _isAvailable;
            Image = _image;
        }
    }
}
