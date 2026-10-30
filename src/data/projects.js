export const projects = [
  {
    id: 'pricewatch',
    title: 'PriceWatch',
    category: 'Desarrollo · En desarrollo',
    description:
      'Aplicación local para organizar productos, registrar precios manualmente y comparar ofertas. No consulta tiendas reales ni ofrece alertas funcionales.',
    status: 'En desarrollo',
    technologies: ['Python', 'FastAPI', 'SQLite', 'JavaScript'],
    repository: 'https://github.com/agustiininicabral/pricewatch',
  },
  {
    id: 'sales-analytics',
    title: 'Sales Analytics',
    category: 'Análisis de datos',
    description:
      'Flujo de análisis de ventas con datos sintéticos: carga de CSV, modelo relacional, consultas SQL y dashboard en Excel con indicadores y gráficos.',
    technologies: ['PostgreSQL', 'SQL', 'Excel', 'Python'],
    repository: 'https://github.com/agustiininicabral/01-sales-analytics-sql-excel',
  },
  {
    id: 'api-testing-framework',
    title: 'API Testing Framework',
    category: 'Testing de API',
    description:
      'Suite de pruebas para endpoints REST sobre JSONPlaceholder. Valida respuestas GET y POST, estructura y tipos de datos, además de escenarios de error.',
    technologies: ['Python', 'pytest', 'Requests', 'GitHub Actions'],
    repository: 'https://github.com/agustiininicabral/api-testing-framework',
  },
]
