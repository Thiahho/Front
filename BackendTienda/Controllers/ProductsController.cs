using Microsoft.AspNetCore.Mvc;
using BackendTienda.Models;
using BackendTienda.DTOs;
using BackendTienda.Interfaces;
using Microsoft.AspNetCore.Cors;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace BackendTienda.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductoService _productoService;
        private readonly IWebHostEnvironment _environment;

        public ProductsController(IProductoService productoService, IWebHostEnvironment environment)
        {
            _productoService = productoService;
            _environment = environment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoDTO>>> GetProducts()
        {
            try
            {
                var products = await _productoService.GetAllProductsAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoDTO>> GetProduct(int id)
        {
            var product = await _productoService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        // [HttpPost]
        // public async Task<ActionResult<ProductoDTO>> CreateProduct(CreateProductoDto createDto)
        // {
        //     var product = await _productoService.CreateProductAsync(createDto);
        //     return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        // }

        // [HttpPost("{productId}/variants")]
        // public async Task<ActionResult<ProductVariantDTO>> AddVariant(int productId, CreateVariantDto variantDto)
        // {
        //     var variant = await _productoService.AddVariantAsync(productId, variantDto);
        //     return CreatedAtAction(nameof(GetProduct), new { id = productId }, variant);
        // }

        [HttpGet("{productId}/variants")]
        public async Task<ActionResult<IEnumerable<ProductVariantDTO>>> GetVariants(int productId)
        {
            var variants = await _productoService.GetVariantsByProductIdAsync(productId);
            return Ok(variants);
        }

        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<ProductoDTO>>> GetFilteredProducts([FromQuery] ProductoFilterDto filterDto)
        {
            try
            {
                var products = await _productoService.GetFilteredProductsAsync(filterDto);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpGet("image/{*imagePath}")]
        public IActionResult GetImage(string imagePath)
        {
            // Asegurarse de que la ruta comience con "images"
            if (!imagePath.StartsWith("images"))
            {
                imagePath = Path.Combine("images", imagePath);
            }

            var fullPath = Path.Combine(_environment.ContentRootPath, "..", "server", "public", imagePath);
            Console.WriteLine($"Attempting to load image from: {fullPath}"); // Debug log

            if (!System.IO.File.Exists(fullPath))
            {
                Console.WriteLine($"Image not found: {fullPath}"); // Debug log
                return NotFound();
            }

            var mimeType = GetContentType(Path.GetExtension(fullPath));
            return PhysicalFile(fullPath, mimeType);
        }

        [HttpGet("test")]  // Cambiar la ruta para evitar conflicto con {id}
        public IActionResult TestImagePath()
        {
            var basePath = Path.Combine(_environment.ContentRootPath, "..", "server", "public");
            var testPaths = new[]
            {
                Path.Combine(basePath, "images", "xiaomi"),
                Path.Combine(basePath, "images", "consoles")  // Agregamos la ruta de consoles
            };
            
            var result = new {
                BasePathExists = Directory.Exists(basePath),
                BasePath = basePath,
                ImagesPathExists = Directory.Exists(Path.Combine(basePath, "images")),
                Directories = testPaths.Select(path => new {
                    Path = path,
                    Exists = Directory.Exists(path),
                    Files = Directory.Exists(path) ? Directory.GetFiles(path) : new string[0]
                }).ToList(),
                RequestUrl = Request.Path.Value,
                FullUrl = $"{Request.Scheme}://{Request.Host}{Request.Path}{Request.QueryString}"
            };
            
            return Ok(result);
        }

        private string GetContentType(string extension)
        {
            return extension.ToLower() switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".webp" => "image/webp",
                _ => "application/octet-stream"
            };
        }
    }
}
