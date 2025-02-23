namespace BackendTienda.DTOs
{
    public class ProductVariantDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Storage { get; set; } = string.Empty;
        public string Ram { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }

    public class CreateVariantDto
    {
        public string? Storage { get; set; }
        public string? Ram { get; set; }
        public decimal Price { get; set; }
    }
}
