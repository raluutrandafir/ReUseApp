using Microsoft.Extensions.Options;
using MongoDB.Driver;
using reuse_be.Models;
using reuse_be.Data;
using reuse_be.Repository;
using Newtonsoft.Json;

namespace reuse_be.Services
{
    public class ProductsService
    {
        private readonly IMongoCollection<Product> _productsCollection;
        private readonly IMongoCollection<Request> _requestsCollection;

        public ProductsService(
            IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
            _productsCollection = mongoDatabase.GetCollection<Product>(databaseSettings.Value.ProductsCollectionName);
            _requestsCollection = mongoDatabase.GetCollection<Request>(databaseSettings.Value.RequestsCollectionName);
        }

        /// <summary>
        /// returns all the products that are still available
        /// </summary>
        /// <returns></returns>
        public async Task<List<Product>> GetProductsAsync() => await _productsCollection.Find(x => x.isAvailable.Equals(true)).ToListAsync();

        /// <summary>
        /// returns a product by its product id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Product?> GetProductByIdAsync(string id) => await _productsCollection.Find(x => x.Id.Equals(id)).FirstOrDefaultAsync();

        /// <summary>
        /// returns all the products by category that are available
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        public async Task<List<Product>>? GetProductsByCategoryAsync(string category)
        {

            var categoryString = GetCategory(category);
            if (categoryString.Equals(String.Empty))
            {
                return null;
            }
            return await _productsCollection.Find(x => x.Category.Equals(categoryString) && x.isAvailable.Equals(true)).ToListAsync();
        }

        /// <summary>
        /// returns all the products by subcategory that are available
        /// </summary>
        /// <param name="subcategory"></param>
        /// <returns></returns>
        public async Task<List<Product>>? GetProductsBySubcategoryAsync(string subcategory)
        {
            var subcategoryString = GetSubcategory(subcategory);
            if (subcategoryString.Equals(String.Empty))
            {
                return null;
            }
            return await _productsCollection.Find(x => x.Subcategory.Equals(subcategoryString) && x.isAvailable.Equals(true)).ToListAsync();
        }
        public async Task<List<Product>>? GetProductsByAllAsync(string category, string subcategory)
        {
            var subcategoryString = GetSubcategory(subcategory);
            var categoryString = GetCategory(category);
            if (subcategoryString.Equals(String.Empty) || categoryString.Equals(String.Empty))
            {
                return null;
            }
            return await _productsCollection.Find(x => x.Subcategory.Equals(subcategoryString) && x.isAvailable.Equals(true) && x.Category.Equals(categoryString)).ToListAsync();
        }
        public async Task CreateProductAsync(Product newProduct) => await _productsCollection.InsertOneAsync(newProduct);
        public async Task UpdateProductAsync(string id, Product updatedProduct) => await _productsCollection.ReplaceOneAsync(x => x.Id.Equals(id), updatedProduct);
        public async Task RemoveProductByIdAsync(string id) => await _productsCollection.DeleteOneAsync(x => x.Id.Equals(id));

        public async Task<Product> InsertProductAsync(Product product)
        {
            if (product == null)
                return null;

            await CreateProductAsync(product);
            return await Task.FromResult(product);

        }

        public async Task<List<Request>> GetRequestsAsync() => await _requestsCollection.Find(_ => true).ToListAsync();

        public async Task<Request?> GetRequestByIdAsync(string id) => await _requestsCollection.Find(x => x.Id.Equals(id)).FirstOrDefaultAsync();
        public async Task<List<Request>> GetRequestByUserIdAsync(string userId) => await _requestsCollection.Find(x => x.RequestorId.Equals(userId)).ToListAsync();
        public async Task<List<Request>> GetMessagesByUserIdAsync(string userId) => await _requestsCollection.Find(x => x.OwnerId.Equals(userId)).ToListAsync();

        public async Task CreateRequestAsync(Request newRequest) => await _requestsCollection.InsertOneAsync(newRequest);
        public async Task UpdateRequestByIdAsync(string id, Request updatedRequest) => await _requestsCollection.ReplaceOneAsync(x => x.Id.Equals(id), updatedRequest);
        public async Task UpdateProductAvailability(string productId, bool availability)
        {
            var product = _productsCollection.Find(x => x.Id.Equals(productId)).FirstOrDefaultAsync();
            if (product != null)
            {
                var newProduct = product.Result;
                newProduct.isAvailable = availability;
                await UpdateProductAsync(productId, newProduct);
            }
        }
        public async Task RemoveRequestByIdAsync(string id) => await _requestsCollection.DeleteOneAsync(x => x.Id.Equals(id));


        public async Task<Request> AddUserRequest(Request request)
        {
            var checkProductExistance = _productsCollection.Find(x => x.Id.Equals(request.ProductId)).FirstOrDefaultAsync();
            if (checkProductExistance.Result == null)
                return null;
            if (checkProductExistance.Result.isAvailable)
            {
                await CreateRequestAsync(request);
                return await Task.FromResult(request);
            }
            return null;
        }


        /// Utils
        public string GetCategory(string category)
        {
            if (category.Equals(Category.Swaps.ToString().ToLower()))
                return Category.Swaps.ToString();
            if (category.Equals(Category.Donations.ToString().ToLower()))
                return Category.Donations.ToString();
            return String.Empty;
        }

        public string GetSubcategory(string subcategory)
        {
            if (subcategory.Equals(Subcategory.Clothes.ToString().ToLower()))
                return Subcategory.Clothes.ToString();

            if (subcategory.Equals(Subcategory.Shoes.ToString().ToLower()))
                return Subcategory.Shoes.ToString();

            if (subcategory.Equals(Subcategory.Accesories.ToString().ToLower()))
                return Subcategory.Accesories.ToString();

            if (subcategory.Equals(Subcategory.Auto.ToString().ToLower()))
                return Subcategory.Auto.ToString();

            if (subcategory.Equals(Subcategory.Toys.ToString().ToLower()))
                return Subcategory.Toys.ToString();

            if (subcategory.Equals(Subcategory.BabyProducts.ToString().ToLower()))
                return Subcategory.BabyProducts.ToString();

            if (subcategory.Equals(Subcategory.HomeAppliances.ToString().ToLower()))
                return Subcategory.HomeAppliances.ToString();
            if (subcategory.Equals(Subcategory.Handmade.ToString().ToLower()))
                return Subcategory.Handmade.ToString();
            if (subcategory.Equals(Subcategory.Furniture.ToString().ToLower()))
                return Subcategory.Furniture.ToString();
            if (subcategory.Equals(Subcategory.HomeAccessories.ToString().ToLower()))
                return Subcategory.HomeAccessories.ToString();
            if (subcategory.Equals(Subcategory.Garden.ToString().ToLower()))
                return Subcategory.Garden.ToString();
            if (subcategory.Equals(Subcategory.Books.ToString().ToLower()))
                return Subcategory.Books.ToString();
            if (subcategory.Equals(Subcategory.School.ToString().ToLower()))
                return Subcategory.School.ToString();
            if (subcategory.Equals(Subcategory.Sports.ToString().ToLower()))
                return Subcategory.Sports.ToString();
            if (subcategory.Equals(Subcategory.Music.ToString().ToLower()))
                return Subcategory.Music.ToString();

            return String.Empty;

        }
        /// 
    }
}
