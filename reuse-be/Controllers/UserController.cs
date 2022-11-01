using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using reuse_be.Models;
using reuse_be.Services;

namespace reuse_be.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
       
        private readonly UserService userService;
        public UserController(UserService _userService)
        {
            userService = _userService;
        }
        [HttpGet]
        public async Task<List<User>> GetUsers()
        {
             return await userService.GetUsersAsync();
        }
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult> GetUser(string id)
        {
            var user = await userService.GetUserAsync(id);
            return Json(user);
        }
        [HttpPost]
        public async Task<ActionResult> PostUser(User user)
        {
            await userService.CreateUserAsync(user);
            return Json(user);
        }
        [AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public ActionResult Login([FromBody] User user)
        {
            var token = userService.AuthenticateUser(user.Email, user.Password);
            if (token == null)
                return Unauthorized();
            return Ok(new {token, user});
        }

    }
}
