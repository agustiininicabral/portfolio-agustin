# Agregar proyectos al portafolio

Los proyectos se administran desde `src/data/projects.js`. No hace falta configurar
un servidor: agregá un objeto por proyecto al array `projects` y guardá el archivo.
En desarrollo, Vite actualiza la vista previa automáticamente; para publicar los
cambios, ejecutá el proceso habitual de build y deploy del sitio.

## Proyectos incluidos

- **PriceWatch** ([repositorio](https://github.com/agustiininicabral/pricewatch)):
  aplicación local en desarrollo para registrar precios manualmente y comparar
  ofertas. No consulta tiendas reales ni tiene alertas funcionales.
- **Sales Analytics** ([repositorio](https://github.com/agustiininicabral/01-sales-analytics-sql-excel)):
  análisis con datos sintéticos, consultas SQL y dashboard en Excel.
- **API Testing Framework** ([repositorio](https://github.com/agustiininicabral/api-testing-framework)):
  suite de pruebas de API REST sobre JSONPlaceholder; no es una aplicación web
  comercial.

Cada proyecto admite estos campos:

| Campo | Uso |
| --- | --- |
| `id` | Identificador único, por ejemplo `mi-app`. |
| `title` | Nombre que aparece en la tarjeta. |
| `category` | Tipo de trabajo, por ejemplo `IA`, `Testing` o `Datos`. |
| `description` | Resumen del proyecto. |
| `status` | Estado opcional, como `Finalizado` o `En progreso`. |
| `technologies` | Lista opcional de tecnologías. |
| `repository` | URL HTTPS del repositorio en GitHub. |
| `demo` | URL HTTPS de una demo publicada, si existe. |
| `video` | URL de YouTube/Vimeo o ruta a un video local `.mp4`, `.webm` u `.ogg`. |
| `poster` | Imagen opcional para la vista previa o para cuando no haya video. |
| `tests` | Lista opcional de pruebas realizadas y sus resultados. |

Ejemplo (reemplazá los valores de muestra por los datos reales de tu trabajo):

```js
export const projects = [
  {
    id: 'mi-proyecto',
    title: 'Nombre del proyecto',
    category: 'Desarrollo',
    description: 'Qué problema resuelve y qué construiste.',
    status: 'Finalizado',
    technologies: ['Python', 'React'],
    repository: 'https://github.com/tu-usuario/mi-proyecto',
    demo: 'https://mi-demo.example.com',
    video: 'https://youtu.be/ID_DEL_VIDEO',
    poster: '/images/mi-proyecto.webp',
    tests: [
      {
        name: 'Prueba de inicio de sesión',
        result: 'passed',
        details: 'Usuario válido y credenciales incorrectas.',
      },
      {
        name: 'Prueba en móvil',
        result: 'partial',
        details: 'Diseño adaptable; falta verificar en otros dispositivos.',
      },
    ],
  },
]
```

Para usar un archivo de video propio, guardalo dentro de `public/videos/` y
referencialo desde la raíz, por ejemplo `video: '/videos/mi-demo.mp4'`.
Los resultados de prueba aceptados son `passed`, `partial` y `failed`.
