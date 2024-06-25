using Final.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EditorialesController : ControllerBase
    {

        private readonly DbFinalContext _dbContext;

        public EditorialesController(DbFinalContext contex)
        {
            _dbContext = contex;
        }

        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> Listar()
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
        public async Task<IActionResult> Guardar([FromBody] TblEditorial request)
        {
            try
            {
                await _dbContext.TblEditorials.AddAsync(request);
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
                TblEditorial registrosAEliminar = await _dbContext.TblEditorials.FindAsync(id);

                _dbContext.TblEditorials.Remove(registrosAEliminar);
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
        public async Task<IActionResult> Modificar(int id, [FromBody] TblEditorial request)
        {
            try
            {
                TblEditorial Existente = await _dbContext.TblEditorials.FindAsync(id);
                if (Existente == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

                Existente.IdEditorial = request.IdEditorial;
                Existente.Editorial = request.Editorial;
                Existente.Direccion = request.Direccion;
                Existente.CorreoElectronico = request.CorreoElectronico;
                Existente.NumeroTelefono = request.NumeroTelefono; 
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
