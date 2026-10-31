# Portfolio · Agustín Cabral

Sitio personal para presentar proyectos verificables de QA Automation, análisis de datos, desarrollo con Python y evaluación de aplicaciones con IA.

**Sitio publicado:** https://portfolio-agustin.agustinkbral2013.workers.dev/

## Objetivo

El portfolio reúne una selección de proyectos personales y enlaza directamente a sus repositorios para que se pueda revisar el código, la documentación y el alcance de cada trabajo. La prioridad profesional es QA Automation, complementada por Data Analytics y proyectos de Python.

El catálogo distingue explícitamente entre implementaciones funcionales, demostraciones con datos sintéticos y trabajos en desarrollo. No presenta especificaciones como productos terminados ni atribuye resultados que no estén documentados.

## Áreas principales

- **QA Automation:** testing continuo y quality gates, pruebas REST y UI, confiabilidad de suites, regresiones, performance y seguridad de APIs.
- **Data Analytics & Engineering:** SQL avanzado, calidad de datos, modelado dimensional, KPIs, Excel, Power BI y pipelines ETL.
- **AI Engineering:** evaluación offline de recuperación RAG y regresiones de respuestas.
- **Desarrollo:** aplicaciones locales en evolución, identificadas explícitamente como tales.

El detalle y los criterios del catálogo están en [PROJECTS.md](./PROJECTS.md). Los datos de las tarjetas se mantienen en [src/data/projects.js](./src/data/projects.js).

## Stack

- React 19
- Vite 8
- Motion
- CSS responsive
- Cloudflare Workers Static Assets

## Requisitos

- Node.js 22.12 o superior (se recomienda Node.js 24).
- npm, incluido con Node.js.

## Desarrollo local

```bash
npm ci
npm run dev
```

Vite inicia el servidor de desarrollo y muestra la URL local en la terminal.

## Build de producción

```bash
npm ci
npm run build
```

El build genera el sitio estático en `dist/`.

## Verificaciones automatizadas

GitHub Actions ejecuta:

- **Portfolio build:** instalación reproducible con `npm ci`, auditoría de dependencias de producción con `npm audit --omit=dev --audit-level=high` y build de producción en pushes a `main` y Pull Requests.
- **Portfolio Lighthouse audit:** build, espera a que el HTML publicado coincida con el commit y auditoría Lighthouse móvil con tres ejecuciones después de un push a `main` o manualmente.

**Alcance actual de las verificaciones:** el repositorio no declara scripts de unit testing, integración ni end-to-end en `package.json`. El build y Lighthouse validan compilación y aspectos del sitio publicado; no deben confundirse con una suite funcional automatizada.

## Deploy a Cloudflare

El proyecto utiliza `wrangler.jsonc` y el nombre de Worker `portfolio-agustin`.

```bash
npm run deploy
```

La publicación requiere una sesión autenticada de Wrangler o un token de Cloudflare con permisos adecuados. El workflow de build no despliega automáticamente; el workflow Lighthouse comprueba el sitio publicado después de un push a `main`.

## Calidad, accesibilidad y alcance

- Diseño responsive y navegación por secciones.
- Controles de movimiento reducido para usuarios que lo soliciten.
- Navegación por teclado y enlaces externos identificados.
- Metadatos SEO, Open Graph, canonical y datos estructurados Person.
- Sitemap y robots.txt.
- Build de producción y auditoría Lighthouse en GitHub Actions.

## Limitaciones conocidas del contenido

- Los proyectos con datos sintéticos están identificados como demostraciones.
- El caso de Power BI documenta el modelo y las visualizaciones previstas, pero no incluye un archivo PBIX terminado.
- PriceWatch se presenta como aplicación local en desarrollo; no consulta tiendas reales ni envía notificaciones.
- Las métricas de evaluación de LLM/RAG se describen como señales de comparación, no como prueba de veracidad semántica.

© Agustín Cabral.
