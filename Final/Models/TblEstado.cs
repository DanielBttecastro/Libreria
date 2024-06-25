using System;
using System.Collections.Generic;

namespace Final.Models;

public partial class TblEstado
{
    public int IdEstado { get; set; }

    public string Estado { get; set; } = null!;

    public virtual ICollection<TblLibro> TblLibros { get; set; } = new List<TblLibro>();
}
