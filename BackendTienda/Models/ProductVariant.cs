using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendTienda.Models
{
    public class ProductVariant
    {
        [Key]
        public int Id { get; set; }
        
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        
        [MaxLength(50)]
        public string? Storage { get; set; }
        
        [MaxLength(50)]
        public string? Ram { get; set; }
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal? Price { get; set; }

        public virtual Product Product { get; set; }
    }
}
