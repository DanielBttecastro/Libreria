using System;
using System.Collections.Generic;

namespace Final.Models;

public partial class TblEstadoPrestamo
{
    public int IdEstado { get; set; }

    public string Estado { get; set; } = null!;

    public virtual ICollection<TblPrestamo> TblPrestamos { get; set; } = new List<TblPrestamo>();
}
