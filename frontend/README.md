# React + TypeScript + Vite

Este template proporciona una configuración mínima para hacer funcionar React con Vite, incluyendo recarga en caliente (HMR) y algunas reglas de ESLint.

Actualmente, hay dos plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Ampliar la configuración de ESLint

Si estás desarrollando una aplicación para producción, se recomienda actualizar la configuración para habilitar reglas de linting con conciencia de tipos:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

También puedes instalar [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) y [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para aplicar reglas específicas de React:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Frontend ERP Clínica

Este frontend es una aplicación React + TypeScript que permite gestionar pacientes, doctores, medicamentos, citas y reportes para una clínica.

## Tecnologías principales

- React 19 + TypeScript
- Material UI (MUI)
- React Router DOM
- Axios
- React Toastify
- TailwindCSS (opcional)
- Stimulsoft Reports JS (para reportes)
- Vite

## Instalación

1. Clona el repositorio y entra a la carpeta `frontend`:

   ```bash
   cd frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` si necesitas variables de entorno (por ejemplo, para la URL de la API):

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

## Uso

Para desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

Para producción:

```bash
npm run build
npm run preview
```

## Pruebas

Para ejecutar los tests unitarios:

```bash
npm run test
```

## Estructura principal

- `src/features`: Módulos de negocio (pacientes, doctores, medicamentos, etc.)
- `src/components`: Componentes reutilizables (Sidebar, etc.)
- `src/routes`: Definición de rutas principales
- `src/theme.tsx`: Tema de MUI
- `src/types`: Tipos y declaraciones globales

## Reportes

Los reportes usan Stimulsoft Reports JS. Para exportar a PDF o Excel, asegúrate de tener la clave de licencia configurada.

---

**Recuerda levantar el backend antes de usar el frontend.**
