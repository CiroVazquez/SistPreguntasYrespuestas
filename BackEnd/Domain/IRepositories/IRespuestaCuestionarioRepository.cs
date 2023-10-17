using BackEnd.Domain.Models;

namespace BackEnd.Domain.IRepositories
{
    public interface IRespuestaCuestionarioRepository
    {
        Task SaveRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario);
        Task<List<RespuestaCuestionario>> ListRespuestaCuestionarios(int idCuestionario, int idUsuario);
        Task<RespuestaCuestionario> BuscarRespuestaCuestionario(int idRtaCuestionario, int idUsuario);
        Task EliminarRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario);
        Task<int> getIdCuestionarioByIdRespuesta(int idRespuestaCuestionario);
        Task<List<RespuestaCuestionarioDetalle>> GetListRespuestas(int idRespuestaCuestionario);



    }
}
