using BackEnd.Domain.Models;

namespace BackEnd.Domain.IServices
{
    public interface IRespuestaCuestionarioService
    {
        Task SaveRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario);
        Task<List<RespuestaCuestionario>> ListRespuestaCuestionarios(int idCuestionario, int idUsuario);
        Task<RespuestaCuestionario> BuscarRespuestaCuestionario(int idRtaCuestionario, int idUsuario);
        Task EliminarRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario);
        Task<int> getIdCuestionarioByIdRespuesta(int idRespuestaCuestionario);
        Task<List<RespuestaCuestionarioDetalle>> GetListRespuestas(int idRespuestaCuestionario);



    }
}
