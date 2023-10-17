using BackEnd.Domain.Models;
using System.Runtime.CompilerServices;

namespace BackEnd.Domain.IServices
{
    public interface IUsuarioService
    {
        Task saveUser(Usuario usuario);
        Task<bool> validateExistence(Usuario usuario);
        Task<Usuario> validatePassword(int idUsuario, string passwordAnterior);
        Task updatePassword(Usuario usuario);


        //prueba Ciro -------------------------
        Task<List<Usuario>> mostrarUsuarios();
        Task<Usuario> getUsuarioById(int id);
        Task<bool> login(string nombreUsuario, String passwordUsuario);
    }
}
