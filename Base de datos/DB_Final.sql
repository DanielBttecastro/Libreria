create database DB_Final

USE DB_Final

CREATE TABLE tbl_Rol(
id_rol INT PRIMARY KEY,
rol VARCHAR(20) NOT NULL
)

CREATE TABLE tbl_Usuario(
id_Usuario INT PRIMARY KEY,
cedula_usuario INT NOT NULL,
nombre_usuario VARCHAR(100) NOT NULL,
correo_usuario VARCHAR(100) NOT NULL,
celular_usuario INT NOT NULL,
contraseña VARCHAR(20) NOT NULL,
id_rol INT NOT NULL,
FOREIGN KEY (id_rol) REFERENCES tbl_Rol (id_rol)
)

CREATE TABLE tbl_Editorial(
	id_editorial INT PRIMARY KEY,
	editorial VARCHAR(50)NOT NULL,
	Direccion NVARCHAR(255),
    CorreoElectronico NVARCHAR(100),
    NumeroTelefono NVARCHAR(20)
)

select * from tbl_Editorial

ALTER TABLE tbl_Editorial
ADD Direccion NVARCHAR(255),
    CorreoElectronico NVARCHAR(100),
    NumeroTelefono NVARCHAR(20)

CREATE TABLE tbl_Estado(
id_estado INT PRIMARY KEY,
estado VARCHAR(50)NOT NULL
)

CREATE TABLE tbl_EstadoPrestamo(
id_estado INT PRIMARY KEY,
estado VARCHAR(50)NOT NULL
)

CREATE TABLE tbl_Libro(
id_libro INT PRIMARY KEY,
nombre_libro VARCHAR(100) NOT NULL,
autor_libro VARCHAR(50) NOT NULL,
fecha_publicacion DATE NOT NULL,
edicion INT NOT NULL,
id_editorial INT NOT NULL,
FOREIGN KEY (id_editorial) REFERENCES tbl_Editorial (id_editorial),
id_estado INT NOT NULL,
FOREIGN KEY (id_estado) REFERENCES tbl_Estado (id_estado)
)
 

CREATE TABLE tbl_Prestamo(
id_prestamo INT PRIMARY KEY NOT NULL,
fecha_prestamo DATE NOT NULL,
fecha_devolucion DATE NOT NULL,
id_libro INT NOT NULL,
id_Usuario INT NOT NULL,
FOREIGN KEY (id_libro) REFERENCES tbl_Libro (id_libro),
FOREIGN KEY (id_Usuario) REFERENCES tbl_Usuario (id_Usuario)
)

-- Agregar la columna estado a tbl_Prestamo
ALTER TABLE tbl_Prestamo
ADD id_estado INT; -- Esto asume que estado es de tipo INT, ajusta según sea necesario

-- Agregar la restricción de clave foránea a la nueva columna
ALTER TABLE tbl_Prestamo
ADD CONSTRAINT FK_Prestamo_Estado
FOREIGN KEY (id_estado) REFERENCES tbl_estadoPrestamo(id_estado);
/*----------------------------------------------*/

INSERT INTO tbl_Rol(id_rol, rol)
VALUES(1, 'Administrador'),
      (2, 'Usuario'),
      (3, 'Editorial');

INSERT INTO tbl_Editorial(id_editorial, editorial)
VALUES(1, 'Editorial 1'),
      (2, 'Editorial 2'),
      (3, 'Editorial 3');

INSERT INTO tbl_Estado(id_estado, estado)
VALUES(1, 'Disponible'),
      (2, 'Prestado'),
      (3, 'Reservado');

INSERT INTO tbl_EstadoPrestamo(id_estado, estado)
VALUES(1, 'Activo'),
      (2, 'Finalizado') 

INSERT INTO tbl_Usuario(id_Usuario, cedula_usuario, nombre_usuario, correo_usuario, celular_usuario, contraseña, id_rol)
VALUES(1, 12345678, 'Juan Pérez', 'juan.perez@example.com', 12345678, 'contraseña1', 2),
      (2, 23456789, 'María Rodríguez', 'maria.rodriguez@example.com', 23456789, 'contraseña2', 2),
      (3, 34567890, 'Pedro López', 'pedro.lopez@example.com', 34567890, 'contraseña3', 3);



INSERT INTO tbl_Libro(id_libro, nombre_libro, autor_libro, fecha_publicacion, edicion, id_editorial, id_estado)
VALUES(1, 'Libro 1', 'Autor 1', '2022-01-01', 1, 1, 2),
      (2, 'Libro 2', 'Autor 2', '2022-02-01', 2, 2, 2),
      (3, 'Libro 3', 'Autor 3', '2022-03-01', 3, 3, 1);

update tbl_Libro set descripcion='aqui iria una descripcion bien vacana' 

INSERT INTO tbl_Prestamo(id_prestamo, fecha_prestamo, fecha_devolucion, id_libro, id_Usuario,id_estado)
VALUES(1, '2022-04-01', '2022-04-15', 1, 1,1),
      (2, '2022-04-02', '2022-04-16', 2, 2,2);

	  update  tbl_Prestamo set id_estado=1
	  
UPDATE tbl_Editorial
SET Direccion = 'Direccion1',
    CorreoElectronico = 'correo1@editorial.com',
    NumeroTelefono = '123456789'
WHERE id_editorial = 1;

-- Para la segunda editorial
UPDATE tbl_Editorial
SET Direccion = 'Direccion2',
    CorreoElectronico = 'correo2@editorial.com',
    NumeroTelefono = '987654321'
WHERE id_editorial = 2;

-- Para la tercera editorial
UPDATE tbl_Editorial
SET Direccion = 'Direccion3',
    CorreoElectronico = 'correo3@editorial.com',
    NumeroTelefono = '555555555'
WHERE id_editorial = 3;

