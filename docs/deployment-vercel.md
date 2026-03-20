# Deployment en Vercel

## Requisitos

- Repositorio conectado a Vercel.
- Proyecto Supabase activo.
- Migracion de base de datos aplicada.

## Variables de entorno

Configura en Vercel -> Settings -> Environment Variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_AUTH_REDIRECT_URL` (por ejemplo, `https://tu-app.vercel.app`)

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
3. El correo de confirmacion redirige al dominio de produccion (no localhost).
4. El usuario puede crear, editar, completar y eliminar tareas.
5. Los filtros reflejan el estado correcto.
6. La sesion se puede cerrar correctamente.

## Supabase Auth URL Configuration

En Supabase -> Authentication -> URL Configuration:

- `Site URL`: dominio principal de produccion (por ejemplo `https://tu-app.vercel.app`)
- `Redirect URLs`: incluir produccion y local (por ejemplo `https://tu-app.vercel.app` y `http://localhost:5173`)
