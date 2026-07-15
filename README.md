# SportClub — Sistema de Gestión Deportiva

Aplicación SPA desarrollada en **React** para la gestión integral de un club deportivo: usuarios, deportes, salas, asignaciones (deporte + sala + coach), horarios y reservas de clases. Consume una API REST entregada por el docente (no modificable) y aplica control de acceso por roles (Administrador, Coach, Usuario).

> Proyecto desarrollado para la Evaluación Sumativa 3 — Programación Front End (TI3031), INACAP.

---

## Backend

Este proyecto **no incluye el backend**. Se consume vía API REST desde el siguiente repositorio:

🔗 **Repositorio del backend:** [https://github.com/JavierAhumadaCortes/backend-sportclub](https://github.com/JavierAhumadaCortes/backend-sportclub)

El backend está desarrollado en Node.js + Express + Sequelize (SQLite/MySQL), con autenticación JWT. Debe estar corriendo (por defecto en `http://localhost:3000`) antes de levantar este frontend.

**Restricción del proyecto:** el backend no puede modificarse — su estructura de base de datos, contratos de API y endpoints se mantienen tal como fueron entregados.

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React 19 | Librería principal de UI |
| React Router DOM | Navegación y rutas protegidas por rol |
| Bootstrap / React-Bootstrap | Componentes de interfaz (modales, formularios) |
| SweetAlert2 | Alertas de confirmación, éxito y error |
| Fetch API | Consumo de la API REST del backend |
| Vite | Bundler y entorno de desarrollo |

---

## Roles del sistema

| Rol | Acceso |
|---|---|
| **Administrador** | Dashboard, Usuarios, Salas, Deportes, Horarios, Asignaciones |
| **Coach** | Dashboard, Mis Clases, Mi Horario |
| **Usuario** | Dashboard, Clases Disponibles, Mis Reservas |
| **Todos los roles** | Mi Perfil |

---

## Flujos implementados

**Base obligatoria** (para todos los roles):
- Login
- Registro de usuario
- Gestión de Usuarios (CRUD)
- Rutas protegidas por rol
- Gestión de roles

**Flujos por rol:**
1. Gestión de Salas (Admin)
2. Gestión de Asignaciones — Deporte + Sala + Coach (Admin)
3. Gestión de Horarios (Admin)
4. Gestión de Deportes (Admin)
5. Mis Clases (Coach)
6. Mi Horario (Coach)
7. Clases Disponibles (Usuario)
8. Crear Reserva (Usuario)
9. Mis Reservas / Cancelar Reserva (Usuario)
10. Mi Perfil (Todos los roles)

---

## Estructura del proyecto

```
src/
├── components/         # Componentes reutilizables (modales, inputs, sidebar, topbar)
│   ├── auth/            # Login y Registro
│   ├── users/            # CRUD de usuarios
│   ├── rooms/            # CRUD de salas
│   ├── sports/           # CRUD de deportes
│   ├── sportRooms/       # CRUD de asignaciones
│   └── schedules/        # CRUD de horarios
├── pages/               # Páginas por rol
│   ├── admin/
│   ├── coach/
│   └── user/
├── layouts/             # Layouts con Sidebar + TopBar por rol
├── services/            # Consumo de la API (fetch)
├── routes/              # Definición de rutas y protección por rol
├── config/               # Configuración de colores/menús por rol
└── utils/                # Helpers (mapeo de días, resolución de datos anidados)
```

---

## Instalación y ejecución local

1. Clonar este repositorio y entrar a la carpeta del proyecto:
   ```bash
   git clone <url-de-este-repositorio>
   cd clubSport
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear un archivo `.env` en la raíz con la URL del backend:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. Levantar el backend (ver repositorio enlazado arriba) antes de continuar.

5. Ejecutar el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

6. Abrir `http://localhost:5173` en el navegador.

---

## Credenciales de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin1@demo.cl | 12345678 |
| Coach | coach1@demo.cl | 12345678 |
| Coach | coach2@demo.cl | 12345678 |
| Usuario | user1@demo.cl | 12345678 |

> Estas credenciales corresponden a los datos de prueba (seed) cargados en el backend. Si no funcionan, verificar que el backend tenga los datos iniciales cargados.


---

## Integrantes

- _Creado por Visnupriya Amstein_ 


