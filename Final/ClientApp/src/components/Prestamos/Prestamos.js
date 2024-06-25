import React, { useState, useEffect } from 'react'
import './Prestamos.css'
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
const Prestamos = () => {
    const [usuarios, setUsuarios] = new useState([]);
    const [usuariosOrig, setUsuariosOrig] = new useState([]);
    const [listLibros, setListLibros] = new useState([]);
    const [listPrestamos, setListPrestamos] = new useState([]);
    const [aux, setAux] = new useState([]);
    const [listLibrosOrig, setListLibrosOrig] = new useState([]);
    const [listPrestamosOrig, setListPrestamosOrig] = new useState([]);
    const [listEstado, setListEstado] = new useState([]);
    const navigate = useNavigate();

    const entrego = async (id) => {
        const response = await fetch("api/Prestamos/RegresoLibro/" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Se entrego correctamente'
            })
            fetchData();
        } else {
            const data = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
            })
        }
    }
    const recortdar = async (idUsuario,nombreLibro,fechaDevolucion) => {
        const usuario=usuarios.find(usu=> usu.idUsuario===idUsuario)
        console.log("api/Prestamos/Mensaje/" + usuario.celularUsuario+"/"+nombreLibro+"/"+fechaDevolucion);
        const response = await fetch("api/Prestamos/Mensaje/" + usuario.celularUsuario+"/"+nombreLibro+"/"+fechaDevolucion, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Se entrego correctamente'
            })
            fetchData();
        } else {
            const data = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
            })
        }
    }

    const buscar = (terminoBusqueda) => {
        setAux([]);
        if (!terminoBusqueda) {
            setUsuarios(usuariosOrig);
        } else {
            const filtroUsuario = usuariosOrig.filter(usu => usu.nombreUsuario.toLowerCase().includes(terminoBusqueda.toLowerCase()));
            if (filtroUsuario.length === 0) {
                const filtroLibros = listLibros.filter(libro => libro.nombreLibro.toLowerCase().includes(terminoBusqueda.toLowerCase()));
                const nuevosUsuarios = new Set(); // Usar un conjunto para evitar duplicados
                setUsuarios([]);
                filtroLibros.forEach(libro => {
                    const idPrestamo = listPrestamos.find(pr => pr.idLibro === libro.idLibro);

                    if (idPrestamo) {
                        const usuarioEncontrado = usuariosOrig.find(usu => usu.idUsuario === idPrestamo.idUsuario);

                        if (usuarioEncontrado) {
                            setUsuarios(prevUsuarios => {
                                // Verificar si el usuario ya está en el estado antes de agregarlo
                                if (!prevUsuarios.some(usuario => usuario.idUsuario === usuarioEncontrado.idUsuario)) {
                                    return [...prevUsuarios, usuarioEncontrado];
                                }
                                return prevUsuarios;
                            });
                        }
                    }
                });

            } else {
                setUsuarios(filtroUsuario);
            }
        }
    };


    const fetchData = async () => {
        try {
            const Listar = await fetch("api/Usuario/ListarUsuario");
            const ListarLibros = await fetch("api/Prestamos/ListarLibros");
            const ListarPrestamo = await fetch("api/Prestamos/ListarPrestamo");
            const ListarEstados = await fetch("api/Prestamos/ListarEstados");
            if (Listar.status === 200) {
                const Lista = await Listar.json();
                const Lista2 = await ListarLibros.json();
                const Lista3 = await ListarPrestamo.json();
                const Lista4 = await ListarEstados.json();

                setUsuarios(Lista);
                setUsuariosOrig(Lista);
                setListLibros(Lista2);
                setListLibrosOrig(Lista2);
                setListPrestamos(Lista3);
                setListPrestamosOrig(Lista3);
                setListEstado(Lista4);

            } else {
                // Manejar errores de respuesta, por ejemplo:
                console.error('Error al obtener datos');
            }
        } catch (error) {
            // Manejar errores de red o de la función asíncrona
            console.error('Error en la función asíncrona', error);
        }
    };

    useEffect(() => {
        fetchData();
        const sesionIniciada = localStorage.getItem('SesionIniciada');
        if (sesionIniciada == null) {

            navigate('/');
        }
    }, []);
    return (
        <div className='container mt-5 container-custom2 vh-100' >



            <div className='cont-Buscador'><div className="text-center">
                <h1>Prestamos</h1>
            </div>
                <br />
                <input class="form-control" style={{ 'height': '41px' }} list="datalistOptions" id="exampleDataList" onChange={(e) => { buscar(e.target.value) }} placeholder="Escribe para filtrar" />
                <datalist id="datalistOptions">
                    {
                        usuariosOrig.map((item) => (
                            <option value={item.nombreUsuario}></option>
                        ))
                    }
                </datalist>
            </div>
            <br />
            <div class="accordion" id="accordionExample">
                {
                    usuarios.map((item) => {
                        const prestamos = listPrestamos ? listPrestamos.filter(pres => pres.idUsuario === item.idUsuario) : null;

                        var id = `collapse${item.idUsuario}`;
                        if (prestamos && prestamos.length != 0) {
                            return (
                                <div class="accordion-item" key={item.idUsuario}>
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded="false" aria-controls={id}>
                                            {item.nombreUsuario}
                                        </button>
                                    </h2>
                                    <div id={id} class="accordion-collapse collapse" style={{ 'padding': '1%', 'background-color': '#f8f8f8' }} data-bs-parent="#accordionExample">
                                        <div class="accordion" id={`accordionExample${item.idUsuario}`}>
                                            {
                                                prestamos.map((item2, index) => {
                                                    const libro = listLibros.find(libroItem => libroItem.idLibro === item2.idLibro);
                                                    const internalId = `collapseInternal${item.idUsuario}-${index}`;
                                                    const estado = listEstado.find(est => est.idEstado === item2.idEstado)
                                                    const fechaObj = new Date(item2.fechaPrestamo);
                                                    const fechaPrestamo = format(fechaObj, 'dd/MM/yyyy');
                                                    const fechaObj2 = new Date(item2.fechaDevolucion);
                                                    const fechaDevolucion = format(fechaObj2, 'dd/MM/yyyy');
                                                    const fechaDevolucion2 = format(fechaObj2, 'dd-MM-yyyy');
                                                    return (
                                                        <div class="accordion-item" key={internalId}>
                                                            <h2 class="accordion-header">
                                                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${internalId}`} aria-expanded="true" aria-controls={internalId}>
                                                                    {libro.nombreLibro}
                                                                </button>
                                                            </h2>
                                                            <div id={internalId} class="accordion-collapse collapse" data-bs-parent={`#accordionExample${item.idUsuario}`}>
                                                                <ul class="list-group">
                                                                    <li class="list-group-item"><h4>Estado: </h4>   {estado.estado}
                                                                        {estado.idEstado == 1 ? (<><button className='btn btn-success' onClick={() => { entrego(item2.idPrestamo) }}>Entrego</button> </>) : (<></>)}</li>
                                                                    <li class="list-group-item" > <h4>Fecha Prestamo: </h4>{fechaPrestamo} </li>
                                                                    <li class="list-group-item"><h4>Fecha Devolucion: </h4>{fechaDevolucion} </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })
                }
            </div>

        </div >
    )
}


export default Prestamos;