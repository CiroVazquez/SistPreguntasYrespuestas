using BackEnd.Domain.IRepositories;
using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;

namespace BackEnd.Services
{
    public class LoginService : ILoginServices
    {
        public readonly ILoginRepository _loginRepository;

        public LoginService(ILoginRepository loginRepository) {
            _loginRepository = loginRepository;
        }

        public async Task<Usuario> validateUser(Usuario usuario)
        {
            return await _loginRepository.validateUser(usuario);
        }

    }
}
