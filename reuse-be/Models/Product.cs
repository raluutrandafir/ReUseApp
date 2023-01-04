using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace reuse_be.Models
{
    [BsonIgnoreExtraElements]
    public class Product
    {
        
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
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

        [BsonRepresentation(BsonType.ObjectId)]
        public string? OwnerId { get; set; }

        //public Product(string _title, string _description, string _category, string _subcategory, string _ownerId)
        //{
        //    Title = _title;
        //    Description = _description;
        //    Category = _category;
        //    Subcategory = _subcategory;
        //    OwnerId = _ownerId;
        //}
        public Product(string _id, string _title, string _description, string _category, string _subcategory, bool _isAvailable, byte[] _image, string _ownerId)
        {
            Id = _id;
            Title = _title;
            Description = _description;
            Category = _category;
            Subcategory = _subcategory;
            isAvailable = _isAvailable;
            Image = _image;
            OwnerId = _ownerId;
        }
        public Product(string _title, string _description, string _category, string _subcategory, bool _isAvailable, byte[] _image, string _ownerId)
        { 
            Title = _title;
            Description = _description;
            Category = _category;
            Subcategory = _subcategory;
            isAvailable = _isAvailable;
            Image = _image;
            OwnerId = _ownerId;
        }
        public Product()
        {

        }

    }

}
