using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using BackEnd.DTO;
using BackEnd.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BackEnd.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService) {
            
            _usuarioService = usuarioService;
        }

        [Route("ingresarUsuario")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Usuario usuario)
        {
            try
            {
                var validateExistence = await _usuarioService.validateExistence(usuario);
                if (validateExistence)
                {
                    return BadRequest(new {message = "El usuario "+usuario.NombreUsuario+" ya existe"});
                }

                usuario.Password = Encriptar.EncriptarPassword(usuario.Password);
                await _usuarioService.saveUser(usuario);
                return Ok(new { message = "Usuario registrado con exito" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        //localhost:xxx/api/Usuario/CambiarPassword
        [Route("CambiarPassword")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] //Con esto protejo el endpoint, estoy diciendo que esta ruta necesita tener autenticacion para poder ingresar
        [HttpPut]
        public async Task<IActionResult> cambiarPassword([FromBody]CambiarPasswordDTO cambiarPassword)
        {
            try 
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity) ;

                string passwordEncriptado = Encriptar.EncriptarPassword(cambiarPassword.passwordAnterior);
                var usuario = await _usuarioService.validatePassword(idUsuario, passwordEncriptado);

                if (usuario == null)
                {
                    return BadRequest(new {message = "La password es incorrecta"});
                }
                else
                {
                    usuario.Password = Encriptar.EncriptarPassword(cambiarPassword.nuevaPassword);
                    await _usuarioService.updatePassword(usuario);
                    return Ok(new { message = "La password fue actualizada con exito" });
                }

                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Prueba Ciro---------------------------------------------------------------------------------------------
        [Route("MostrarUsuarios")]
        [HttpGet]
        public async Task<IActionResult> mostrarUsuario()
        {
            try
            {
                var usuarios = await _usuarioService.mostrarUsuarios();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetUsuarioById")]
        [HttpGet]
        public async Task<IActionResult> getUsuarioById(int id)
        {
            try
            {
                var usuario = await _usuarioService.getUsuarioById(id);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("login")]
        [HttpGet]
        public async Task<IActionResult> login(string usuario, string contraseña)
        {
            try
            {
                var contraseñaEncriptada = Encriptar.EncriptarPassword(contraseña);
                var login = await _usuarioService.login(usuario, contraseñaEncriptada);
                if (login)
                {
                    return Ok(login) ;
                }
                else
                {
                    return Ok(login);
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }



    }
}
