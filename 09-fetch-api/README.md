# 09 - Fetch API

Ejercicio práctico de JavaScript para aprender a **consumir una API** desde el navegador usando `fetch()`. La página reúne varias demos, cada una con su propio botón, que muestran desde una petición simple hasta el manejo de errores y la cancelación de peticiones.

## Qué se aprende

- Hacer peticiones **GET** y **POST** con `fetch()`.
- Usar promesas con `.then()` / `.catch()` y con `async` / `await`.
- Revisar `respuesta.ok` y manejar errores con `try` / `catch` / `finally`.
- Armar parámetros de URL con `URLSearchParams`.
- Enviar datos en formato JSON.
- Lanzar varias peticiones en paralelo con `Promise.all`.
- Poner un tiempo límite y cancelar peticiones con `AbortController`.
- Mostrar datos en pantalla de forma segura, sin usar `innerHTML`.

## Estructura

```
09-fetch-api/
├── index.html   → estructura de la página y estilos
├── script.js    → toda la lógica de las peticiones
└── README.md    → este archivo
```

## API utilizada

Se usa [JSONPlaceholder](https://jsonplaceholder.typicode.com), una API pública de prueba:

- No necesita registro ni clave.
- Devuelve datos **falsos** (usuarios, publicaciones, tareas).
- Las peticiones POST se **simulan**: la API responde con los datos enviados y un `id`, pero no guarda nada.

| Recurso | Ruta | Descripción |
|---|---|---|
| Usuarios | `/users` | 10 usuarios de ejemplo |
| Publicaciones | `/posts` | 100 publicaciones |
| Tareas | `/todos` | 200 tareas |

## Cómo ejecutarlo

1. Descarga o clona el repositorio.
2. Abre `index.html` en el navegador, o usa la extensión **Live Server** de VS Code.
3. Necesitas conexión a internet.

No requiere instalar nada ni usar un servidor propio.

> Las peticiones **no se hacen al abrir la página**: cada una se lanza al hacer clic en su botón.

## Las demos

| # | Demo | Qué muestra |
|---|---|---|
| 1 | GET básico | Una tarea con `.then()` y `.catch()` |
| 2 | Lista de usuarios | `async` / `await`, estado de carga y tarjetas |
| 3 | Tareas filtradas | Parámetros en la URL con `URLSearchParams` |
| 4 | Enviar datos | POST con formulario, headers y `JSON.stringify` |
| 5 | Resumen | Tres peticiones a la vez con `Promise.all` |
| 6 | Errores | Ruta 404, error de red y timeout |

## Conceptos clave

### Petición básica

```js
const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const tarea = await respuesta.json();
```

`fetch()` devuelve una **promesa**. Con `await` se espera el resultado, y `.json()` convierte el texto JSON en un objeto de JavaScript.

### `fetch` no falla con un 404

Si el servidor responde con un error (404, 500), `fetch` **no lanza una excepción**. Solo falla cuando no hay conexión. Por eso se revisa `respuesta.ok`:

```js
async function pedirJSON(ruta, opciones = {}) {
  const respuesta = await fetch(`${URL_BASE}${ruta}`, opciones);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`);
  }

  return respuesta.json();
}
```

Esta función se reutiliza en todas las demos.

### Estructura `try` / `catch` / `finally`

```js
btn.disabled = true;

try {
  const datos = await pedirJSON("/users");
  // mostrar datos
} catch (error) {
  // mostrar el error
} finally {
  btn.disabled = false; // se ejecuta siempre
}
```

### Parámetros en la URL

```js
const parametros = new URLSearchParams({ userId: 1, completed: "false" });

await pedirJSON(`/todos?${parametros}`);
// → /todos?userId=1&completed=false
```

### Enviar datos con POST

```js
await pedirJSON("/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hola", body: "Mundo", userId: 1 })
});
```

Se necesitan tres cosas: el método, el header que indica que el cuerpo es JSON y el cuerpo convertido a texto.

### Peticiones en paralelo

```js
const [usuarios, posts, tareas] = await Promise.all([
  pedirJSON("/users"),
  pedirJSON("/posts"),
  pedirJSON("/todos")
]);
```

Es más rápido que esperar una por una, siempre que no dependan entre sí. Si una falla, falla el conjunto.

### Timeout con `AbortController`

```js
const controlador = new AbortController();
const temporizador = setTimeout(() => controlador.abort(), 1000);

try {
  await pedirJSON("/todos", { signal: controlador.signal });
} catch (error) {
  if (error.name === "AbortError") {
    // se agotó el tiempo
  }
} finally {
  clearTimeout(temporizador);
}
```

### Mostrar datos de forma segura

Las tarjetas se crean con `createElement` y `textContent`, no con `innerHTML`. Así, el texto que llega de una API nunca se interpreta como HTML, lo que evita ataques de inyección (XSS).

## Tipos de errores

| Situación | Qué ocurre | Cómo se detecta |
|---|---|---|
| El servidor responde 404 o 500 | `fetch` no falla | `respuesta.ok` es `false` |
| No hay internet o el dominio no existe | `fetch` falla | `TypeError` en el `catch` |
| Se agota el tiempo o se cancela | `fetch` falla | `error.name === "AbortError"` |

## Cómo comprobar que funciona

1. Abre la página y presiona **F12**.
2. Entra a la pestaña **Network** (Red).
3. Haz clic en **Cargar usuarios**.
4. Aparece una línea `users` con estado `200`. Al abrirla puedes ver la respuesta JSON.

Si algo falla, revisa la pestaña **Console**.

## Limitaciones

- La API es de prueba: los datos son falsos y el POST no guarda nada.
- Si pruebas el proyecto sin conexión, todas las demos mostrarán un error de red.
- No hay paginación: se cargan todos los resultados de una vez.

## Ideas para seguir

- Cambiar JSONPlaceholder por una API real, como una de clima, países o Pokémon.
- Agregar un buscador que filtre los usuarios por nombre.
- Guardar los datos descargados en `localStorage`.
- Mostrar un indicador de carga animado en vez de texto.
- Si la API pide clave, no escribirla en el código: usar un servidor intermedio o variables de entorno.