# Clima en JavaScript puro

Aplicación del clima hecha solo con HTML, CSS y JavaScript, **sin librerías ni frameworks**. Busca una ciudad y muestra el tiempo actual y el pronóstico de los próximos 5 días, usando la API gratuita de [Open-Meteo](https://open-meteo.com/).

**Demo:** `https://TU-USUARIO.github.io/api-clima/` _(reemplaza por tu enlace cuando lo publiques)_

![Captura de la aplicación](docs/captura.png)
_(agrega aquí una captura; ver la sección "Capturas")_

## Funciones

- Buscador de ciudades con **sugerencias mientras escribes** (con *debounce*).
- Tiempo actual: temperatura, sensación térmica, humedad, viento y precipitación.
- Pronóstico de 5 días con temperaturas máxima y mínima y probabilidad de lluvia.
- Botón **Mi ubicación** con la API de geolocalización del navegador.
- Cambio entre **°C y °F**, recordado entre visitas.
- **Ciudades favoritas** (hasta 8), guardadas en `localStorage`.
- Recuerda la última ciudad consultada.
- Estados de **carga** y de **error** con botón "Reintentar".
- Navegación con teclado en las sugerencias (↓, ↑, Escape).
- Diseño responsive, modo oscuro automático y fondo distinto de día y de noche.

## Tecnologías

- HTML5 y CSS3 (variables, grid, flexbox, `prefers-color-scheme`)
- JavaScript moderno: módulos ES, `fetch`, `async/await`, `AbortController`, `localStorage`, `Intl`, Geolocation API
- API: [Open-Meteo](https://open-meteo.com/) (Geocoding y Forecast), gratuita y **sin clave**

## Estructura

```
api-clima/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js      → eventos y flujo de la aplicación
│   ├── api.js       → peticiones a Open-Meteo y manejo de errores
│   ├── clima.js     → funciones puras (códigos del tiempo, formato, debounce)
│   ├── storage.js   → favoritos, última ciudad y unidad en localStorage
│   └── ui.js        → dibuja la interfaz en el DOM
└── README.md
```

## Cómo funciona

1. El usuario escribe una ciudad. Tras 350 ms sin teclear, `api.js` consulta la API de **Geocoding**, que devuelve nombres y coordenadas.
2. Al elegir una ciudad, se consulta la API de **Forecast** con esas coordenadas y se pide el tiempo actual y el pronóstico diario.
3. `api.js` normaliza la respuesta a un formato propio y `ui.js` la dibuja.
4. La ciudad se guarda como "última consultada" para la próxima visita.

### Endpoints usados

| Servicio | URL |
|---|---|
| Geocoding | `https://geocoding-api.open-meteo.com/v1/search` |
| Forecast | `https://api.open-meteo.com/v1/forecast` |

## Decisiones de diseño

| Módulo | Responsabilidad | ¿Toca el DOM? |
|---|---|---|
| `api.js` | Hacer las peticiones y traducir errores | No |
| `clima.js` | Funciones puras, fáciles de probar | No |
| `storage.js` | Leer y guardar en `localStorage` | No |
| `ui.js` | Crear y actualizar elementos HTML | Sí |
| `main.js` | Conectar todo | Sí |

Otras decisiones:

- **`fetch` no falla con un 404 o 500**, así que se revisa `respuesta.ok` y se lanza un error propio.
- **Errores tipificados.** `ErrorApi` lleva un `tipo` (`red`, `timeout`, `http`, `formato`, `cancelada`), para tratar cada caso distinto. Una petición cancelada a propósito no se muestra como error.
- **Cancelación de peticiones con `AbortController`.** Si el usuario cambia de ciudad o sigue escribiendo, la petición anterior se cancela. Así una respuesta lenta y antigua nunca pisa a una más nueva (*race condition*).
- **Tiempo límite de 10 segundos** por petición.
- **`debounce`** en el buscador para no lanzar una petición por cada letra.
- **Sin `innerHTML`.** Todo se inserta con `textContent`, así nada que llegue de la API se interpreta como HTML (previene XSS).
- **Datos validados al cargar.** Si `localStorage` está dañado o incompleto, se descartan los datos inválidos en vez de romper la página.
- **Zona horaria correcta.** Se pide `timezone=auto`, de modo que la hora y los días corresponden a la ciudad consultada y no al navegador del usuario.

## Cómo ejecutarlo

Como usa **módulos ES**, no funciona abriendo `index.html` con doble clic. Hay que servirlo desde un servidor local:

**Con Live Server (VS Code):** clic derecho en `index.html` → *Open with Live Server*.

**Con Python:**
```bash
python -m http.server 8000
```
y abre `http://localhost:8000`.

Necesita conexión a internet. No requiere instalar nada ni configurar claves.

> El botón **Mi ubicación** solo funciona en `localhost` o en `https` (por ejemplo, en GitHub Pages).

## Cómo publicarlo en GitHub Pages

1. Sube el proyecto a un repositorio nuevo (por ejemplo `api-clima`), con `index.html` en la raíz.
2. En GitHub, ve a **Settings → Pages**.
3. En *Build and deployment*, elige **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/ (root)`, y guarda.
5. Espera uno o dos minutos. El enlace aparece en esa misma pantalla.
6. Pégalo arriba, en la sección **Demo**.

## Capturas

1. Crea la carpeta `docs/` en el proyecto.
2. Toma una captura con el clima de una ciudad cargado y guárdala como `docs/captura.png`.
3. Para un GIF mostrando la búsqueda, puedes usar ScreenToGif (Windows) o Peek (Linux).

## Pruebas manuales

- [ ] Al abrir por primera vez se muestra el clima de Santiago.
- [ ] Escribir 2 o más letras muestra sugerencias; con 1 letra no.
- [ ] Elegir una sugerencia carga el clima de esa ciudad.
- [ ] Escribir un nombre y presionar Enter usa la primera coincidencia.
- [ ] Una ciudad inexistente muestra un aviso.
- [ ] El botón °C / °F cambia las temperaturas y se recuerda al recargar.
- [ ] Guardar una ciudad la agrega a favoritos; "✕" la quita.
- [ ] Al recargar, aparece la última ciudad consultada.
- [ ] Sin internet (modo avión) aparece un error con botón "Reintentar".
- [ ] "Mi ubicación" pide permiso y carga el clima.
- [ ] Las sugerencias se pueden recorrer con ↓ y ↑, y cerrar con Escape.

## Limitaciones

- La API gratuita de Open-Meteo es para uso **no comercial**.
- "Mi ubicación" muestra el nombre genérico "Mi ubicación", porque Open-Meteo no ofrece geocodificación inversa.
- El pronóstico es de 5 días y solo muestra datos diarios, sin detalle por horas.
- Los favoritos viven solo en el navegador y el dispositivo donde se guardaron.

## Ideas para seguir

- Pronóstico por horas con un gráfico dibujado en `canvas`.
- Índice UV, amanecer y atardecer.
- Alertas visuales según el tiempo (tormenta, calor extremo).
- Pruebas automáticas de `api.js` y `clima.js`.
- Convertir el proyecto en una PWA instalable.

## Créditos

Datos del tiempo por [Open-Meteo.com](https://open-meteo.com/), bajo licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).