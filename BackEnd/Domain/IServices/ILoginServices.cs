using BackEnd.Domain.Models;

namespace BackEnd.Domain.IServices
{
    public interface ILoginServices
    {
        Task<Usuario> validateUser(Usuario usuario);
    }
}
