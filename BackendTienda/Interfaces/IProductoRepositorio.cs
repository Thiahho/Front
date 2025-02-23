using BackendTienda.Models;
using BackendTienda.DTOs;

namespace BackendTienda.Interfaces
{
    public interface IProductoRepositorio
    {
        Task<IEnumerable<Product>> GetAllWithVariantsAsync();
        Task<Product> GetByIdWithVariantsAsync(int id);
        Task<Product> AddAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(int id);
        Task<ProductVariant> AddVariantAsync(ProductVariant variant);
        Task<IEnumerable<ProductVariant>> GetVariantsByProductIdAsync(int productId);
        Task<IEnumerable<Product>> GetFilteredProductsAsync(ProductoFilterDto filterDto);
    }
}
