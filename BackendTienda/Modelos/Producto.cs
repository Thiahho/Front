using System.ComponentModel.DataAnnotations;

namespace BackendTienda.Modelos
{
    public class Producto
    {
        public int Id { get; set; }

        [MaxLength(200)]
        public string Nombre { get; set; } = string.Empty;

        public string Descripcion { get; set; } = string.Empty;

        public decimal Precio { get; set; }

        public string Marca { get; set; } = string.Empty;

        public string Modelo { get; set; } = string.Empty;

        public string Imagen_Url { get; set; } = string.Empty;

        public string Categoria { get; set; } = string.Empty;

        public string Condicion { get; set; } = string.Empty; // Cambiado de Estado a Condicion

        public string? Especificaciones { get; set; } // Opcional, puede ser null

        public string Garantia { get; set; } = string.Empty;

        public int Stock { get; set; }

        public bool EnvioGratis { get; set; }

        public string Moneda { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
