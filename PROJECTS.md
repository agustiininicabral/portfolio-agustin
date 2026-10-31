# Catálogo de proyectos

El catálogo visible del sitio se administra desde `src/data/projects.js`. Cada tarjeta enlaza al repositorio correspondiente y describe el alcance implementado, no funcionalidades futuras.

## QA Automation

- [Continuous Testing & CI Quality Gates](https://github.com/agustiininicabral/continuous-testing-quality-gates): pruebas por capas, quality gates y matriz de CI.
- [API Testing Framework](https://github.com/agustiininicabral/api-testing-framework): framework de pruebas REST con casos positivos y negativos.
- [Playwright UI Testing](https://github.com/agustiininicabral/playwright-ui-testing): automatización de un flujo de login con fixtures y ejecución en CI.
- [Test Reliability & Regression Monitor](https://github.com/agustiininicabral/test-reliability-regression-monitor): análisis de JUnit XML, históricos SQLite y detección heurística de posibles pruebas flaky.
- [Performance Testing Lab](https://github.com/agustiininicabral/performance-testing-lab): pruebas acotadas con Locust, percentiles de latencia y comparación contra baseline.
- [API Security Testing Lab](https://github.com/agustiininicabral/api-security-testing-lab): validaciones locales de autenticación, autorización y manejo de errores.

## Data Analytics & Engineering

- [SQL Advanced Analytics](https://github.com/agustiininicabral/sql-advanced-analytics): SQL analítico, cohortes, RFM y controles de calidad con DuckDB.
- [Data Analytics · Farmacia](https://github.com/agustiininicabral/data-analytics-farmacia-farmafe): análisis de ventas, costos, márgenes, inventario y reconciliación de KPIs sobre datos sintéticos.
- [Retail KPI & Star Schema](https://github.com/agustiininicabral/retail-kpi-star-schema): pipeline retail, modelo estrella, validación y KPIs. La métrica Ticket es un promedio por registro, no por pedido, porque el origen no tiene ID de orden.
- [Retail Analytics · Power BI](https://github.com/agustiininicabral/retail-analytics-powerbi): caso documentado con modelo y especificación de visualizaciones; no incluye PBIX terminado.
- [Sales Analytics](https://github.com/agustiininicabral/01-sales-analytics-sql-excel): análisis comercial con datos sintéticos, SQL y dashboard demostrativo en Excel.
- [Automated ETL Pipeline](https://github.com/agustiininicabral/automated-etl-pipeline): pipeline batch con validación, rechazos, SQLite y carga idempotente.

## AI Engineering y desarrollo

- [LLM Evaluation Lab](https://github.com/agustiininicabral/llm-evaluation-lab): evaluación offline de recuperación y respuestas registradas; las métricas léxicas no prueban veracidad semántica.
- [PriceWatch](https://github.com/agustiininicabral/pricewatch): aplicación local en desarrollo para registrar precios manualmente. No consulta tiendas reales ni envía notificaciones.

## Criterios para mantener el catálogo

1. Verificar que el repositorio exista y que el enlace sea correcto.
2. Describir únicamente capacidades implementadas y comprobables.
3. Identificar los datos sintéticos, demos, heurísticas y limitaciones relevantes.
4. No presentar prototipos, especificaciones ni integraciones pendientes como productos terminados.
5. Mantener los proyectos de QA Automation primero porque es el eje profesional prioritario del portfolio.

## Campos admitidos

| Campo | Uso |
| --- | --- |
| `id` | Identificador único. |
| `title` | Nombre de la tarjeta. |
| `category` | Área y especialidad. |
| `description` | Alcance implementado y limitaciones. |
| `status` | Estado opcional, por ejemplo `En desarrollo`. |
| `technologies` | Tecnologías utilizadas. |
| `repository` | URL HTTPS del repositorio GitHub. |
| `demo` | URL HTTPS de una demo publicada, si existe. |
| `video` | URL de YouTube/Vimeo o ruta de video local. |
| `poster` | Imagen opcional para la vista previa. |
| `tests` | Lista opcional de pruebas y sus resultados. |
