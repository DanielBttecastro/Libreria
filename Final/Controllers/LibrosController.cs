using Final.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibrosController : ControllerBase
    {
        private readonly DbFinalContext _dbContext;

        public LibrosController(DbFinalContext contex)
        {
            _dbContext = contex;
        }
       
        [HttpGet]
        [Route("ListarLibros")]
        public async Task<IActionResult> ListarLibros()
        {
            try
            {
                List<TblLibro> Lista = await _dbContext.TblLibros.ToListAsync();

                if (Lista == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, Lista);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("ListarEstadoLibro")]
        public async Task<IActionResult> ListarEstadoLibro()
        {
            try
            {
                List<TblEstado> Lista = await _dbContext.TblEstados.ToListAsync();

                if (Lista == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, Lista);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("ListarEditorial")]
        public async Task<IActionResult> ListarEditorial()
        {
            try
            {
                List<TblEditorial> Lista = await _dbContext.TblEditorials.ToListAsync();

                if (Lista == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, new { message = "Error en el select" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, Lista);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] TblLibro request)
        {
            try
            {
                await _dbContext.TblLibros.AddAsync(request);
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

                var registros = await _dbContext.TblPrestamos.Where(pr => pr.IdLibro == id).ToListAsync();
                _dbContext.TblPrestamos.RemoveRange(registros);
                await _dbContext.SaveChangesAsync();

                TblLibro registrosAEliminar = await _dbContext.TblLibros.FindAsync(id);

                _dbContext.TblLibros.Remove(registrosAEliminar);
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
        public async Task<IActionResult> Modificar(int id, [FromBody] TblLibro request)
        {
            try
            {
                TblLibro Existente = await _dbContext.TblLibros.FindAsync(id);
                if (Existente == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

                Existente.IdLibro = request.IdLibro;
                Existente.NombreLibro = request.NombreLibro;
                Existente.AutorLibro = request.AutorLibro;
                Existente.FechaPublicacion = request.FechaPublicacion;
                Existente.Edicion = request.Edicion;
                Existente.IdEditorial = request.IdEditorial;
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
