using BackEnd.Domain.Models;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace BackEnd.Utils
{
    public class JwtConfigurator
    {
        public static string getToken(Usuario userInfo, IConfiguration config)
        {
            string secretKey = config["Jwt:SecretKey"];
            string Issuer = config["Jwt:Issuer"];
            string Audience = config["Jwt:Audience"];


            //Codigo muy comun

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] //claims o reclamaciones
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.NombreUsuario), //registraciones registradas
                new Claim("Id", userInfo.Id.ToString()) //reclamacion privada, se puede poner la cantidad de reclamaciones que se quiera
            };

            var token = new JwtSecurityToken(
                issuer: Issuer,
                audience: Audience,
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials
                );


            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        //Accedo a las propiedas de Touken
        public static int GetTokenIdUsuario(ClaimsIdentity identity)
        {
            if (identity != null)
            {
                IEnumerable<Claim> claims = identity.Claims;
                foreach (var claim in claims)
                {
                    if (claim.Type == "Id")
                    {
                        return int.Parse(claim.Value);
                    }
                }
            }
            return 0;
        }

    }
}
