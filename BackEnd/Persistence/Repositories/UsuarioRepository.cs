using BackEnd.Domain.IRepositories;
using BackEnd.Domain.Models;
using BackEnd.Persistence.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace BackEnd.Persistence.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AplicationDbContext _context;

        public UsuarioRepository(AplicationDbContext context) {
            _context = context;
        }

        public async Task saveUser(Usuario usuario)
        {
            _context.Add(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> validateExistence(Usuario usuario)
        {
            var validateExistence = await _context.Usuario.AnyAsync(x => x.NombreUsuario == usuario.NombreUsuario); //AnyAsync nos estas devolviendo un true o un false
            return validateExistence;
        }

        public async Task<Usuario> validatePassword(int idUsuario, string passwordAnterior)
        {
            var usuario = await _context.Usuario.Where(x => x.Id == idUsuario && x.Password == passwordAnterior).FirstOrDefaultAsync();
            return usuario;
        }

        //PruebaCiro -----------------------------------------
        public async Task<List<Usuario>> mostrarUsuarios()
        {
            var usuarios = await _context.Usuario.ToListAsync();
            return usuarios;
        }

        public async Task<Usuario> getUsuarioById(int id)
        {
            var usuario = await _context.Usuario.FirstOrDefaultAsync(x => x.Id == id);
            return usuario;
        }

        public async Task<bool> login(string nombre, string password)
        {
            return await _context.Usuario.AnyAsync(x => x.NombreUsuario == nombre && x.Password == password);
        }

        public async Task updatePassword(Usuario usuario)
        {
            _context.Update(usuario);
            await _context.SaveChangesAsync();
        }
        

    }
}
