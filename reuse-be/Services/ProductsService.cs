using Microsoft.Extensions.Options;
using MongoDB.Driver;
using reuse_be.Models;
using reuse_be.Data;
using reuse_be.Repository;

namespace reuse_be.Services
{
    public class ProductsService
    {
        private readonly IMongoCollection<Product> _productsCollection;
        public ProductsService(
            IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
            _productsCollection = mongoDatabase.GetCollection<Product>(databaseSettings.Value.ProductsCollectionName);
        }

        public async Task<List<Product>> GetProductsAsync() => await _productsCollection.Find(_ =>true).ToListAsync();

        public async Task<Product?> GetProductByIdAsync(string id) => await _productsCollection.Find(x => x.Id==id).FirstOrDefaultAsync();

        public async Task CreateProductAsync(Product newProduct) => await _productsCollection.InsertOneAsync(newProduct);
        public async Task UpdateProductAsync(string id, Product updatedProduct) => await _productsCollection.ReplaceOneAsync(x => x.Id == id, updatedProduct);
        public async Task RemoveProductByIdAsync(string id) => await _productsCollection.DeleteOneAsync(x => x.Id==id);
    }
}
