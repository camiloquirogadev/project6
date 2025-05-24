Projecto Sistema de gestión

Sistema de gestión modular y escalable para empresas y emprendimientos.  
Incluye panel administrativo, control de accesos por roles (admin/cliente), y funcionalidades personalizables por rubro (hoteles, clínicas, coworking, tiendas, etc.).

🚀 Tecnologías

- Frontend: React + TypeScript + TailwindCSS
- Backend: Node.js + Express + TypeScript
- Base de datos: MongoDB / PostgreSQL (configurable)
- Autenticación: JWT + Roles (admin, cliente)

⚙️ Instalación

1. Clona el repositorio

    git clone https://github.com/camiloquirogadev/project6.git
    cd project6

2. Instala dependencias

Frontend

    cd frontend
    npm install

Backend

    cd ../backend
    npm install

3. Configura variables de entorno

Crea un archivo .env en backend/ con las siguientes variables:

    PORT=4000
    DATABASE_URL=mongodb://localhost:27017/project6
    JWT_SECRET=tu_clave_secreta

4. Inicia los servidores

En dos terminales separadas:

    # Terminal 1 - Backend
    cd backend
    npm run dev

    # Terminal 2 - Frontend
    cd frontend
    npm run dev

👥 Roles del sistema

- admin: Acceso completo al sistema, configuración general, creación de clientes.
- cliente: Acceso limitado para gestionar su propia empresa (reservas, productos, facturas, etc.)

📁 Estructura del proyecto

project6/
├── frontend/         # Aplicación cliente en React
└── backend/          # API REST en Express

🧪 Tests (próximamente)

- Se integrarán pruebas con Jest, Supertest y React Testing Library.

🤝 Contribuciones

1. Haz un fork del repo
2. Crea una rama feature/tu-feature
3. Commits descriptivos
4. Pull request detallado

📄 Licencia

MIT - © 2025 Camilo Quiroga

📬 Contacto

https://github.com/camiloquirogadev • camilosolquiroga@gmail.com
