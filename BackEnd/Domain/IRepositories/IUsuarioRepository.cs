using BackEnd.Domain.Models;

namespace BackEnd.Domain.IRepositories
{
    public interface IUsuarioRepository
    {
        Task saveUser(Usuario usuario);
        Task<bool> validateExistence(Usuario usuario);
        Task<Usuario> validatePassword(int idUsuario,  string passwordAnterior);
        Task updatePassword(Usuario usuario);

        //prueba ciro ------------------------------------------
        Task<List<Usuario>> mostrarUsuarios();
        Task<Usuario> getUsuarioById(int id);
        Task<bool> login(string nombreUsuario, string passwordUsuario);


    }
}
