using BackendTienda.Data;
using Microsoft.EntityFrameworkCore;
using BackendTienda.Interfaces;
using BackendTienda.Repositorios;
using BackendTienda.Services;
using BackendTienda.Middleware;
using Microsoft.Extensions.FileProviders;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultPolicy", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",  // React default port
                "http://localhost:5173"   // Vite default port
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("Content-Disposition");
    });
});

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Tienda API", Version = "v1" });
    
    // Make XML comments optional
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

// Database configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Register services
builder.Services.AddScoped<IProductoRepositorio, ProductoRepositorio>();
builder.Services.AddScoped<IProductoService, ProductoService>();
builder.Services.AddAutoMapper(typeof(Program));

// Add custom error handling
builder.Services.AddTransient<GlobalExceptionHandlingMiddleware>();

var app = builder.Build();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<GlobalExceptionHandlingMiddleware>();

// Static files configuration
app.UseStaticFiles(); // For wwwroot folder

// Ensure Images directory exists
var imagesPath = Path.Combine(builder.Environment.ContentRootPath, "Images");
Directory.CreateDirectory(imagesPath); // Esta línea creará el directorio si no existe

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(imagesPath),
    RequestPath = "/images"
});

app.UseRouting(); // Primero UseRouting

app.UseCors("DefaultPolicy"); // Después UseCors

app.UseAuthorization(); // Luego UseAuthorization

app.MapControllers();

app.Run();
