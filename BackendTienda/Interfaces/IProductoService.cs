using BackendTienda.DTOs;
using BackendTienda.Models;

namespace BackendTienda.Interfaces
{
    public interface IProductoService
    {
        Task<IEnumerable<ProductoDTO>> GetAllProductsAsync();
        Task<ProductoDTO> GetProductByIdAsync(int id);
        Task<ProductoDTO> CreateProductAsync(CreateProductoDto createDto);
        Task<ProductVariantDTO> AddVariantAsync(int productId, CreateVariantDto variantDto);
        Task<IEnumerable<ProductVariantDTO>> GetVariantsByProductIdAsync(int productId);
        Task<IEnumerable<ProductoDTO>> GetFilteredProductsAsync(ProductoFilterDto filterDto);
    }
}
