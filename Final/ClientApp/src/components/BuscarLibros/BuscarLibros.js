import React, { useEffect, useState } from 'react';
import "./BuscarLibros.css"
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
    const [ampliar, setAmpliar] = useState([]);
    const [editorial, setEditorial] = useState([]);
    const [estado, setEstado] = useState([]);
    const [prestamo, setPrestamo] = useState([]);
    const [fechaPrestamo, setfechaPrestamo] = useState('');
    const [fechaDevolucion, setfechaDevolucion] = useState('');
    const [fechaPublicacion, setfechaPublicacion] = useState('');
    const [fechaActual, setFechaActual] = useState('');
    const [fechaPaDevolver, setfechaPaDevolver] = useState('');
    const [usuario, SetUsuario] = useState([]);
    const navigate = useNavigate();

    const [modalTratamientoMod, setModalTratamientoMod] = useState(false);

    const tratamientMod = () => setModalTratamientoMod(!modalTratamientoMod);

    const [modalPrestamo, setModalPrestamo] = useState(false);

    const Prestamos = () => setModalPrestamo(!modalPrestamo);

    const llamartratamientosMod = async (item) => {
        console.log(item);
        setAmpliar(item);
        const fechaObj = new Date(ampliar.fechaPublicacion);
        setfechaPublicacion(format(fechaObj, 'dd/MM/yyyy'));
        setEditorial(listEditorial.find(ed => ed.idEditorial === ampliar.idEditorial))
        const st = listEstados.find(est => est.idEstado === item.idEstado)
        setEstado(st);
        const prestamoMasReciente = listPrestamos
            .filter(pr => pr.idLibro === ampliar.idLibro)
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
        console.log(prestamoMasReciente);
        const fechaObj2 = new Date(prestamoMasReciente.fechaPrestamo);
        setfechaPrestamo(format(fechaObj2, 'dd/MM/yyyy'));
        const fechaObj3 = new Date(prestamoMasReciente.fechaPrestamo);
        setfechaDevolucion(format(fechaObj3, 'dd/MM/yyyy'));
        console.log(st);
        tratamientMod();
    }
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1; // Los meses van de 0 a 11
        const anio = fecha.getFullYear();

        // Formatear la fecha como YYYY-MM-DD
        const fechaFormateada = `${anio}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
        return fechaFormateada;
    };
    const PrestarLibro = async () => {
        const ultimoRol = listPrestamos[listPrestamos.length - 1];

        const Prestamo = {
            IdPrestamo: ultimoRol.idPrestamo + 1,
            FechaPrestamo: fechaActual,
            FechaDevolucion: fechaPaDevolver,
            IdLibro: ampliar.idLibro,
            IdUsuario: usuario.idUsuario,
            IdEstado: 1
        };
        const response = await fetch("api/Prestamos/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Prestamo)
        });
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Se genero el prestamo correctamente',
                text: 'Dirijete a recepcion para reclamar el libro.'
            })
            Prestamos();
            tratamientMod();
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
    const fetchData = async () => {
        try {
            const ListarLibros = await fetch("api/Prestamos/ListarLibros");
            const ListarEditorial = await fetch("api/Libros/ListarEditorial");
            const ListarEstados = await fetch("api/Libros/ListarEstadoLibro");
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
            <div>

                <div className='sup-custom'>
                    {
                        listLibros.map(item => {
                            const stado = listEstados.find(est => est.idEstado == item.idEstado);
                            return (
                                <div
                                    key={item.id} // Asegúrate de agregar una clave única a cada elemento en el mapeo
                                    className={`item-custom-True d-flex flex-column align-items-center justify-content-center text-center ${item.idEstado === 1 ? 'item-custom-True' : 'item-custom-false'}`}
                                    onClick={() => { llamartratamientosMod(item) }} // Maneja el evento de clic
                                >
                                    <h2>{item.nombreLibro}</h2>
                                    <h4>Estado: {stado.estado}</h4>
                                </div>
                            )
                        })
                    }
                    <Modal isOpen={modalTratamientoMod} toggle={tratamientMod} {...args}>
                        <ModalHeader toggle={tratamientMod}>{ampliar.nombreLibro}</ModalHeader>
                        <ModalBody>
                            {
                                ampliar.idEstado == 1 ? (

                                    <>
                                        <p><strong>Autor</strong>: {ampliar.autorLibro}</p>
                                        <p><strong>Fecha publicación</strong>: {fechaPublicacion}</p>
                                        <p><strong>Edicion</strong>: {ampliar.edicion}</p>
                                        <p><strong>Editorial</strong>: {editorial.editorial}</p>
                                        <p><strong>Edicion</strong>: {ampliar.edicion}</p>
                                        <p><strong>Estado</strong>: {estado.estado}</p>
                                        <p><strong>Descripción</strong>:<br /> {ampliar.descripcion}</p>

                                    </>
                                ) : (<>
                                    <p><strong>Autor</strong>: {ampliar.autorLibro}</p>
                                    <p><strong>Fecha publicación</strong>: {fechaPublicacion}</p>
                                    <p><strong>Edicion</strong>: {ampliar.edicion}</p>
                                    <p><strong>Editorial</strong>: {editorial.editorial}</p>
                                    <p><strong>Edicion</strong>: {ampliar.edicion}</p>
                                    <p><strong>Estado</strong>: {estado.estado}</p>
                                    <p><strong>Fecha prestamo</strong>: {fechaPrestamo}</p>
                                    <p><strong>Fecha devolucion</strong>: {fechaDevolucion}</p>
                                    <p><strong>Descripción</strong>:<br /> {ampliar.descripcion}</p>
                                </>)
                            }
                        </ModalBody>
                        <ModalFooter>

                            {
                                ampliar.idEstado == 1 ? (

                                    <>
                                        <Button color="primary" onClick={Prestamos}>
                                            Prestar
                                        </Button>

                                    </>
                                ) : (<>
                                </>)
                            }
                            <Button color="success" onClick={tratamientMod}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={modalPrestamo} toggle={Prestamos} {...args}>
                        <ModalHeader toggle={Prestamos}>{ampliar.nombreLibro}</ModalHeader>
                        <ModalBody>
                            <p><strong>Fecha Prestamo</strong>:   <input
                                type="date"
                                className="form-control"
                                value={fechaActual}
                                readOnly
                                id="Prestamo"
                            />
                            </p>
                            <p><strong>Fecha Devolucion</strong>:<br />    <input type="date" className="form-control" min={obtenerFechaActual()} onChange={(e) => { setfechaPaDevolver(e.target.value) }} id="devolucion" />
                            </p>
                        </ModalBody>
                        <ModalFooter>


                            <Button color="primary" onClick={PrestarLibro}>
                                Prestar
                            </Button>

                            <Button color="success" onClick={Prestamos}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div >
        </>
    );
};

export default BuscarLibros;


