using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using BackEnd.Utils;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly ILoginServices _loginServices;
        private readonly IConfiguration _config; //para trabajar con JWT

        public LoginController(ILoginServices loginServices, IConfiguration config)
        {
            _loginServices = loginServices;
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Usuario usuario)
        {
            try
            {
                usuario.Password = Encriptar.EncriptarPassword(usuario.Password);
                var user = await _loginServices.validateUser(usuario);
                if (user == null)
                {
                    return BadRequest(new { message = "Usuario o contraseña incorrectos" });
                }

                string tokenString = JwtConfigurator.getToken(user, _config);
                return Ok(new { token  = tokenString });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }




    }
}
