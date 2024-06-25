import React, { useEffect, useState } from 'react';
import "./Login.css"
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    localStorage.clear();
    // Estados para almacenar el nombre de usuario y la contraseña
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();

    const Iniciar_sesion = async () => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (correo.trim() === '' || contrasena.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos deben estar llenos'
            })
        } else {
            if (!emailRegex.test(correo)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El correo no tiene la estructura correcta.'
                })
            } else {
                const response = await fetch("api/Usuario/Login/" + correo + "/" + contrasena, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                if (response.status === 200) {
                    localStorage.setItem('SesionIniciada', JSON.stringify(data));
                    console.log(data); 
                    if (data.rol == 1) {
                        navigate('/Usuario');

                    } else if (data.rol == 2) {
                        navigate('/BuscarLibros')
                    }
                } else if (response.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message
                    })
                }
            }
        }

    }

    return (
        <div className="d-flex align-items-center justify-content-center   login">
            <div className='login-form text-center p-4'>
                <h1>Inicio de sesión</h1><br />
                <div className="mb-4 row">
                    <label htmlFor="correo" className="  col-form-label label-custom">Correo:</label>
                    <div className="">
                        <input type="text" className='form-control input-custom' onChange={(e) => { setCorreo(e.target.value) }} id="correo" />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="contrasena" className="  col-form-label label-custom">Contraseña:</label>
                    <div className=" ">
                        <input type="password" className='form-control input-custom' onChange={(e) => { setContrasena(e.target.value) }} id="contrasena" />
                    </div>
                </div>

                <button type="button" className="btn btn-custom form-control" onClick={Iniciar_sesion}>Iniciar sesión</button>
                <br />
                <a>¿Has olvidado contraseña?</a>
            </div>
        </div>
    );
};

export default Login;


