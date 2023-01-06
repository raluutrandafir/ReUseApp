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

        [BsonElement("title1")]
        public string? Title1 { get; set; }

        [BsonElement("title2")]
        public string? Title2 { get; set; }

        [BsonElement("description1")]
        public string? Description1 { get; set; }

        [BsonElement("description2")]
        public string? Description2 { get; set; }

        [BsonElement("category")]
        public string? Category { get; set; }

        [BsonElement("subcategory")]
        public string? Subcategory { get; set; }

        [BsonElement("isAvailable")]
        public bool isAvailable { get; set; } = true;
        [BsonElement]
        public byte[]? Image1  { get; set; } = new byte[0];
        [BsonElement]
        public byte[]? Image2 { get; set; } = new byte[0];

        [BsonRepresentation(BsonType.ObjectId)]
        public string? OwnerId { get; set; }

       
        public Product(string _id, string _title, string _description, string _category, string _subcategory, bool _isAvailable, byte[] _image, string _ownerId)
        {
            Id = _id;
            Title1 = _title;
            Description1 = _description;
            Category = _category;
            Subcategory = _subcategory;
            isAvailable = _isAvailable;
            Image1 = _image;
            OwnerId = _ownerId;
        }

        public Product(string _title, string _description, string _category, string _subcategory, bool _isAvailable, byte[] _image, string _ownerId)
        { 
            Title1 = _title;
            Description1 = _description;
            Category = _category;
            Subcategory = _subcategory;
            isAvailable = _isAvailable;
            Image1 = _image;
            OwnerId = _ownerId;
        }
        public Product()
        {

        }
        /// <summary>
        /// product constructor used for swaps
        /// </summary>
        /// <param name="title1"></param>
        /// <param name="title2"></param>
        /// <param name="description1"></param>
        /// <param name="description2"></param>
        /// <param name="category"></param>
        /// <param name="subcategory"></param>
        /// <param name="isAvailable"></param>
        /// <param name="image1"></param>
        /// <param name="image2"></param>
        /// <param name="ownerId"></param>
        public Product(string? title1, string? title2, string? description1, string? description2, string? category, string? subcategory, bool isAvailable, byte[]? image1, byte[]? image2, string? ownerId)
        {
            Title1 = title1;
            Title2 = title2;
            Description1 = description1;
            Description2 = description2;
            Category = category;
            Subcategory = subcategory;
            this.isAvailable = isAvailable;
            Image1 = image1;
            Image2 = image2;
            OwnerId = ownerId;
        }
    }

}
