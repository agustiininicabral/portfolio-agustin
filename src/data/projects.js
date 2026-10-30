export const projects = [
  {
    id: 'continuous-testing-quality-gates',
    title: 'Continuous Testing & CI Quality Gates',
    category: 'QA Automation · CI/CD',
    description:
      'Framework de testing por capas con pruebas unitarias, integración, contrato y regresión. Incluye validaciones de calidad, cobertura mínima del 85% y matriz de CI para Python 3.11 y 3.12.',
    technologies: ['Python', 'FastAPI', 'pytest', 'Ruff', 'GitHub Actions'],
    repository: 'https://github.com/agustiininicabral/continuous-testing-quality-gates',
  },
  {
    id: 'playwright-ui-testing',
    title: 'Playwright UI Testing',
    category: 'QA Automation · UI',
    description:
      'Suite de automatización para un flujo de login: pruebas locales de configuración, navegador e integración contra un sitio público. Incluye fixtures deterministas y ejecución en GitHub Actions.',
    technologies: ['Python', 'pytest', 'Playwright', 'Chromium', 'GitHub Actions'],
    repository: 'https://github.com/agustiininicabral/playwright-ui-testing',
  },
  {
    id: 'performance-testing-lab',
    title: 'Performance Testing Lab',
    category: 'Testing · Rendimiento',
    description:
      'Laboratorio reproducible con API FastAPI, pruebas de carga acotadas con Locust y reportes de latencia p50/p95/p99, throughput y tasa de fallos. Compara ejecuciones contra una línea base para detectar regresiones; los datos de ejemplo son sintéticos.',
    technologies: ['Python', 'FastAPI', 'Locust', 'pytest', 'CI'],
    repository: 'https://github.com/agustiininicabral/performance-testing-lab',
  },
  {
    id: 'api-security-testing-lab',
    title: 'API Security Testing Lab',
    category: 'QA · Seguridad de API',
    description:
      'Laboratorio local para validar autenticación Bearer, roles, permisos por propietario, parámetros inválidos y manejo seguro de errores. Utiliza usuarios y tokens ficticios; no es un sistema de autenticación para producción.',
    technologies: ['Python', 'FastAPI', 'pytest', 'Ruff', 'GitHub Actions'],
    repository: 'https://github.com/agustiininicabral/api-security-testing-lab',
  },
  {
    id: 'api-testing-framework',
    title: 'API Testing Framework',
    category: 'Testing · API REST',
    description:
      'Framework de pruebas para endpoints REST sobre JSONPlaceholder. Valida respuestas GET y POST, esquemas JSON, tipos de datos, casos negativos y manejo de timeouts. Las pruebas de integración requieren acceso al servicio externo.',
    technologies: ['Python', 'pytest', 'Requests', 'GitHub Actions'],
    repository: 'https://github.com/agustiininicabral/api-testing-framework',
  },
  {
    id: 'llm-evaluation-lab',
    title: 'LLM Evaluation Lab',
    category: 'IA · Evaluación de RAG',
    description:
      'Toolkit offline para evaluar recuperación y respuestas registradas, comparar baselines y detectar regresiones. No necesita Ollama, Docker, claves ni proveedores externos; sus métricas léxicas son señales de evaluación, no una prueba de veracidad.',
    technologies: ['Python', 'RAG', 'Evaluation', 'pytest', 'CI'],
    repository: 'https://github.com/agustiininicabral/llm-evaluation-lab',
  },
  {
    id: 'pricewatch',
    title: 'PriceWatch',
    category: 'Desarrollo · Aplicación local',
    description:
      'Aplicación local para organizar productos, registrar precios manualmente y comparar observaciones verificadas. No consulta tiendas reales ni envía notificaciones; las integraciones con comercios siguen pendientes.',
    status: 'En desarrollo',
    technologies: ['Python', 'FastAPI', 'SQLite', 'JavaScript'],
    repository: 'https://github.com/agustiininicabral/pricewatch',
  },
  {
    id: 'sales-analytics',
    title: 'Sales Analytics',
    category: 'Análisis de datos · Excel y SQL',
    description:
      'Flujo de análisis comercial con datos sintéticos: validación de CSV, modelo relacional en PostgreSQL, consultas SQL de negocio y dashboard demostrativo en Excel con indicadores y gráficos.',
    technologies: ['PostgreSQL', 'SQL', 'Excel', 'Python'],
    repository: 'https://github.com/agustiininicabral/01-sales-analytics-sql-excel',
  },
  {
    id: 'retail-analytics-powerbi',
    title: 'Retail Analytics · Power BI',
    category: 'Business Intelligence',
    description:
      'Caso de análisis retail de punta a punta con datos sintéticos reproducibles, controles de calidad, modelo estrella, consultas SQL y especificación de KPIs y visualizaciones para construir el reporte en Power BI. No incluye un archivo PBIX terminado.',
    technologies: ['Power BI', 'SQL', 'Python', 'Data Quality'],
    repository: 'https://github.com/agustiininicabral/retail-analytics-powerbi',
  },
  {
    id: 'sql-advanced-analytics',
    title: 'SQL Advanced Analytics',
    category: 'Análisis de datos · SQL avanzado',
    description:
      'Caso de negocio reproducible con DuckDB: joins, CTEs, funciones de ventana, crecimiento mensual, cohortes, segmentación RFM, valor de vida del cliente y controles de calidad sobre datos sintéticos.',
    technologies: ['SQL', 'DuckDB', 'Python', 'pytest'],
    repository: 'https://github.com/agustiininicabral/sql-advanced-analytics',
  },
  {
    id: 'automated-etl-pipeline',
    title: 'Automated ETL Pipeline',
    category: 'Data Engineering · ETL',
    description:
      'Pipeline batch que extrae JSON y CSV, normaliza y valida registros, rechaza datos inconsistentes y carga resultados en SQLite mediante upserts transaccionales. Genera reportes de auditoría y es idempotente.',
    technologies: ['Python', 'SQLite', 'ETL', 'pytest', 'GitHub Actions'],
    repository: 'https://github.com/agustiininicabral/automated-etl-pipeline',
  },
]
