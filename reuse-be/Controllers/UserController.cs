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
        [Route("getusername")]
        public async Task<ActionResult> GetUsername(string userId)
        {
            if (userId.Equals(""))
            {
                return BadRequest("You must provide a user id!");
            }
            var response = await userService.GetUserAsync(userId);
            if(response == null)
            {
                return BadRequest("Invalid user id.");
            }
            return Ok(response);
        }

        
        [HttpGet]
        [Route("getuserinfo")]
        public async Task<ActionResult> GetUserInfo(string id)
        {
            if(id == "")
            {
                return BadRequest("Please provide a valid id!");
            }
            var user = await userService.GetUserAsync(id);
            return Json(user);
        }

        [HttpPost]
        [Route("updateuserprofile")]

        public async Task<ActionResult> UpdateUserProfile(string userId, RegisterRequest registerRequest)
        {
            if (userId == "")
                return BadRequest("Please provide avalid Id");
            else
            {
                var newUser = await userService.UpdateUserProfile(userId, registerRequest);
                if (newUser == null)
                    return BadRequest("Could not update user profile");
                return Ok(newUser);
            }
            return BadRequest("Something went wrong!");
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
            return BadRequest("Something went wrong!");
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
                    return NotFound("Email not valid!");
                }
                else if (token.Equals("Error: Password"))
                {
                    return NotFound("Password not valid");
                }
                else
                {
                    var userId = userService.GetUserByEmailAsync(user.Email);
                    return Ok(new { token.Result, userId });
                }

            }
            return BadRequest();

        }
    }
}
