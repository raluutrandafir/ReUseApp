using Microsoft.AspNetCore.Mvc;
using reuse_be.Models;
using reuse_be.Repository;
using reuse_be.Services;

namespace reuse_be.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsService _productsService;

        public ProductsController(ProductsService productsService) => _productsService = productsService;
        [HttpGet]
        public async Task<List<Product>> GetProducts()
        {
            return await _productsService.GetProductsAsync();
        }
        [HttpGet]
        [Route("seedDb")]
        public void SeedDbWithMockData()
        {
            var seedDb = new SeedDb(_productsService);
        }
        [HttpPost]
        public async Task<IActionResult> Post(Product newProduct)
        {
            await _productsService.CreateProductAsync(newProduct);
            return CreatedAtAction(nameof(GetProducts), new { id = newProduct.Id }, newProduct);
        }
        [HttpGet]
        public async Task<List<Product>> GetProductsByCategory(string category)
        {
            return await _productsService.GetProductsByCategoryAsync(category);
        }
    }
}