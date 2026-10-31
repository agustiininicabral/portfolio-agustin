# Portfolio · Agustín Cabral

Sitio personal para presentar proyectos verificables de QA Automation, análisis de datos, desarrollo con Python y evaluación de aplicaciones con IA.

**Sitio publicado:** https://portfolio-agustin.agustinkbral2013.workers.dev/

## Áreas principales

- **QA Automation:** testing continuo y quality gates, pruebas REST y UI, confiabilidad de suites, regresiones, performance y seguridad de APIs.
- **Data Analytics & Engineering:** SQL avanzado, calidad de datos, modelado dimensional, KPIs, Excel, Power BI y pipelines ETL.
- **AI Engineering:** evaluación offline de recuperación RAG y regresiones de respuestas.
- **Desarrollo:** aplicaciones locales en evolución, identificadas explícitamente como tales.

El catálogo prioriza proyectos con alcance y tecnologías documentados. Las demos, los datos sintéticos y las funcionalidades pendientes se identifican en cada descripción; no se presentan especificaciones como productos terminados.

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

El build genera el sitio estático en `dist/`. GitHub Actions ejecuta instalación reproducible, auditoría de dependencias de producción y build en Pull Requests y pushes a `main`.

## Deploy a Cloudflare

El proyecto utiliza `wrangler.jsonc` y el nombre de Worker `portfolio-agustin`.

```bash
npm run deploy
```

La publicación requiere una sesión autenticada de Wrangler o un token de Cloudflare con permisos adecuados. El workflow de build no despliega automáticamente; el workflow Lighthouse comprueba el sitio publicado después de un push a `main`.

## Contenido

Los proyectos se mantienen en `src/data/projects.js`. La guía de catálogo y criterios está en [PROJECTS.md](./PROJECTS.md). Antes de agregar un proyecto, verificar su repositorio y describir únicamente capacidades implementadas.

## Calidad y alcance

- Diseño responsive y navegación por secciones.
- Controles de movimiento reducido para usuarios que lo soliciten.
- Metadatos SEO, Open Graph, canonical y datos estructurados Person.
- Sitemap y robots.txt.
- Build de producción validado en GitHub Actions.

© Agustín Cabral.
