using BackendTienda.DTOs;
using BackendTienda.Models;
using BackendTienda.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace BackendTienda.Services
{
    public class ProductoService : IProductoService
    {
        private readonly IProductoRepositorio _repositorio;
        private readonly IMapper _mapper;

        public ProductoService(IProductoRepositorio repositorio, IMapper mapper)
        {
            _repositorio = repositorio;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductoDTO>> GetAllProductsAsync()
        {
            var products = await _repositorio.GetAllWithVariantsAsync();
            return products.Select(MapToDTO);
        }

        public async Task<ProductoDTO> GetProductByIdAsync(int id)
        {
            var product = await _repositorio.GetByIdWithVariantsAsync(id);
            return product != null ? MapToDTO(product) : null;
        }

        public async Task<ProductoDTO> CreateProductAsync(CreateProductoDto createDto)
        {
            var product = _mapper.Map<Product>(createDto);
            await _repositorio.AddAsync(product);
            return MapToDTO(product);
        }

        public async Task<ProductVariantDTO> AddVariantAsync(int productId, CreateVariantDto variantDto)
        {
            var variant = _mapper.Map<ProductVariant>(variantDto);
            variant.ProductId = productId;
            await _repositorio.AddVariantAsync(variant);
            return _mapper.Map<ProductVariantDTO>(variant);
        }

        public async Task<IEnumerable<ProductVariantDTO>> GetVariantsByProductIdAsync(int productId)
        {
            var variants = await _repositorio.GetVariantsByProductIdAsync(productId);
            return variants.Select(v => _mapper.Map<ProductVariantDTO>(v));
        }

        public async Task<IEnumerable<ProductoDTO>> GetFilteredProductsAsync(ProductoFilterDto filterDto)
        {
            var products = await _repositorio.GetFilteredProductsAsync(filterDto);
            return products.Select(MapToDTO);
        }

        private ProductoDTO MapToDTO(Product product)
        {
            if (product == null) return null;

            return new ProductoDTO
            {
                Id = product.Id,
                Title = product.Title,
                ImageUrl = product.ImageUrl ?? "",
                Description = product.Description ?? "",
                Brand = product.Brand ?? "",
                Category = product.Category ?? "",
                IsFreeShipping = product.IsFreeShipping,
                Style = product.Style ?? "",
                CurrencyFormat = product.CurrencyFormat ?? "S/",
                CurrencyId = product.CurrencyId ?? "PEN",
                Installments = product.Installments,
                Variants = product.Variants?.Select(v => new ProductVariantDTO
                {
                    Id = v.Id,
                    ProductId = v.ProductId,
                    Storage = v.Storage ?? "",
                    Ram = v.Ram ?? "",
                    Price = (decimal)v.Price
                }).ToList() ?? new List<ProductVariantDTO>()
            };
        }
    }
}
