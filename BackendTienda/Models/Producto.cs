using System.ComponentModel.DataAnnotations;

namespace BackendTienda.Models
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public decimal Precio { get; set; }
        public string Descripcion { get; set; }
        public List<string> Capacidad { get; set; }
        public string Imagen_Url { get; set; }
        public bool EnvioGratis { get; set; }
        public string Categoria { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Moneda { get; set; }
        public string Garantia { get; set; }
        public int Stock { get; set; }
        public string Especificaciones { get; set; }
        public string Condicion { get; set; }
    }
}
