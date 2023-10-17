using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using BackEnd.Services;
using BackEnd.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CuestionarioController : Controller
    {
        private readonly ICuestionarioServices _cuestionarioServices;


        public CuestionarioController(ICuestionarioServices cuestionarioService)
        {
            _cuestionarioServices = cuestionarioService;
        }


        [Route("RegistrarCuestionario")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Cuestionario cuestionario)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);


                cuestionario.UsuarioId = idUsuario;
                cuestionario.Activo = 1;
                cuestionario.FechaCreacion = DateTime.Now;
                await _cuestionarioServices.CreateCuestionario(cuestionario);

                return Ok(new {message = "se agrego el cuestionario exitosamente"});
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [Route("GetListCuestionarioByUser")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListCuestionarioByUser(){

            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);

                var listCuestionario = await _cuestionarioServices.GetListCuestionarioByUser(idUsuario);
                return Ok(listCuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }


        [HttpGet("{idCuestionario}")]
        public async Task<IActionResult> Get(int idCuestionario)
        {
            try
            {
                var cuestionario = await _cuestionarioServices.GetCuestionario(idCuestionario);
                return Ok(cuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{idCuestionario}")]
        [Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete(int idCuestionario)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);

                var cuestionario = await _cuestionarioServices.BuscarCuestionario(idCuestionario, idUsuario);
                if (cuestionario == null)
                {
                    return BadRequest(new { message = "No se encontro ningun cuestionario" });
                }
                else
                {
                    await _cuestionarioServices.EliminarCuestionario(cuestionario);
                    return Ok(new { message = "El cuestionario fue eliminado con exito" } );
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Route("GetListCuestionarios")]
        [HttpGet]
        public async Task<IActionResult> GetListCuestionario()
        {
            try
            {
                var listCuestionario = await _cuestionarioServices.GetListCuestionario();
                return Ok(listCuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
