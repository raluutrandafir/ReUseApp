//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Options;
//using MongoDB.Driver;
//using reuse_be.Data;
//using reuse_be.Models;
//using reuse_be.Services;

//namespace reuse_be.Controllers
//{
//    public class RequestsController : Controller
//    {
//        private readonly RequestsService _requestsService;
//        public RequestsController(RequestsService requestsService) {
//            _requestsService = requestsService;
//        }


//        [HttpGet]
//        [Route("GetRequests")]
//        public async Task<List<Request>> GetUserRequests(User user)
//        {
//            return await _requestsService.GetRequestByUserIdAsync(user.Id);
//        }
//        [HttpGet]
//        [Route("GetMessages")]
//        public async Task<List<Request>> GetUserMessages(User user)
//        {
//            return await _requestsService.GetRequestByUserIdAsync(user.Id);
//        }


//        //[HttpGet]
//        //[Route("seedDb")]
//        //public void SeedDbWithMockData()
//        //{
//        //    var seedDb = new SeedDb(_requestsService);
//        //}


//        [HttpPost]
//        [Route("AddRequest")]

//        public async Task<IActionResult> AddUserRequest(Request request)
//        {
//            if (request.ProductId == null || request.RequestorId == null || request.OwnerId == null)
//                return BadRequest();
//            var response = await _requestsService.AddUserRequest(request);
//            return Ok(response);
//        }
//    }
//}
