using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Final.Models;

public partial class DbFinalContext : DbContext
{
    public DbFinalContext()
    {
    }

    public DbFinalContext(DbContextOptions<DbFinalContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblEditorial> TblEditorials { get; set; }

    public virtual DbSet<TblEstado> TblEstados { get; set; }

    public virtual DbSet<TblEstadoPrestamo> TblEstadoPrestamos { get; set; }

    public virtual DbSet<TblLibro> TblLibros { get; set; }

    public virtual DbSet<TblPrestamo> TblPrestamos { get; set; }

    public virtual DbSet<TblRol> TblRols { get; set; }

    public virtual DbSet<TblUsuario> TblUsuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=SQL8003.site4now.net;Initial Catalog=db_aa1d48_dbustamante;User Id=db_aa1d48_dbustamante_admin;Password=Danibtte98");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblEditorial>(entity =>
        {
            entity.HasKey(e => e.IdEditorial).HasName("PK__tbl_Edit__10C1DD02452592AC");

            entity.ToTable("tbl_Editorial");

            entity.Property(e => e.IdEditorial)
                .ValueGeneratedNever()
                .HasColumnName("id_editorial");
            entity.Property(e => e.CorreoElectronico).HasMaxLength(100);
            entity.Property(e => e.Direccion).HasMaxLength(255);
            entity.Property(e => e.Editorial)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("editorial");
            entity.Property(e => e.NumeroTelefono).HasMaxLength(20);
        });

        modelBuilder.Entity<TblEstado>(entity =>
        {
            entity.HasKey(e => e.IdEstado).HasName("PK__tbl_Esta__86989FB2A259362D");

            entity.ToTable("tbl_Estado");

            entity.Property(e => e.IdEstado)
                .ValueGeneratedNever()
                .HasColumnName("id_estado");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("estado");
        });

        modelBuilder.Entity<TblEstadoPrestamo>(entity =>
        {
            entity.HasKey(e => e.IdEstado).HasName("PK__tbl_Esta__86989FB276EA7EF7");

            entity.ToTable("tbl_EstadoPrestamo");

            entity.Property(e => e.IdEstado)
                .ValueGeneratedNever()
                .HasColumnName("id_estado");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("estado");
        });

        modelBuilder.Entity<TblLibro>(entity =>
        {
            entity.HasKey(e => e.IdLibro).HasName("PK__tbl_Libr__EC09C24E09A4FED6");

            entity.ToTable("tbl_Libro");

            entity.Property(e => e.IdLibro)
                .ValueGeneratedNever()
                .HasColumnName("id_libro");
            entity.Property(e => e.AutorLibro)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("autor_libro");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.Edicion).HasColumnName("edicion");
            entity.Property(e => e.FechaPublicacion)
                .HasColumnType("date")
                .HasColumnName("fecha_publicacion");
            entity.Property(e => e.IdEditorial).HasColumnName("id_editorial");
            entity.Property(e => e.IdEstado).HasColumnName("id_estado");
            entity.Property(e => e.NombreLibro)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre_libro");

            entity.HasOne(d => d.IdEditorialNavigation).WithMany(p => p.TblLibros)
                .HasForeignKey(d => d.IdEditorial)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tbl_Libro__id_ed__30F848ED");

            entity.HasOne(d => d.IdEstadoNavigation).WithMany(p => p.TblLibros)
                .HasForeignKey(d => d.IdEstado)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tbl_Libro__id_es__31EC6D26");
        });

        modelBuilder.Entity<TblPrestamo>(entity =>
        {
            entity.HasKey(e => e.IdPrestamo).HasName("PK__tbl_Pres__5E87BE27720D6CB2");

            entity.ToTable("tbl_Prestamo");

            entity.Property(e => e.IdPrestamo)
                .ValueGeneratedNever()
                .HasColumnName("id_prestamo");
            entity.Property(e => e.FechaDevolucion)
                .HasColumnType("date")
                .HasColumnName("fecha_devolucion");
            entity.Property(e => e.FechaPrestamo)
                .HasColumnType("date")
                .HasColumnName("fecha_prestamo");
            entity.Property(e => e.IdEstado).HasColumnName("id_estado");
            entity.Property(e => e.IdLibro).HasColumnName("id_libro");
            entity.Property(e => e.IdUsuario).HasColumnName("id_Usuario");

            entity.HasOne(d => d.IdEstadoNavigation).WithMany(p => p.TblPrestamos)
                .HasForeignKey(d => d.IdEstado)
                .HasConstraintName("FK_Prestamo_Estado");

            entity.HasOne(d => d.IdLibroNavigation).WithMany(p => p.TblPrestamos)
                .HasForeignKey(d => d.IdLibro)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tbl_Prest__id_li__3B75D760");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.TblPrestamos)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tbl_Prest__id_Us__3C69FB99");
        });

        modelBuilder.Entity<TblRol>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PK__tbl_Rol__6ABCB5E03C8DCCD7");

            entity.ToTable("tbl_Rol");

            entity.Property(e => e.IdRol)
                .ValueGeneratedNever()
                .HasColumnName("id_rol");
            entity.Property(e => e.Rol)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("rol");
        });

        modelBuilder.Entity<TblUsuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__tbl_Usua__8E901EAA126F032C");

            entity.ToTable("tbl_Usuario");

            entity.Property(e => e.IdUsuario)
                .ValueGeneratedNever()
                .HasColumnName("id_Usuario");
            entity.Property(e => e.CedulaUsuario).HasColumnName("cedula_usuario");
            entity.Property(e => e.CelularUsuario).HasColumnName("celular_usuario");
            entity.Property(e => e.Contraseña)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("contraseña");
            entity.Property(e => e.CorreoUsuario)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("correo_usuario");
            entity.Property(e => e.IdRol).HasColumnName("id_rol");
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre_usuario");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.TblUsuarios)
                .HasForeignKey(d => d.IdRol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tbl_Usuar__id_ro__38996AB5");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
