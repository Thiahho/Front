using System.ComponentModel.DataAnnotations;

namespace BackendTienda.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? ImageUrl { get; set; }

        public string? Description { get; set; }

        [MaxLength(100)]
        public string? Brand { get; set; }

        [MaxLength(50)]
        public string? Category { get; set; }

        public bool IsFreeShipping { get; set; }

        [MaxLength(100)]
        public string? Style { get; set; }

        [MaxLength(10)]
        public string CurrencyFormat { get; set; } = "S/";

        [MaxLength(10)]
        public string CurrencyId { get; set; } = "PEN";

        public int Installments { get; set; } = 1;

        public int Stock { get; set; }

        [MaxLength(100)]
        public string? Warranty { get; set; }

        [MaxLength(50)]
        public string? Condition { get; set; }

        public virtual ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
    }
}
