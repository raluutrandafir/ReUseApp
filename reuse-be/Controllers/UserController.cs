using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using reuse_be.Models;
using reuse_be.Services;
using reuse_be.DTO;

namespace reuse_be.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
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
        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public async Task<ActionResult> RegisterUser(RegisterRequest user)
        {
            var registerResponse = await userService.RegisterUserAsync(user);
            if (registerResponse != null)
            {
                if (registerResponse.Equals("Error: Email exists already!"))
                    return BadRequest("Email already exists!");
                else
                    return Json(user);

            }
            return BadRequest();
        }
        [AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public ActionResult Login([FromBody] UserDTO user)
        {
            if (user.Email != null & user.Password != null)
            {
                var token = userService.AuthenticateUser(user.Email, user.Password);
                if (token == null)
                    return Unauthorized();
                else if (token.Equals("Error: Email"))
                {
                    return NotFound("Email");
                }
                else if (token.Equals("Error: Password"))
                {
                    return NotFound("Password");
                }
                else
                {
                    return Ok(new { token.Result, user });
                }

            }
            return BadRequest();

        }
    }
}
