# Deployment en Vercel

## Requisitos

- Repositorio conectado a Vercel.
- Proyecto Supabase activo.
- Migracion de base de datos aplicada.

## Variables de entorno

Configura en Vercel -> Settings -> Environment Variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Recomendado habilitar en:

- Production
- Preview
- Development

## Build

Este proyecto usa Vite:

- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

## Validacion post-deploy

1. La app abre sin errores de variables faltantes.
2. Se muestra la pantalla de autenticacion.
3. El usuario puede crear, editar, completar y eliminar tareas.
4. Los filtros reflejan el estado correcto.
5. La sesion se puede cerrar correctamente.
