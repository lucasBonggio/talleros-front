# TallerOS — Frontend

Interfaz web para el sistema de gestión de órdenes de reparación TallerOS. Consume la API REST del backend y permite al equipo del taller gestionar el ciclo de vida completo de cada reparación.

[![Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://demo-talleros.vercel.app)
[![Backend](https://img.shields.io/badge/backend-repositorio-lightgrey)](https://github.com/tu-usuario/talleros-backend)

---

## Demo

**https://demo-talleros.vercel.app**

```
Usuario: admin
Contraseña: admin123
```

> La demo consume el backend deployado en Render free tier. Si no responde de inmediato, esperá unos segundos a que despierte.

---

## Stack

| Tecnología | Uso |
|---|---|
| React | Framework principal |
| React Context API | Gestión del estado de autenticación global |
| Lucide React | Iconografía |
| Axios | Comunicación con el backend |

---

## Funcionalidades

- Autenticación con JWT — login, manejo de sesión y protección de rutas. El estado del usuario autenticado se comparte globalmente mediante Context API, evitando prop drilling entre componentes.
- Listado de órdenes activas con filtros por estado.
- Registro de nuevas órdenes con búsqueda de cliente existente por teléfono o nombre.
- Transiciones de estado mediante acciones directas (iniciar reparación, marcar lista, entregar, cancelar).
- Dashboard con resumen del estado actual del taller y órdenes demoradas.

---

## Correr el proyecto localmente

### Requisitos

- Node.js 18+

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/lucasBonggio/talleros-front.git
cd talleros-front

# Instalar dependencias
npm install

# Configurar la URL del backend
# Crear un archivo .env en la raíz con:
VITE_BACKEND_URL=http://localhost:8080

# Correr en modo desarrollo
npm start
```

La aplicación levanta en `http://localhost:3000` y espera el backend en el puerto 8080.

### Para apuntar a la demo del backend

```
VITE_BACKEND_URL=https://talleros-back-end.onrender.com
```

---

## Repositorio relacionado

El backend (Spring Boot + PostgreSQL) está en un repositorio separado e incluye la documentación completa de la API en formato OpenAPI:

**https://github.com/lucasBonggio/talleros-back-end.git**

---

## Autor

**Lucas** — Estudiante de Tecnicatura en Desarrollo de Software  
Frontend: React · REST APIs · JWT
