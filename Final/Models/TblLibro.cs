using System;
using System.Collections.Generic;

namespace Final.Models;

public partial class TblLibro
{
    public int IdLibro { get; set; }

    public string NombreLibro { get; set; } = null!;

    public string AutorLibro { get; set; } = null!;

    public DateTime FechaPublicacion { get; set; }

    public int Edicion { get; set; }

    public int IdEditorial { get; set; }

    public int IdEstado { get; set; }

    public string? Descripcion { get; set; }

    public virtual TblEditorial? IdEditorialNavigation { get; set; } = null;

    public virtual TblEstado? IdEstadoNavigation { get; set; } = null;

    public virtual ICollection<TblPrestamo> TblPrestamos { get; set; } = new List<TblPrestamo>();
}
