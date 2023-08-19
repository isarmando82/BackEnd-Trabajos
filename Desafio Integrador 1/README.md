# PRACTICA INTEGRADORA - Ismael Armando.

Se hace entrega de la misma resuelta de acuerdo a lo Señalado por el profesor en la cursada

## Practica Integradora - Curso Backend NodeJS - Fin de Modulo 1.

Se realiza un proyecto en Node.js que se conecta tanto a una base de datos MongoDB llamada colegio, y una persistencia en filesystem, donde se tiene un archivo json para estudiantes y otro para cursos. 

Se Utiliza mongoose importándolo en Módulo (import) y se gestiona sus acciones a través de promesas.

## BD y el Esquema:

Se crea una colección llamada ‘estudiantes’ con la siguiente estructura y datos que se detallan a continuación:
- name: type string
- lastName: tipo string
- age: type number
- id: type string (campo único)
- courses: type array

Se crea una colección llamada Cursos con la siguiente estructura:

- title: type string
- description: tipo string
- teacherName: type number
- students: type array

Todos los campos son requeridos obligatoriamente ({ required: true })

## Capa de persistencia: Operando sobre los datos del colegio:

Se crea la capa de persistencia de nuestra app, lo cual implica:

- Crear un service para manejar las operaciones de la BD MongoDB usando Mongoose para crear nuestro CRUD.
- Crear la posiblidad de usar un filesystem para persistir la misma data, (manejo por filesystem).

## Se Genera el API REST para interactuar con la data: 
Se crean los routers correspondientes para:

- Insertar un arreglo de estudiantes a dicha colección
- Desarrollar los endpoints correspondientes al CRUD pensado para trabajar con esta colección
- Corroborar los resultados con Postman.

## Se usa Handlebars para crear las plantillas - Vistas.

- Se crean las vistas necesarias para poder visualizar la data del colegio y sus estudiantes, más los cursos asociados. 
- Se desarrollan paginas para crear la data.
