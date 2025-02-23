using System.ComponentModel.DataAnnotations;

namespace BackendTienda.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public string? Brand { get; set; }
        public string? Category { get; set; }
        public bool IsFreeShipping { get; set; }
        public string? Style { get; set; }
        public string CurrencyFormat { get; set; } = "S/";
        public string CurrencyId { get; set; } = "PEN";
        public int Installments { get; set; } = 1;
        public virtual ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
    }
}
