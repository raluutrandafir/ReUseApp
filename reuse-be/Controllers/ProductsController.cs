using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using reuse_be.DTO;
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
        public async Task<IActionResult> InsertProduct(Product newProduct)
        {
            if (newProduct == null)
                return BadRequest();
            var response = await _productsService.InsertProductAsync(newProduct);
            if (response != null)
                return Ok(response);
            return BadRequest();
            //return CreatedAtAction(nameof(GetProducts), new { id = newProduct.Id }, newProduct);
        }


        [HttpPost]
        [Route("InsertDonationProduct")]
        public async Task<ActionResult<Product>> InsertDonationProduct(DonationDTO newProduct, string ownerId)
        {
            if (newProduct == null || ownerId == null)
                return BadRequest();
            Product product = new Product(newProduct.Title1, newProduct.Description1, Category.Donations.ToString(), newProduct.Subcategory, true, newProduct.Image, ownerId);
            var response = await _productsService.InsertProductAsync(product);
            if (response != null)
                return Ok(response);
            return BadRequest();
        }

        [HttpPost]
        [Route("InsertSwapProduct")]
        public async Task<ActionResult<Product>> InsertSwapProduct(SwapDTO newProduct, string ownerId)
        {
            if (newProduct == null || ownerId == null)
                return BadRequest();
            Product product = new Product(newProduct.Title1,newProduct.Title2, newProduct.Description1, newProduct.Description2, Category.Swaps.ToString(), newProduct.Subcategory, true, newProduct.Image1,newProduct.Image2, ownerId);
            var response = await _productsService.InsertProductAsync(product);
            if (response != null)
                return Ok(response);
            return BadRequest();
            
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
        [Route("GetProductInformationForRequest")]
        public async Task<Product> GetProductInformationForRequest(string productId){
            var response = await _productsService.GetProductByIdAsync(productId);
            if (response == null)
            {
                return null;
            }
            return response;
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
            return await _productsService.GetMessagesByUserIdAsync(userId);
        }

        [HttpPost]
        [Route("AddRequest")]

        // when a user clicks the request button, an request is being submitted to the db taht will appear in the user's My requests/My mesagges page
        public async Task<IActionResult> AddUserRequest(Request request)
        {
            if (request.ProductId == null || request.RequestorId == null || request.OwnerId == null)
                return BadRequest();
            var response = await _productsService.AddUserRequest(request);
            if (response == null)
                return BadRequest();
            else
            {
                await _productsService.UpdateProductAvailability(request.ProductId, false);
                return Ok(response);
            }
            
        }



    }
}