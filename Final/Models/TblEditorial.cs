using System;
using System.Collections.Generic;

namespace Final.Models;

public partial class TblEditorial
{
    public int IdEditorial { get; set; }

    public string Editorial { get; set; } = null!;

    public string? Direccion { get; set; }

    public string? CorreoElectronico { get; set; }

    public string? NumeroTelefono { get; set; }

    public virtual ICollection<TblLibro> TblLibros { get; set; } = new List<TblLibro>();
}
