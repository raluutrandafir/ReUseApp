namespace reuse_be.DTO
{
    public class UserDTO
    {
        //public string ? Id { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public UserDTO(string Email,string Password)
        {
            this.Email = Email;
            this.Password = Password; 
        }
        public UserDTO()
        {

        }
    }
}
