# **Autenticación de Usuarios con Node.js, Express y MongoDB**

Este proyecto implementa un servicio web básico para el registro e inicio de sesión de usuarios utilizando Node.js, Express, y MongoDB. A continuación, se detallan los aspectos más relevantes del proyecto.

## **Descripción**

Este servicio web permite a los usuarios registrarse y autenticarse utilizando su nombre de usuario y contraseña. El sistema verifica la autenticidad de las credenciales y, si son correctas, retorna un token JWT para la autenticación. En caso de que las credenciales sean incorrectas, se devuelve un mensaje de error.

## **Características Principales**

- **Registro de Usuarios:** Permite crear una nueva cuenta de usuario con un nombre de usuario y una contraseña.
- **Inicio de Sesión:** Permite a los usuarios autenticarse con su nombre de usuario y contraseña para obtener un token JWT.
- **Seguridad:** Las contraseñas se almacenan de forma segura utilizando `bcryptjs` para el hashing.
- **JWT:** Se utiliza `jsonwebtoken` para generar tokens de acceso seguros que los usuarios pueden utilizar para autenticar solicitudes posteriores.

## **Requisitos**

- **Node.js:** v14 o superior
- **MongoDB:** Se requiere una instancia de MongoDB en ejecución
- **Dependencias:** Express, Mongoose, Bcryptjs, Jsonwebtoken, Dotenv

## **Instalación**

1. Instalación las dependencias:
   ```bash
   npm install
   ```

2. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
    #? Entorno en el que se encuentra mi aplicacion
    NODE_ENV = 
    
    #? Puerto en el que va a correr mi API
    PORT = 
    
    #! Variables de entorno de mi base de datos
    DB_HOST = 
    DB_USER = 
    DB_PASS = 
    DB_NAME = 
    DB_PORT = 
    JWT_SECRET = 
    ```
  
3. Inicia el servidor:
  - node index.js
  

## **Estructura del Proyecto**

```
/DB-Sena_project
│
├── /config
│   └── db.js
├── /models
│   └── User.js
├── /routes
│   └── auth.js
├── /controllers
│   └── authController.js
├── /middlewares
│   └── authMiddleware.js 
├── /utils
│   └── hash.js 
├── /public
│   └── index.html 
├── package.json
└── index.js
```

## **Uso**

### **Registro de Usuario**
- **Endpoint:** `POST /api/auth/register`
- **Descripción:** Registra un nuevo usuario.
- **Cuerpo de la solicitud:**
  ```json
  {
    "username": "exampleUser",
    "password": "examplePassword"
  }
  ```

### **Inicio de Sesión**
- **Endpoint:** `POST /api/auth/login`
- **Descripción:** Autentica al usuario y devuelve un token JWT.
- **Cuerpo de la solicitud:**
  ```json
  {
    "username": "exampleUser",
    "password": "examplePassword"
  }
  ```