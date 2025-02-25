using BackendTienda.Data;
using BackendTienda.Interfaces;
using BackendTienda.Models;
using BackendTienda.DTOs;
using Microsoft.EntityFrameworkCore;

namespace BackendTienda.Repositorios
{
    public class ProductoRepositorio : IProductoRepositorio
    {
        private readonly ApplicationDbContext _context;

        public ProductoRepositorio(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllWithVariantsAsync()
        {
            return await _context.Products
                .Include(p => p.Variants)
                .ToListAsync();
        }

        public async Task<Product> GetByIdWithVariantsAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Variants)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Product> AddAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<ProductVariant> AddVariantAsync(ProductVariant variant)
        {
            _context.ProductVariants.Add(variant);
            await _context.SaveChangesAsync();
            return variant;
        }

        public async Task UpdateAsync(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<ProductVariant>> GetVariantsByProductIdAsync(int productId)
        {
            return await _context.ProductVariants
                .Where(v => v.ProductId == productId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetFilteredProductsAsync(ProductoFilterDto filterDto)
        {
            var query = _context.Products
                .Include(p => p.Variants)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filterDto.Brand))
                query = query.Where(p => p.Brand == filterDto.Brand);

            if (!string.IsNullOrWhiteSpace(filterDto.Category))
                query = query.Where(p => p.Category == filterDto.Category);

            if (filterDto.IsFreeShipping.HasValue)
                query = query.Where(p => p.IsFreeShipping == filterDto.IsFreeShipping.Value);

            if (!string.IsNullOrWhiteSpace(filterDto.Condition))
                query = query.Where(p => p.Condition == filterDto.Condition);

            return await query.ToListAsync();
        }
    }
}