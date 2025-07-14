# Tech-commerce React 🛒

A full-stack app developed with the stack MERN (MySQL, Express, React, Node.js).

## Description

This is an e-commerce project for selling tech products. Users can register either as a customer or as a seller. They can browse different products for sale, view product categories, and add items to their shopping cart. The project was developed using technologies such as React, Express, MySQL, Prisma ORM, and Node.js.

## Technologies Used

- Backend:

  - Node.js

  - Express.js

  - JWT for tokens and authentication validation

  - Prisma as an ORM for the management of the MySQL database

- Frontend:

  - React.js

  - Tailwind

- Base de Datos:

  - MySQL to store user data, products and orders

## Features

- User Authentication: Implements user login and registration using JWT.

- Product Management: Sellers can add, edit, and delete products.

- Shopping Cart: Users can add products to their cart and place an order.

- Protected Routes: Only authenticated users can access certain endpoints, such as product management.

## Getting started

### Requirements

- `Node.js`

- `MySQL`

- `npm` o `yarn`

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/joelcb23/e-commerce-react.git
   cd e-commerce-react
   ```

2. Install the dependencies:

   - For the backend:

     ```bash
     npm install
     ```

   - For the frontend:

     ```bash
     cd client
     npm install
     ```

3. Setting the credentials:

   - Create the database and name it as `ecommerce_db`.

     ```bash
     mysql -u root -p < sql/init_db.sql
     ```

   - Set up the credentials in the backend `.env` file. The required variables are `DATABASE_URL`, `PORT`, `SECRET_KEY`, `FRONTEND_URL`.

   - For the frontend, create a `.env` file and set `VITE_BACKEND_URL`

4. Run the development servers:

   - First, the backend:

     ```bash
     npm run dev
     ```

   - Then, the frontend:
     ```bash
     cd client
     npm run dev
     ```

## API Endpoints

### Auth

- `POST /api/auth/register` Register a new user as customer or seller
- `POST /api/auth/login` Login your account

### Products

- `GET /api/products/categories` Get all categories
- `GET /api/products/category/{id}` Get products by category
- `GET /api/products` Get all products
- `GET /api/products/search` Get products by name
- `GET /api/products/{id}` Get product
- `POST /api/products` Create a new product
- `PUT /api/products/{id}` Update product
- `DELETE /api/products/{id}` Delete product

### Orders

- `GET /api/orders` Get all orders
- `GET /api/orders/{id}` Get order
- `POST /api/orders` Create a order

### Cart

- `GET /api/cart` Get items from cart

## Visit the [live demo](https://e-commerce-react-1-n0yq.onrender.com)

The app was deployed on [render.com](https://render.com)

## Contribuciones

Contributions are welcome! If you have any improvements or fixes, feel free to open a pull request.

## LICENCSE

[MIT LICENSE](LICENSE)
