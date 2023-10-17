using System.Text.Json.Serialization;

namespace BackEnd.Domain.Models
{
    public class RespuestaCuestionarioDetalle
    {
        public int? Id { get; set; }

        public int? RespuestaCuestionarioId { get; set; }
        //[JsonIgnore]
        public RespuestaCuestionario? RespuestaCuestionario { get; set; }

        public int RespuestaId { get; set; }
        //[JsonIgnore]
        public Respuesta? Respuesta { get; set; }
    }
}
