import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Login from "./components/Login/Login"
import Usuario from "./components/Usuarios/Usuario"
import Libros from "./components/Libros/Libros"
import Editoriales from "./components/Editoriales/Editoriales"
import Prestamos from "./components/Prestamos/Prestamos"
import {BuscarLibros} from "./components/BuscarLibros/BuscarLibros"
import Historial from "./components/Historial/Historial"


const AppRoutes = [
  {
    index: true,
    element: <Login/>
  },
  {
    path: '/Usuario',
    element: <Usuario />
  },
  {
    path: '/Libros',
    element: <Libros />
  },
  {
    path: '/Editoriales',
    element: <Editoriales />
  },
  {
    path: '/Prestamos',
    element: <Prestamos />
  },
  {
    path: '/BuscarLibros',
    element: <BuscarLibros />
  },
  {
    path: '/Historial',
    element: <Historial />
  }
];

export default AppRoutes;
