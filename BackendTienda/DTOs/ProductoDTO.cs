namespace BackendTienda.DTOs
{
    public class ProductoDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public bool IsFreeShipping { get; set; }
        public string Style { get; set; } = string.Empty;
        public string CurrencyFormat { get; set; } = "S/";
        public string CurrencyId { get; set; } = "PEN";
        public int Installments { get; set; }
        public List<ProductVariantDTO> Variants { get; set; } = new();
    }

    public class CreateProductoDto
    {
        public string Title { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public string? Brand { get; set; }
        public string? Category { get; set; }
        public bool IsFreeShipping { get; set; }
        public string? Style { get; set; }
    }

    public class ProductoFilterDto
    {
        public string? Brand { get; set; }
        public string? Category { get; set; }
        public bool? IsFreeShipping { get; set; }
    }

    public class UpdateProductoDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public bool IsFreeShipping { get; set; }
        public string Style { get; set; }
        public List<UpdateVariantDto> Variants { get; set; }
    }

    public class UpdateVariantDto
    {
        public int Id { get; set; }
        public string Storage { get; set; }
        public string Ram { get; set; }
        public decimal Price { get; set; }
    }
}
