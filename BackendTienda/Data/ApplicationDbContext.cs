using Microsoft.EntityFrameworkCore;
using BackendTienda.Models;
using BackendTienda.DTOs;

namespace BackendTienda.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductVariant> ProductVariants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("products");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("title");
                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(255)
                    .HasColumnName("imageUrl")
                    .IsRequired(false); // Permitir nulos
                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasColumnType("text")
                    .IsRequired(false); // Permitir nulos
                entity.Property(e => e.Brand)
                    .HasMaxLength(100)
                    .HasColumnName("brand")
                    .IsRequired(false); // Permitir nulos
                entity.Property(e => e.Category)
                    .HasMaxLength(50)
                    .HasColumnName("category")
                    .IsRequired(false) // Permitir nulos
                    .HasConversion(
                        v => string.IsNullOrEmpty(v) ? DBNull.Value.ToString() : v.ToLower(),
                        v => v
                    );
                entity.Property(e => e.IsFreeShipping)
                    .HasColumnName("isFreeShipping")
                    .HasDefaultValue(false);
                entity.Property(e => e.Style)
                    .HasMaxLength(100)
                    .HasColumnName("style")
                    .IsRequired(false); // Permitir nulos
                entity.Property(e => e.CurrencyFormat)
                    .HasMaxLength(10)
                    .HasColumnName("currencyFormat")
                    .HasDefaultValue("S/");
                entity.Property(e => e.CurrencyId)
                    .HasMaxLength(10)
                    .HasColumnName("currencyId")
                    .HasDefaultValue("PEN");
                entity.Property(e => e.Installments)
                    .HasColumnName("installments")
                    .HasDefaultValue(1);
            });

            modelBuilder.Entity<ProductVariant>(entity =>
            {
                entity.ToTable("product_variants");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.ProductId).HasColumnName("productId"); // Cambiado de ProductoId a ProductId
                entity.Property(e => e.Storage)
                    .HasMaxLength(50)
                    .HasColumnName("storage")
                    .IsRequired(false) // Permitir nulos
                    .HasConversion(
                        v => string.IsNullOrEmpty(v) ? DBNull.Value.ToString() : v,
                        v => string.IsNullOrEmpty(v) ? null : v
                    );
                entity.Property(e => e.Ram)
                    .HasMaxLength(50)
                    .HasColumnName("ram")
                    .IsRequired(false) // Permitir nulos
                    .HasConversion(
                        v => string.IsNullOrEmpty(v) ? DBNull.Value.ToString() : v,
                        v => string.IsNullOrEmpty(v) ? null : v
                    );
                entity.Property(e => e.Price)
                    .HasColumnName("price")
                    .HasPrecision(10, 2)
                    .HasColumnType("decimal(10,2)");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Variants)
                    .HasForeignKey(d => d.ProductId) // Cambiado de ProductoId a ProductId
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ProductVariants_Products");
            });

            modelBuilder.Entity<Product>()
                .HasMany(p => p.Variants)
                .WithOne(v => v.Product)
                .HasForeignKey(v => v.ProductId); // Cambiado de ProductoId a ProductId
        }
    }
}