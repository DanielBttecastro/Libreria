import React, { useState, useEffect } from 'react'
import "./Editoriales.css"
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Editoriales = () => {
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [editorial, setEditorial] = useState('');
    const [lista, setLista] = useState([]);
    const [ismod, setIsmod] = useState(false);
    const [idMod, setIdMod] = useState();
    const [esModificable, setEsModificable] = useState(true);
    const navigate = useNavigate();

    const Guardar = async () => {
        if (!codigo || !nombre || !direccion || !correo || !telefono) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return;
        }
        const item = {
            IdEditorial: codigo,
            Editorial: nombre,
            Direccion: direccion,
            CorreoElectronico: correo,
            NumeroTelefono: telefono,
        };
        const response = await fetch("api/Editoriales/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Agregado correctamente'
            })
            setCodigo('');
            setNombre('');
            setDireccion('');
            setCorreo('');
            setTelefono('');
            setEditorial('-1');
            fetchData();
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


    const Elimina = async (id) => {
        const response = await fetch("api/Editoriales/Eliminar/" + id, {
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
        const Mod = lista.find(item => item.idEditorial === id);
        setIdMod(id);
        setCodigo(id);
        setNombre(Mod.editorial);
        setDireccion(Mod.direccion);
        setCorreo(Mod.correoElectronico);
        setTelefono(Mod.numeroTelefono);
        setIsmod(true);
        setEsModificable(false);
    }

    const Modificar = async () => {
        if (!codigo || !nombre || !direccion || !correo || !telefono) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return;
        }
        const item = {
            IdEditorial: codigo,
            Editorial: nombre,
            Direccion: direccion,
            CorreoElectronico: correo,
            NumeroTelefono: telefono,
        };
        const response = await fetch("api/Editoriales/Modificar/" + idMod, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Modificado correctamente'
            })
            setCodigo('');
            setNombre('');
            setDireccion('');
            setCorreo('');
            setTelefono('');
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
        setDireccion('');
        setCorreo('');
        setTelefono('');
        setEditorial('-1');
        fetchData();
        setEsModificable(true);
    }

    const fetchData = async () => {
        try {
            const Listar = await fetch("api/Editoriales/Listar");

            if (Listar.status === 200) {
                const Lista = await Listar.json();

                setLista(Lista);
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
            <div className="container mt-5 container-custom">
                <div>
                    <h1 className="title-custom">Editoriales</h1>
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
                                <label for="direccion">Dirección:</label>
                                <input type="text" className="form-control" value={direccion} onChange={(e) => { setDireccion(e.target.value) }} id="direccion" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-right-custom">
                        <div>
                            <div className="form-group form-group-custom">
                                <label for="correo">Correo electronico:</label>
                                <input type="text" className="form-control" value={correo} onChange={(e) => { setCorreo(e.target.value) }} id="correo" />
                            </div>

                            <div className="form-group form-group-custom">
                                <label for="telefono">Telefono:</label>
                                <input type="text" className="form-control" value={telefono} onChange={(e) => { setTelefono(e.target.value) }} id="telefono" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='cont-button-custom'>
                            {ismod ?
                                (<div style={{ 'position': 'relative', 'left': '107%', 'display': 'flex' }}>
                                    <input type='button' style={{ 'width': '200px' }} onClick={Modificar} className="btn btn-warning btn-custom-Usu" value="Modificar" />
                                    <input type='button' style={{ 'width': '200px' }} onClick={CancelarModificar} className="btn btn-danger btn-custom-Usu" value="Cancelar" />
                                </div>
                                )
                                :
                                (
                                    <input type='button' style={{ 'position': 'relative', 'left': '450%', 'width': '190%' }} onClick={Guardar} className=" btn btn-success btn-custom-Usu" value="Registrar" />
                                )}
                        </div>
                    </div>
                </div>
            </div>

            <div class="cont-table-custom">
                <div class="col">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>direccion</th>
                                <th>correo</th>
                                <th>telefono</th>
                                <th>Administración</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                lista.map((item) => {
                                    return (
                                        <>
                                            <tr key={item.idEditorial}>
                                                <td>{item.idEditorial}</td>
                                                <td>{item.editorial}</td>
                                                <td>{item.direccion}</td>
                                                <td>{item.correoElectronico}</td>
                                                <td>{item.numeroTelefono}</td>
                                                <td data-label="administracion"> <button class="btn btn-warning" onClick={() => { LlamarModificar(item.idEditorial) }} ><span>Modificar</span></button> <button class="btn btn-danger" onClick={(e) => {
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
                                                            Elimina(item.idEditorial);
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


export default Editoriales;

