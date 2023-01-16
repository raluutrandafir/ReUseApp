using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using reuse_be.DTO;
using reuse_be.Models;
using reuse_be.Repository;
using reuse_be.Services;

namespace reuse_be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

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
        [HttpGet]
        [Route("GetProductsByCategory")]
        public async Task<ActionResult<List<Product>>> GetProductsByCategory(string category)
        {
            if (category == null)
                return BadRequest();
            var response = await _productsService.GetProductsByCategoryAsync(category.ToLower());
            if (response == null)
                return NotFound();
            return Ok(response);
        }

        [HttpGet]
        [Route("GetProductsBySubcategory")]
        public async Task<ActionResult<List<Product>>> GetProductsBySubategory(string subcategory)
        {
            if (subcategory == null)
                return BadRequest();
            var response = await _productsService.GetProductsBySubcategoryAsync(subcategory.ToLower());
            if (response == null)
                return NotFound();
            return Ok(response);
        }

        [HttpGet]
        [Route("GetAllProducts")]
        public async Task<ActionResult<List<Product>>> GetAllProducts(string category, string subcategory)
        {
            if (category == null || subcategory == null)
                return BadRequest();
            var response = await _productsService.GetProductsByAllAsync(category.ToLower(), subcategory.ToLower());
            if (response == null)
                return NotFound();
            return Ok(response);
        }

        [HttpGet]
        [Route("GetProductInformationForRequest")]
        public async Task<ActionResult<Product>> GetProductInformationForRequest(string productId)
        {
            if (productId == null)
                return BadRequest();
            var response = await _productsService.GetProductByIdAsync(productId);
            if (response == null)
            {
                return NotFound();
            }
            return Ok(response);
        }

        [HttpGet]
        [Route("GetRequests")]
        public async Task<ActionResult<List<Request>>> GetUserRequests(string userId)
        {
            if (userId == null)
                return BadRequest();
            return Ok(await _productsService.GetRequestByUserIdAsync(userId));
        }
        [HttpGet]
        [Route("GetMessages")]
        public async Task<ActionResult<List<Request>>> GetUserMessages(string userId)
        {
            if (userId == null)
                return BadRequest();
            return Ok(await _productsService.GetMessagesByUserIdAsync(userId));
        }

        [HttpGet]
        [Route("getRequestInfo")]
        public async Task<ActionResult<Request>> getRequestInfo(string requestId)
        {
            if (requestId == null)
                return BadRequest();
            return Ok(await _productsService.GetRequestByIdAsync(requestId));
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
            Product product = new Product(newProduct.Title1, newProduct.Title2, newProduct.Description1, newProduct.Description2, Category.Swaps.ToString(), newProduct.Subcategory, true, newProduct.Image1, newProduct.Image2, ownerId);
            var response = await _productsService.InsertProductAsync(product);
            if (response != null)
                return Ok(response);
            return BadRequest();

        }


        [HttpPost]
        [Route("AddRequest")]

        // when a user clicks the request button, an request is being submitted to the db taht will appear in the user's My requests/My mesagges page
        public async Task<IActionResult> AddUserRequest(RequestDTO requestDto)
        {
            if (requestDto.ProductId == null || requestDto.RequestorId == null || requestDto.OwnerId == null)
                return BadRequest();
            
            var request = new Request(requestDto.ProductId, requestDto.OwnerId, requestDto.RequestorId, requestDto.Message, requestDto.ContactInfo, requestDto.EvaluationStatus);
        
            var checkProductExistance = _productsService.GetProductByIdAsync(request.ProductId);
            if (checkProductExistance.Result == null)
                return BadRequest("Product does not exist!");
            else
            {
                if (checkProductExistance.Result.isAvailable == false)
                    return BadRequest("Product is unavailable!");
                else
                {
                    var response = await _productsService.AddUserRequest(request);
                    await _productsService.UpdateProductAvailability(request.ProductId, false);
                    return Ok(response);
                }
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("submitMessageStatus")]
        public async Task<IActionResult> submitMessageStatus(string requestID, bool evaluationStatus)
        {
            if (requestID == null)
                return BadRequest("Request Id is null!");

            var dbRequest = await _productsService.GetRequestByIdAsync(requestID);

            if (dbRequest == null)
                NotFound("Request Id wrong!");
            else
            {
                var newRequest = dbRequest;
                newRequest.EvaluationStatus = evaluationStatus;
                await _productsService.UpdateRequestByIdAsync(requestID, newRequest);
                return Ok(newRequest);
            }
           return BadRequest();
        }

    }
}