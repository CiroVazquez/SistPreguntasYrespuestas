using BackEnd.Domain.IRepositories;
using BackEnd.Domain.IServices;
using BackEnd.Persistence.Context;
using BackEnd.Persistence.Repositories;
using BackEnd.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("conexion"));
});

builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<ILoginServices, LoginService>(); //bindea iloginservices, esta interfaz, con la clase loginservice
builder.Services.AddScoped<ILoginRepository, LoginRepository>();
builder.Services.AddScoped<ICuestionarioServices, CuestionarioService>();
builder.Services.AddScoped<ICuestionarioRepository, CuestionarioRepository>();
builder.Services.AddScoped<IRespuestaCuestionarioService, RespuestaCuestionarioService>();
builder.Services.AddScoped<IRespuestaCuestionarioRepository, RespuestaCuestionarioRepository>();


//Add Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"])), // Corregido aquí
        ClockSkew = TimeSpan.Zero // En lugar de clockSkew, debería ser ClockSkew
    };
});

//Configuracion para EntityFramework, likear, paquete nuget
builder.Services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

//Configuramos los Cors
builder.Services.AddCors(Options => Options.AddPolicy("AllowWebapp", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

//Configuracion de Cors

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Agregamos esto para la autentucacion de los endpoints
app.UseAuthentication();

app.UseCors("AllowWebapp");

app.UseAuthorization();

app.MapControllers();

app.Run();
