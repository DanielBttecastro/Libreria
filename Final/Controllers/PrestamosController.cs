using Final.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrestamosController : ControllerBase
    {
        private readonly DbFinalContext _dbContext;
        public PrestamosController(DbFinalContext contex)
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
        [Route("ListarPrestamo")]
        public async Task<IActionResult> ListarPrestamo()
        {
            try
            {
                List<TblPrestamo> Lista = await _dbContext.TblPrestamos.ToListAsync();

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
        [Route("ListarEstados")]
        public async Task<IActionResult> ListarEstados()
        {
            try
            {
                List<TblEstadoPrestamo> Lista = await _dbContext.TblEstadoPrestamos.ToListAsync();

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
        [Route("RegresoLibro/{id}")]
        public async Task<IActionResult> RegresoLibro(int id)
        {
            try
            {
                TblPrestamo item = await _dbContext.TblPrestamos.FindAsync(id);
                if (item == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
                else
                {
                    item.IdEstado = 2;

                    await _dbContext.SaveChangesAsync();
                    return StatusCode(StatusCodes.Status200OK, "ok");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] TblPrestamo request)
        {
            try
            {
                await _dbContext.TblPrestamos.AddAsync(request);
                await _dbContext.SaveChangesAsync();
                TblLibro tblLib = _dbContext.TblLibros.Find(request.IdLibro);
                tblLib.IdEstado = 2;
                await _dbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        

    }
}
