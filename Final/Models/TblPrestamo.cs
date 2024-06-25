using System;
using System.Collections.Generic;

namespace Final.Models;

public partial class TblPrestamo
{
    public int IdPrestamo { get; set; }

    public DateTime FechaPrestamo { get; set; }

    public DateTime FechaDevolucion { get; set; }

    public int IdLibro { get; set; }

    public int IdUsuario { get; set; }

    public int? IdEstado { get; set; }

    public virtual TblEstadoPrestamo? IdEstadoNavigation { get; set; }

    public virtual TblLibro? IdLibroNavigation { get; set; } = null;

    public virtual TblUsuario? IdUsuarioNavigation { get; set; } = null;
}
