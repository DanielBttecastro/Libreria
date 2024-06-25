using Final.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly DbFinalContext _dbContext;

        public UsuarioController(DbFinalContext contex)
        {
            _dbContext = contex;
        }
        [HttpGet]
        [Route("Login/{correo}/{pass}")]
        public async Task<IActionResult> Login(string correo, string pass)
        {
            try
            {
                TblUsuario Usu = await _dbContext.TblUsuarios.FirstOrDefaultAsync(Usuario => Usuario.CorreoUsuario == correo && Usuario.Contraseña == pass);
                if (Usu == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Correo o contraseña incorrectos" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, new { message = "OK", nombre = Usu.NombreUsuario, Rol = Usu.IdRol, Cedula=Usu.CedulaUsuario, idUsuario=Usu.IdUsuario });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("ListarUsuario")]
        public async Task<IActionResult> ListarUsuario()
        {
            try
            {
                List<TblUsuario> ListUsuarios = await _dbContext.TblUsuarios.ToListAsync();

                if (ListUsuarios == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, ListUsuarios);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("ListarRol")]
        public async Task<IActionResult> ListarRol()
        {
            try
            {
                List<TblRol> listRol = await _dbContext.TblRols.ToListAsync();

                if (listRol == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, listRol);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] TblUsuario request)
        {
            try
            {
                await _dbContext.TblUsuarios.AddAsync(request);
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            try
            {
                var registros = await _dbContext.TblPrestamos.Where(pr => pr.IdUsuario == id).ToListAsync();
                _dbContext.TblPrestamos.RemoveRange(registros);
                await _dbContext.SaveChangesAsync();
                TblUsuario registrosAEliminar = await _dbContext.TblUsuarios.FindAsync(id);

                _dbContext.TblUsuarios.Remove(registrosAEliminar);
                await _dbContext.SaveChangesAsync();
                 
                return StatusCode(StatusCodes.Status200OK, "OK");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }


        [HttpPut]
        [Route("Modificar/{id:int}")]
        public async Task<IActionResult> Modificar(int id, [FromBody] TblUsuario request)
        {
            try
            {
                TblUsuario Existente = await _dbContext.TblUsuarios.FindAsync(id);
                if (Existente == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

                Existente.CedulaUsuario = request.CedulaUsuario;
                Existente.NombreUsuario = request.NombreUsuario;
                Existente.CorreoUsuario = request.CorreoUsuario;
                Existente.CelularUsuario = request.CelularUsuario;
                Existente.Contraseña = request.Contraseña;
                Existente.IdRol = request.IdRol;
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


    }
}
