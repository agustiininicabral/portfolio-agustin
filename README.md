# Portfolio · Agustín Cabral

Sitio personal para presentar proyectos de QA Automation, análisis de datos, desarrollo con Python y evaluación de aplicaciones con IA.

**Sitio publicado:** https://portfolio-agustin.agustinkbral2013.workers.dev/

## Stack

- React 19
- Vite 8
- Motion
- CSS responsive
- Cloudflare Workers Static Assets

## Desarrollo local

Requiere Node.js 22.12 o superior (se recomienda Node.js 24).

```bash
npm ci
npm run dev
```

## Build y verificación

```bash
npm ci
npm run build
```

El build genera el sitio estático en `dist/`.

## Deploy a Cloudflare

El proyecto utiliza `wrangler.jsonc` y el nombre de Worker `portfolio-agustin`.

```bash
npx wrangler deploy
```

La publicación requiere una sesión autenticada de Wrangler o un token de Cloudflare con permisos adecuados. El workflow de GitHub Actions valida el build, pero no despliega automáticamente ni necesita secretos de Cloudflare.

## Contenido

Los proyectos se mantienen en `src/data/projects.js`. Antes de agregar un proyecto, verificar su repositorio y describir únicamente capacidades implementadas. Diferenciar siempre demos, especificaciones y funcionalidades pendientes.

## Calidad y alcance

- Diseño responsive y navegación por secciones.
- Controles de movimiento reducido para usuarios que lo soliciten.
- Metadatos SEO, Open Graph, canonical y datos estructurados Person.
- Sitemap y robots.txt.
- Build de producción validado en GitHub Actions.

© Agustín Cabral.
