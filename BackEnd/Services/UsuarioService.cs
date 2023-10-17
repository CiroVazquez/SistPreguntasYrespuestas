using BackEnd.Domain.IRepositories;
using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using Microsoft.IdentityModel.Tokens;

namespace BackEnd.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRespository;

        public UsuarioService(IUsuarioRepository usuarioRepository) {

            _usuarioRespository = usuarioRepository;
        }

        public async Task saveUser(Usuario usuario)
        {
            await _usuarioRespository.saveUser(usuario);
        }

        public async Task<bool> validateExistence(Usuario usuario)
        {
            return await _usuarioRespository.validateExistence(usuario);
        }

        public async Task<Usuario> validatePassword(int idUsuario, string passwordAnterior)
        {
            return await _usuarioRespository.validatePassword(idUsuario, passwordAnterior);
        }

        public async Task updatePassword(Usuario usuario)
        {
            await _usuarioRespository.updatePassword(usuario);
        }





        //prueba ciro -----------------------------------
        public async Task<List<Usuario>> mostrarUsuarios()
        {
            return await _usuarioRespository.mostrarUsuarios();
        }

        public async Task<Usuario> getUsuarioById(int id)
        {
            return await _usuarioRespository.getUsuarioById(id);

        }

        public async Task<bool> login(string usuario, string password)
        {
            return await _usuarioRespository.login(usuario, password); 
        }
    }
}
