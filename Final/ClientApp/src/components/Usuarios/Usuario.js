import React, { useState, useEffect } from 'react'
import "./Usuario.css"
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Usuario = () => {
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [celular, setCelular] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState('-1');
    const [listUsuario, setLisUsuario] = useState([]);
    const [listRol, setLisRol] = useState([]);
    const [ismod, setIsmod] = useState(false);
    const [idMod, setIdMod] = useState();
    const navigate = useNavigate();

    const GuardarUsuario = async () => {
        if (!cedula || !nombre || !correo || !celular || !contrasena || rol=="-1") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return;
        }
        const ultimoRol = listUsuario[listUsuario.length - 1];
        const Usuario = {
            IdUsuario: ultimoRol.idUsuario + 1,
            CedulaUsuario: cedula,
            NombreUsuario: nombre,
            CorreoUsuario: correo,
            CelularUsuario: celular,
            Contraseña: contrasena,
            IdRol: rol
        };
        console.log(Usuario);
        const response = await fetch("api/Usuario/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Usuario)
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Agregado correctamente'
            })
            setCedula('');
            setNombre('');
            setCorreo('');
            setCelular('');
            setContrasena('');
            setRol('-1');
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


    const EliminaUsuario = async (id) => {
        const response = await fetch("api/Usuario/Eliminar/" + id, {
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

    const LlamarModificarUsuario = (id) => {
        const usuariomod = listUsuario.find(usu => usu.idUsuario === id);
        console.log(usuariomod.cedulaUsuario);
        setIdMod(id);
        setCedula(usuariomod.cedulaUsuario);
        setNombre(usuariomod.nombreUsuario);
        setCorreo(usuariomod.correoUsuario);
        setCelular(usuariomod.celularUsuario);
        setContrasena(usuariomod.contraseña);
        setRol(usuariomod.idRol);
        setIsmod(true);
    }

    const ModificarUsuario = async () => {
        if (!cedula || !nombre || !correo || !celular || !contrasena || !rol) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
            return;
        }
        const Usuario = {
            IdUsuario: idMod,
            CedulaUsuario: cedula,
            NombreUsuario: nombre,
            CorreoUsuario: correo,
            CelularUsuario: celular,
            Contraseña: contrasena,
            IdRol: rol
        };
        const response = await fetch("api/Usuario/Modificar/" + idMod, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Usuario)
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Modificado correctamente'
            })
            setCedula('');
            setNombre('');
            setCorreo('');
            setCelular('');
            setContrasena('');
            setRol('-1');
            fetchData();
            setIsmod(false);
        } else { 
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
        setCedula('');
        setNombre('');
        setCorreo('');
        setCelular('');
        setContrasena('');
        setRol('-1');
        fetchData();
    }

    const fetchData = async () => {
        try {
            const ListarUsuario = await fetch("api/Usuario/ListarUsuario");
            const ListarRol = await fetch("api/Usuario/ListarRol");

            if (ListarUsuario.status === 200 && ListarRol.status === 200) {
                const usuarios = await ListarUsuario.json();
                const roles = await ListarRol.json();

                setLisUsuario(usuarios);
                setLisRol(roles);
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
                    <h1 className="title-custom">Usuarios</h1>
                </div>
                <div className="row row-custom">
                    <div className="col-md-6 col-left-custom">
                        <div style={{ 'height': '0' }} >
                            <div className="form-group form-group-custom">
                                <label for="cedula">Cedula:</label>
                                <input type="text" className="form-control" value={cedula} onChange={(e) => { setCedula(e.target.value) }} id="cedula" />
                            </div>

                            <div className="form-group form-group-custom">
                                <label for="nombre">Nombre:</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => { setNombre(e.target.value) }} id="nombre" />
                            </div>

                            <div className="form-group form-group-custom">
                                <label for="correo">Correo:</label>
                                <input type="email" className="form-control" value={correo} onChange={(e) => { setCorreo(e.target.value) }} id="correo" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-right-custom">
                        <div>
                            <div className="form-group form-group-custom">
                                <label for="celular">Celular:</label>
                                <input type="number" className="form-control" value={celular} onChange={(e) => { setCelular(e.target.value) }} id="celular" />
                            </div>

                            <div className="form-group form-group-custom">
                                <label for="contrasena">Contraseña:</label>
                                <input type="password" className="form-control" value={contrasena} onChange={(e) => { setContrasena(e.target.value) }} id="contrasena" />
                            </div>

                            <div className="form-group form-group-custom">
                                <label for="rol">Rol:</label>
                                <select className="form-control" value={rol} onChange={(e) => { setRol(e.target.value) }} id="rol">
                                    <option disabled selected value="-1">Seleciona un rol</option>
                                    {
                                        listRol.map((item) => (
                                            <option value={item.idRol}>{item.rol}</option>
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
                                    <input type='button' style={{ 'position': 'relative', 'left': '450%', 'width': '190%' }} onClick={GuardarUsuario} className=" btn btn-success btn-custom-Usu" value="Registrar" />
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
                                <th>Cedula</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Celular</th>
                                <th>Contraseña</th>
                                <th>Rol</th>
                                <th>Administración</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                listUsuario.map((item) => {
                                    const asdf = listRol.find(rol => rol.idRol === item.idRol);
                                    return (
                                        <>
                                            <tr key={item.idUsuario}>
                                                <td>{item.cedulaUsuario}</td>
                                                <td>{item.nombreUsuario}</td>
                                                <td>{item.correoUsuario}</td>
                                                <td>{item.celularUsuario}</td>
                                                <td>{item.contraseña}</td>
                                                <td>{asdf ? asdf.rol : 'N/A'}</td>
                                                <td data-label="administracion"> <button class="btn btn-warning" onClick={() => { LlamarModificarUsuario(item.idUsuario) }} ><span>Modificar</span></button> <button class="btn btn-danger" onClick={(e) => {
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
                                                            EliminaUsuario(item.idUsuario);
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


export default Usuario;

