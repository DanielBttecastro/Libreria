using System;
using System.Collections.Generic;

namespace Final.Models;

public partial class TblUsuario
{
    public int IdUsuario { get; set; }

    public int CedulaUsuario { get; set; }

    public string NombreUsuario { get; set; } = null!;

    public string CorreoUsuario { get; set; } = null!;

    public string Contraseña { get; set; } = null!;

    public int IdRol { get; set; }

    public long? CelularUsuario { get; set; }

    public virtual TblRol? IdRolNavigation { get; set; } = null;

    public virtual ICollection<TblPrestamo> TblPrestamos { get; set; } = new List<TblPrestamo>();
}
