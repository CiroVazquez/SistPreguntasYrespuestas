using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using BackEnd.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BackEnd.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RespuestaCuestionarioController : ControllerBase
    {
        private readonly IRespuestaCuestionarioService _respuestaCuestionarioService;
        private readonly ICuestionarioServices _cuestionarioServices;

        public RespuestaCuestionarioController(IRespuestaCuestionarioService respuestaCuestionarioService, ICuestionarioServices cuestionarioServices)
        {
            _respuestaCuestionarioService = respuestaCuestionarioService;
            _cuestionarioServices = cuestionarioServices;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RespuestaCuestionario respuestaCuestionario)
        {
            try
            {
                await _respuestaCuestionarioService.SaveRespuestaCuestionario(respuestaCuestionario);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{idCuestionario}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get(int idCuestionario)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);
                var listRespuestaCuestionario = await _respuestaCuestionarioService.ListRespuestaCuestionarios(idCuestionario, idUsuario);
                
                if(listRespuestaCuestionario == null)
                {
                    return BadRequest(new {message = "Error al buscar el listado de respuestas"});
                }
                return Ok(listRespuestaCuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }



        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);
                //creamos un metodo para obterner la respuesta al cuestionario
                var respuestaCuestionario = await _respuestaCuestionarioService.BuscarRespuestaCuestionario(id, idUsuario);
                if(respuestaCuestionario == null) {
                    return BadRequest(new { message = "Error al busacar la respuesta al cuestionario" });
                }

                await _respuestaCuestionarioService.EliminarRespuestaCuestionario(respuestaCuestionario);
                return Ok(new {message = "La respuesta al cuestionario fue eliminada con exito"});

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Route("GetCuestionarioByIdRespuesta/{idRespuesta}")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetCuestionarioByIdRespuesta(int IdRespuesta)
        {
            try
            {


                //obtenemos el idCuestionario dado un idRespuesta
                int idCuestionario = await _respuestaCuestionarioService.getIdCuestionarioByIdRespuesta(IdRespuesta);

                //Buscamos el cuestionario
                var cuestionario = await _cuestionarioServices.GetCuestionario(idCuestionario);

                //buscamos las respuestas seleccionadas dado un idRespuesta
                var listRespuestas = await _respuestaCuestionarioService.GetListRespuestas(IdRespuesta);

                return Ok(new { cuestionario = cuestionario, respuestas = listRespuestas });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }
    }
}
