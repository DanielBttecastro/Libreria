import React, { useEffect, useState } from 'react';
import "./Historial.css"
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, ListInlineItem } from 'reactstrap';
import { format } from 'date-fns';

export function BuscarLibros(args) {
    const [showModal, setShowModal] = useState(false);

    const handleItemClick = () => {
        // Abre la ventana modal al hacer clic en el elemento
        setShowModal(true);
    };
    // Estados para almacenar el nombre de usuario y la contraseña
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [listLibros, setListLibros] = useState([]);
    const [listEditorial, setListEditorial] = useState([]);
    const [listEstados, setListEstados] = useState([]);
    const [listPrestamos, setListPrestamos] = useState([]);
    const [fechaActual, setFechaActual] = useState('');
    const [usuario, SetUsuario] = useState([]);
    const navigate = useNavigate();


    const fetchData = async () => {
        try {
            const ListarLibros = await fetch("api/Prestamos/ListarLibros");
            const ListarEditorial = await fetch("api/Libros/ListarEditorial");
            const ListarEstados = await fetch("api/Prestamos/ListarEstados");
            const ListarPrestamo = await fetch("api/Prestamos/ListarPrestamo");
            if (ListarLibros.status === 200 && ListarEditorial.status === 200 && ListarEstados.status === 200 && ListarPrestamo.status === 200) {
                const Lista = await ListarEditorial.json();
                const Lista1 = await ListarLibros.json();
                const Lista2 = await ListarEstados.json();
                const Lista3 = await ListarPrestamo.json();

                setListEditorial(Lista);
                setListLibros(Lista1);
                setListEstados(Lista2);
                setListPrestamos(Lista3);
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
        } else {
            const sesionIniciada = localStorage.getItem('SesionIniciada') || null;
            SetUsuario(JSON.parse(sesionIniciada));
        }
        const obtenerFechaActual = () => {
            const fecha = new Date();
            const fechaFormateada = fecha.toISOString().split('T')[0]; // Formatear la fecha como YYYY-MM-DD
            setFechaActual(fechaFormateada);
        };

        obtenerFechaActual();
    }, []);
    return (
        <>
            <div className='container mt-5 container-custom2 vh-100' >



               
                <div class="accordion" id="accordionExample">
                    {
                        listPrestamos.map((item) => {  
                            if (item.idUsuario === usuario.idUsuario) {
                                
                                const Libro = listLibros.find(lb => lb.idLibro === item.idLibro);
                                const stado = listEstados.find(es => es.idEstado === item.idEstado);
                                const fechaObj = new Date(item.fechaPrestamo);
                                const fechaPrestamo = format(fechaObj, 'dd/MM/yyyy');
                                const fechaObj2 = new Date(item.fechaDevolucion);
                                const fechaDevolucion = format(fechaObj2, 'dd/MM/yyyy');

                                var id = `collapse${item.idPrestamo}`;
                                if (listPrestamos && listPrestamos.length != 0) {
                                    return (
                                        <div class="accordion-item" key={item.idUsuario}>
                                            <h2 class="accordion-header">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded="false" aria-controls={id}>
                                                    {Libro.nombreLibro}
                                                </button>
                                            </h2>
                                            <div id={id} class="accordion-collapse collapse" style={{ 'padding': '1%', 'background-color': '#f8f8f8' }} data-bs-parent="#accordionExample">
                                                <div class="accordion" id={`accordionExample${item.idUsuario}`}>
                                                    <ul class="list-group">
                                                        <li class="list-group-item"><h4>Estado: </h4>   {stado.estado}</li>
                                                        <li class="list-group-item" > <h4>Fecha Prestamo: </h4>{fechaPrestamo} </li>
                                                        <li class="list-group-item"><h4>Fecha Devolucion: </h4>{fechaDevolucion} </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                            }

                        })
                    }
                </div>

            </div >
        </>
    );
};

export default BuscarLibros;


