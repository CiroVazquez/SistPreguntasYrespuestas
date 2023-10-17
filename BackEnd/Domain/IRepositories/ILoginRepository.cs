using BackEnd.Domain.Models;

namespace BackEnd.Domain.IRepositories
{
    public interface ILoginRepository
    {
        Task<Usuario> validateUser(Usuario usuario);
    }
}
