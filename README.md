E-commerce React

Este es un proyecto de E-commerce desarrollado con el stack MERN (MySQL, Express, React, Node.js). Está diseñado para ser una muestra de mis habilidades.
Tecnologías utilizadas

    Backend:

        Node.js

        Express.js

        JWT para la validación de tokens y autenticación

        Prisma como ORM para la gestión de la base de datos MySQL

    Frontend:

        React.js

        Tailwind para estilizado

    Base de Datos:

        MySQL para almacenar los datos del usuario, productos y órdenes

Características

    Autenticación de Usuarios: Implementación de login y registro de usuarios utilizando JWT.

    Gestión de Productos: Los vendedores pueden agregar, editar y eliminar productos.

    Carrito de Compras: Los usuarios pueden agregar productos al carrito y realizar un pedido.

    Rutas protegidas: Sólo los usuarios autenticados pueden acceder a ciertos endpoints, como la gestión de productos.

Instalación
Requisitos previos

    Node.js

    MySQL

    npm o yarn

Instrucciones de instalación

    Clonar el repositorio:

git clone https://github.com/joelcb23/e-commerce-react.git
cd e-commerce-react

Instalar las dependencias: Para el backend:

npm install

Para el frontend:

cd client
npm install

Configurar la base de datos:

    Crea una base de datos en MySQL llamada ecommerce_db.

    Configura las credenciales en el archivo .env del backend.

Ejecutar el proyecto: Primero, ejecuta el backend:

npm start

Luego, ejecuta el frontend:

    cd client
    npm start

    Abre tu navegador y ve a http://localhost:4000 para ver la aplicación en funcionamiento.

Contribuciones

¡Las contribuciones son bienvenidas! Si tienes alguna mejora o corrección que hacer, no dudes en abrir un pull request.
