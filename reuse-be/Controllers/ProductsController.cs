using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using reuse_be.Models;
using reuse_be.Repository;
using reuse_be.Services;

namespace reuse_be.Controllers
{
    [ApiController]
    [Route("[controller]")]

    // must be commented 
    [AllowAnonymous]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsService _productsService;

        public ProductsController(ProductsService productsService) => _productsService = productsService;

       
        [HttpGet]
        [Route("GetProducts")]
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
        [Route("InsertProduct")]
        public async Task<Product> InsertProduct(Product newProduct)
        {
            return await _productsService.InsertProductAsync(newProduct);
            //return CreatedAtAction(nameof(GetProducts), new { id = newProduct.Id }, newProduct);
        }

        [HttpGet]
        [Route("GetProductsByCategory")]
        public async Task<IActionResult> GetProductsByCategory(string category)
        {
            var response = await _productsService.GetProductsByCategoryAsync(category.ToLower());
            if (response == null)
                return BadRequest();
            return Ok(response);
        }

        [HttpGet]
        [Route("GetProductsBySubcategory")]
        public async Task<IActionResult> GetProductsBySubategory(string subcategory)
        {
            var response = await _productsService.GetProductsBySubcategoryAsync(subcategory.ToLower());
            if (response == null)
                return BadRequest();
            return Ok(response);
        }

        [HttpGet]
        [Route("GetRequests")]
        public async Task<List<Request>> GetUserRequests(string userId)
        {
            return await _productsService.GetRequestByUserIdAsync(userId);
        }
        [HttpGet]
        [Route("GetMessages")]
        public async Task<List<Request>> GetUserMessages(string userId)
        {
            return await _productsService.GetRequestByUserIdAsync(userId);
        }


        //[HttpGet]
        //[Route("seedDb")]
        //public void SeedDbWithMockData()
        //{
        //    var seedDb = new SeedDb(_requestsService);
        //}


        [HttpPost]
        [Route("AddRequest")]

        public async Task<IActionResult> AddUserRequest(Request request)
        {
            if (request.ProductId == null || request.RequestorId == null || request.OwnerId == null)
                return BadRequest();
            var response = await _productsService.AddUserRequest(request);
            return Ok(response);
        }



    }
}