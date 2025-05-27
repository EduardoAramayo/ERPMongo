# Instrucciones para nuevos desarrolladores

## 1. Clonar el repositorio

```bash
git clone https://github.com/EduardoAramayo/ERPMongo.git
cd ERPMongo
```

## 2. Configuración del entorno local

- Entra a la carpeta del backend o frontend según lo que vayas a trabajar.
- Instala las dependencias:

  ```bash
  npm install
  ```

- Copia el archivo `.env.example` (si existe) a `.env` y coloca tus claves y variables de entorno necesarias.
- Para el backend, asegúrate de tener MongoDB instalado y en ejecución.

## 3. Tecnologías necesarias

- Node.js (v18 o superior recomendado)
- npm (v9 o superior)
- MongoDB (para desarrollo local)
- Git

Opcional para frontend:
- Vite
- Yarn (si prefieres)

## 4. Ejecución local

- Backend:

  ```bash
  npm run dev
  ```

- Frontend:

  ```bash
  npm run dev
  ```

## 5. Flujo para contribuir

1. Crea una rama a partir de `develop`:

   ```bash
   git checkout develop
   git pull
   git checkout -b feature/nombre-de-tu-feature
   ```

2. Realiza tus cambios y haz commit:

   ```bash
   git add .
   git commit -m "Descripción breve de tu cambio"
   ```

3. Sube tu rama:

   ```bash
   git push origin feature/nombre-de-tu-feature
   ```

4. Abre un Pull Request hacia la rama `develop` en GitHub.

5. Espera revisión y merge.

---

# Arquitectura general del sistema

El sistema está compuesto por los siguientes componentes principales:

- **Frontend:** Aplicación en React + TypeScript (Vite) para la gestión de la clínica.
- **Backend:** API RESTful en Node.js + Express, que expone endpoints para autenticación, usuarios, pacientes, doctores, medicamentos, citas, prescripciones y reportes.
- **Base de datos:** MongoDB, utilizada por el backend para almacenar toda la información.
- **API externa (opcional):** Para reportes avanzados o integraciones futuras.

## Interacción entre componentes

- El **frontend** consume las APIs del **backend** para todas las operaciones (login, CRUD, reportes, etc.).
- El **backend** valida y procesa las peticiones, accede a la base de datos y responde al frontend.
- El **backend** está protegido con JWT y CORS, solo acepta peticiones del dominio configurado del frontend.
- Los **reportes** se generan en el backend usando agregaciones de MongoDB y pueden ser exportados desde el frontend.

## Diagrama simple

```
[Frontend React] <--HTTP REST--> [Backend Node.js/Express] <---> [MongoDB]
```

Puedes usar herramientas como Lucidchart, Draw.io o incluso un dibujo a mano para detallar más el diagrama si lo necesitas.

---
