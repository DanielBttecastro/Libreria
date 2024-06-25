import React, { useState, useEffect } from 'react'
import "./Libros.css"
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Libros = () => {
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [autor, setAutor] = useState('');
    const [publicacion, setPublicacion] = useState('');
    const [edicion, setEdicion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [editorial, setEditorial] = useState('-1');
    const [listLibros, setLisLibros] = useState([]);
    const [listEditorial, setLisEditorial] = useState([]);
    const [ismod, setIsmod] = useState(false);
    const [idMod, setIdMod] = useState();
    const [esModificable, setEsModificable] = useState(true);
    const navigate = useNavigate();

    const GuardarLibro = async () => {
        if (!codigo || !nombre || !autor || !publicacion || !edicion || editorial=="-1" || !descripcion) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return;
        }
        const Libro = {
            IdLibro: codigo,
            NombreLibro: nombre,
            AutorLibro: autor,
            FechaPublicacion: publicacion,
            Edicion: edicion,
            IdEditorial: editorial,
            Descripcion:descripcion,
            IdEstado: 1
        };
        console.log(Libro);
        const response = await fetch("api/Libros/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Libro)
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Agregado correctamente'
            })
            setCodigo('');
            setNombre('');
            setAutor('');
            setPublicacion('');
            setEdicion('');
            setEditorial('-1');
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


    const Elimina = async (id) => {
        const response = await fetch("api/Libros/Eliminar/" + id, {
            method: "DELETE"
        });
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Eliminado correctamente'
            })
            fetchData();

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al eliminar'
            })
        }
    }

    const LlamarModificar = (id) => {
        const Mod = listLibros.find(item => item.idLibro === id);
        const fechaObj = new Date(Mod.fechaPublicacion); 
        const fechaFormateada = format(fechaObj, 'yyyy-MM-dd');
        setIdMod(id);
        setCodigo(Mod.idLibro);
        setNombre(Mod.nombreLibro);
        setAutor(Mod.autorLibro);
        setPublicacion(fechaFormateada);
        setEdicion(Mod.edicion);
        setEditorial(Mod.idEditorial);
        setIsmod(true);
        setEsModificable(false);
    }

    const ModificarUsuario = async () => {
        if (!codigo || !nombre || !autor || !publicacion || !edicion || !editorial) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return;
        }
        const Libro = {
            IdLibro: codigo,
            NombreLibro: nombre,
            AutorLibro: autor,
            FechaPublicacion: publicacion,
            Edicion: edicion,
            IdEditorial: editorial,
            IdEstado: 1
        };
        const response = await fetch("api/Libros/Modificar/" + idMod, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Libro)
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Modificado correctamente'
            })
            setCodigo('');
            setNombre('');
            setAutor('');
            setPublicacion('');
            setEdicion('');
            setEditorial('-1');
            fetchData();
            setIsmod(false);
            setEsModificable(true);
        } else {
            alert();
            const data = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
            })
        }

    }
    const CancelarModificar = () => {
        setIsmod(false);
        setCodigo('');
        setNombre('');
        setAutor('');
        setPublicacion('');
        setEdicion('');
        setEditorial('-1');
        setDescripcion('');
        fetchData();
        setEsModificable(true);
    }

    const fetchData = async () => {
        try {
            const ListarLibros = await fetch("api/Libros/ListarLibros");
            const ListarEditorial = await fetch("api/Libros/ListarEditorial");

            if (ListarLibros.status === 200 && ListarEditorial.status === 200) {
                const Libros = await ListarLibros.json();
                const Editorial = await ListarEditorial.json();

                setLisLibros(Libros);
                setLisEditorial(Editorial);
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
        <>
            <div className="container mt-5 container-custom3">
                <div>
                    <h1 className="title-custom">Libros</h1>
                </div>
                <div className="row row-custom">
                    <div className="col-md-6 col-left-custom">
                        <div style={{ 'height': '0' }} >
                            <div className="form-group form-group-custom">
                                <label for="codigo">Codigo:</label>
                                <input type="number" disabled={!esModificable} className="form-control" value={codigo} onChange={(e) => { setCodigo(e.target.value) }} id="codigo" />
                            </div>

                            <div className="form-group form-group-custom">
                                <label for="nombre">Nombre:</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => { setNombre(e.target.value) }} id="nombre" />
                            </div>

                            <div className="form-group form-group-custom">
                                <label for="autor">Autor:</label>
                                <input type="text" className="form-control" value={autor} onChange={(e) => { setAutor(e.target.value) }} id="autor" />
                            </div>
                            <div className="form-group form-group-custom">
                                <label for="desc">Descripción:</label>
                                <textarea class="form-control" id="exampleTextarea" value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }} rows="5"></textarea>
       
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-right-custom">
                        <div>
                            <div className="form-group form-group-custom">
                                <label for="publicacion">Publicación:</label>
                                <input type="date" className="form-control" value={publicacion} onChange={(e) => { setPublicacion(e.target.value) }} id="publicacion" />
                            </div>

                            <div className="form-group form-group-custom">
                                <label for="edicion">Edicion:</label>
                                <input type="text" className="form-control" value={edicion} onChange={(e) => { setEdicion(e.target.value) }} id="edicion" />
                            </div>

                            <div className="form-group form-group-custom">
                                <label for="editorial">Editorial:</label>
                                <select className="form-control" value={editorial} onChange={(e) => { setEditorial(e.target.value) }} id="editorial">
                                    <option disabled selected value="-1">Seleciona un editorial</option>
                                    {
                                        listEditorial.map((item) => (
                                            <option value={item.idEditorial}>{item.editorial}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='cont-button-custom'>
                            {ismod ?
                                (<div style={{ 'position': 'relative', 'left': '107%', 'display': 'flex' }}>
                                    <input type='button' style={{ 'width': '200px' }} onClick={ModificarUsuario} className="btn btn-warning btn-custom-Usu" value="Modificar" />
                                    <input type='button' style={{ 'width': '200px' }} onClick={CancelarModificar} className="btn btn-danger btn-custom-Usu" value="Cancelar" />
                                </div>
                                )
                                :
                                (
                                    <input type='button' style={{ 'position': 'relative', 'left': '450%', 'width': '190%' }} onClick={GuardarLibro} className=" btn btn-success btn-custom-Usu" value="Registrar" />
                                )}
                        </div>
                    </div>
                </div>
            </div>

            <div class="cont-table-custom2">
                <div class="col">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Autor</th>
                                <th>Publicacion</th>
                                <th>Edicion</th>
                                <th>Editorial</th>
                                <th>Descripción</th>
                                <th>Administración</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                listLibros.map((item) => {
                                    const asdf = listEditorial.find(editorial => editorial.idEditorial === item.idEditorial);
                                    const fechaObj = new Date(item.fechaPublicacion);

                                    // Formatea la fecha al formato yyyy-MM-dd
                                    const fechaFormateada = format(fechaObj, 'dd/MM/yyyy');
                                    return (
                                        <>
                                            <tr key={item.idLibro}>
                                                <td>{item.idLibro}</td>
                                                <td>{item.nombreLibro}</td>
                                                <td>{item.autorLibro}</td>
                                                <td>{fechaFormateada}</td>
                                                <td>{item.edicion}</td>
                                                <td>{asdf ? asdf.editorial : 'N/A'}</td>
                                                <td>{item.descripcion}</td>
                                                <td data-label="administracion"> <button class="btn btn-warning" onClick={() => { LlamarModificar(item.idLibro) }} ><span>Modificar</span></button> <button class="btn btn-danger" onClick={(e) => {
                                                    Swal.fire({
                                                        title: '¿Estás seguro?',
                                                        text: 'Esta acción no se puede deshacer',
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Sí, eliminar',
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            Elimina(item.idLibro);
                                                        }
                                                    });
                                                }}><span>Eliminar</span></button></td>
                                            </tr>
                                        </>
                                    );
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}


export default Libros;

