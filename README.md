# Geekhub Marketplace

Marketplace temático geek (cómics, TCG, juegos de mesa, figuras, álbumes). Fue el trabajo final de un bootcamp fullstack JavaScript, desarrollado originalmente en equipo. Esta es una versión propia mantenida con fixes y mejoras.

## Funcionalidades

- Registro de usuarios e inicio de sesión.
- Publicación de productos para vender.
- Carrito de compras.
- Evaluación de productos con estrellas.
- Edición del perfil de usuario.
- Eliminación de productos propios.
- Baja de cuenta.

## Stack

**Backend:** Express + PostgreSQL, arquitectura MVC (routes -> controllers -> models/DAOs), autenticación con JWT, hashing de contraseñas con bcrypt, tests con Vitest + Supertest.

**Frontend:** React + Vite, enrutado con react-router-dom, estado global con Context API (usuario, productos, carrito), UI con Bootstrap / React-Bootstrap, peticiones con Axios, notificaciones con react-toastify / SweetAlert2.

## Requisitos

- Node.js (con npm)
- PostgreSQL

## Configuración

**Base de datos:** ejecutar en orden contra una instancia de PostgreSQL:

1. `SERVER/database/DDL.sql` — crea la base de datos y las tablas.
2. `SERVER/database/DML.sql` — carga usuarios y productos de prueba.

Usuario de prueba: `pepito@test.com` / `1234`

**Servidor:**

```bash
cp SERVER/.env.example SERVER/.env   # rellenar DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE, JWT_SECRET_KEY
cd SERVER && npm install && npm run dev
```

**Cliente:**

```bash
cp CLIENT/.env.example CLIENT/.env   # ajustar VITE_URL_BACKEND si es necesario (por defecto http://localhost:3000)
cd CLIENT && npm install && npm run dev
```

## Deploy

https://geekhub-marketplace.onrender.com

## Autores

- Alejandro Stuardo
- Eduardo Molina
- Yesmin Pizarro (versión actual)
