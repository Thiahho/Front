using AutoMapper;
using BackendTienda.Models;
using BackendTienda.DTOs;

namespace BackendTienda.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Mapeo de Product <-> ProductoDTO
            CreateMap<Product, ProductoDTO>();
            CreateMap<ProductoDTO, Product>();

            // Mapeo de ProductVariant <-> ProductVariantDTO
            CreateMap<ProductVariant, ProductVariantDTO>();
            CreateMap<ProductVariantDTO, ProductVariant>();

            // Mapeo para creación
            CreateMap<CreateProductoDto, Product>();
            CreateMap<CreateVariantDto, ProductVariant>();

            // Mapeo para actualización
            CreateMap<UpdateProductoDto, Product>();
            CreateMap<UpdateVariantDto, ProductVariant>();
        }
    }
}