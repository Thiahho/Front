// using AutoMapper;
// using BackendTienda.DTOs;
// using BackendTienda.Interfaces;
// using BackendTienda.Models;

// namespace BackendTienda.Servicios
// {
//     public class ProductoService : IProductoService
//     {
//         private readonly IProductoRepositorio _repository;
//         private readonly IMapper _mapper;

//         public ProductoService(IProductoRepositorio repository, IMapper mapper)
//         {
//             _repository = repository;
//             _mapper = mapper;
//         }

//         public async Task<IEnumerable<ProductoDTO>> GetAllProductsAsync()
//         {
//             var products = await _repository.GetAllWithVariantsAsync();
//             return _mapper.Map<IEnumerable<ProductoDTO>>(products);
//         }

//         public async Task<ProductoDTO> GetProductByIdAsync(int id)
//         {
//             var product = await _repository.GetByIdWithVariantsAsync(id);
//             return _mapper.Map<ProductoDTO>(product);
//         }

//         public async Task<ProductoDTO> CreateProductAsync(CreateProductoDto productoDto)
//         {
//             var product = _mapper.Map<Product>(productoDto);
//             var createdProduct = await _repository.CreateAsync(product);
//             return _mapper.Map<ProductoDTO>(createdProduct);
//         }

//         public async Task<ProductVariantDTO> AddVariantAsync(int productId, CreateVariantDto variantDto)
//         {
//             var variant = _mapper.Map<ProductVariant>(variantDto);
//             var createdVariant = await _repository.AddVariantAsync(productId, variant);
//             return _mapper.Map<ProductVariantDTO>(createdVariant);
//         }

//         public async Task<IEnumerable<ProductVariantDTO>> GetVariantsByProductIdAsync(int productId)
//         {
//             var variants = await _repository.GetVariantsByProductIdAsync(productId);
//             return _mapper.Map<IEnumerable<ProductVariantDTO>>(variants);
//         }

//         public async Task<IEnumerable<ProductoDTO>> GetFilteredProductsAsync(ProductoFilterDto filterDto)
//         {
//             var products = await _repository.GetFilteredAsync(filterDto);
//             return _mapper.Map<IEnumerable<ProductoDTO>>(products);
//         }
//     }
// }