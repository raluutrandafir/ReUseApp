using Microsoft.AspNetCore.Mvc;
using reuse_be.Models;
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
        public async Task<List<Product>> Get() => await _productsService.GetAsync();

        [HttpPost]
        public async Task<IActionResult> Post(Product newProduct)
        {
            await _productsService.CreateAsync(newProduct);
            return CreatedAtAction(nameof(Get), new { id = newProduct.Id }, newProduct);
        }
    }
}