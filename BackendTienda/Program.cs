using BackendTienda.Data;
using Microsoft.EntityFrameworkCore;
using BackendTienda.Interfaces;
using BackendTienda.Repositorios;
using Microsoft.Extensions.FileProviders;
using BackendTienda.Services;

var builder = WebApplication.CreateBuilder(args);

// Servicios
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<IProductoRepositorio, ProductoRepositorio>();
builder.Services.AddScoped<IProductoService, ProductoService>();
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Orden correcto de middleware
app.UseRouting();

// Configuración de archivos estáticos
app.UseStaticFiles(); // Para wwwroot
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "..", "server", "public")),
    RequestPath = "",  // Cambiar a ruta vacía
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
        // Log para debugging
        var requestPath = ctx.Context.Request.Path;
        var physicalPath = ctx.File.PhysicalPath;
        Console.WriteLine($"Request Path: {requestPath}");
        Console.WriteLine($"Physical Path: {physicalPath}");
    }
});

app.UseCors("AllowAll");
app.UseAuthorization();

app.MapControllers()
   .RequireCors("AllowAll");

app.Run();
