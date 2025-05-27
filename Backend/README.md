# Backend ERP Clínica

Este backend provee una API RESTful para la gestión de pacientes, doctores, medicamentos, citas, prescripciones y reportes en una clínica.

## Tecnologías principales

- Node.js
- Express
- MongoDB + Mongoose
- JWT (autenticación)
- Jest (pruebas unitarias)

## Instalación

1. Clona el repositorio y entra a la carpeta `Backend`:

   ```bash
   cd Backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` con las siguientes variables:

   ```
   MONGO_URI=mongodb://localhost:27017/erp_clinica
   JWT_SECRET=tu_clave_secreta
   FRONTEND_ORIGIN=http://localhost:5173
   PORT=5000
   ```

## Uso

Para desarrollo:

```bash
npm run dev
```

Para producción:

```bash
npm start
```

La API estará disponible en [http://localhost:5000/api](http://localhost:5000/api).

## Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm run test
```

Las pruebas están en la carpeta `/tests` y usan Jest.

## Endpoints principales

- `/api/auth`: Autenticación de usuarios
- `/api/users`: Gestión de usuarios
- `/api/patients`: Gestión de pacientes
- `/api/doctors`: Gestión de doctores
- `/api/medications`: Gestión de medicamentos
- `/api/appointments`: Gestión de citas
- `/api/prescriptions`: Gestión de prescripciones
- `/api/reports`: Reportes (historial de paciente, inventario de medicamentos)

## Notas

- El backend requiere MongoDB en ejecución.
- El CORS está configurado para aceptar solo el frontend definido en `FRONTEND_ORIGIN`.
- Los reportes usan agregaciones de MongoDB para generar la información.

---

**Levanta primero el backend antes de usar el frontend.**
