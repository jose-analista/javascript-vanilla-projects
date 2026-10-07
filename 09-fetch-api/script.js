// ==========================================
// FETCH API EN JAVASCRIPT
// ==========================================

// fetch() sirve para pedir datos a una URL.
// Devuelve una PROMESA: un valor que estará
// disponible más tarde, cuando llegue la
// respuesta.
//
// Hay dos formas de usarla:
//
// 1. .then() / .catch()
// 2. async / await  (la más clara y la más usada)
//
// Pasos habituales:
//
// 1. const respuesta = await fetch(url);
// 2. Revisar respuesta.ok  (¿código 200-299?)
// 3. const datos = await respuesta.json();

const URL_BASE = "https://jsonplaceholder.typicode.com";


// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

// Muestra un mensaje en un elemento de estado.
// tipo: "" | "ok" | "error"

function mostrarEstado(elemento, mensaje, tipo = "") {

  elemento.textContent = mensaje;

  elemento.className = `estado ${tipo}`.trim();

}

// Crea una tarjeta usando textContent.
// Así el texto que viene de la API nunca
// se interpreta como HTML (evita inyección).

function crearTarjeta(titulo, descripcion, etiqueta, hecha = false) {

  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";

  const h3 = document.createElement("h3");
  h3.textContent = titulo;

  const p = document.createElement("p");
  p.textContent = descripcion;

  tarjeta.append(h3, p);

  if (etiqueta) {

    const span = document.createElement("span");
    span.className = hecha ? "etiqueta hecha" : "etiqueta";
    span.textContent = etiqueta;

    tarjeta.append(span);

  }

  return tarjeta;

}

// Función reutilizable para pedir JSON.
// Lanza un Error si el servidor responde 4xx / 5xx.
// (fetch NO lanza error con un 404: hay que revisar ok)

async function pedirJSON(ruta, opciones = {}) {

  const respuesta = await fetch(`${URL_BASE}${ruta}`, opciones);

  if (!respuesta.ok) {

    throw new Error(`Error HTTP ${respuesta.status}`);

  }

  return respuesta.json();

}


// ==========================================
// 1. GET BÁSICO
// ==========================================

const btnUnaTarea = document.querySelector("#btnUnaTarea");
const estadoUna = document.querySelector("#estadoUna");

// Versión con .then() y .catch()

btnUnaTarea.addEventListener("click", () => {

  mostrarEstado(estadoUna, "Cargando...");

  fetch(`${URL_BASE}/todos/1`)

    .then((respuesta) => respuesta.json())

    .then((tarea) => {

      mostrarEstado(
        estadoUna,
        JSON.stringify(tarea, null, 2),
        "ok"
      );

    })

    .catch((error) => {

      mostrarEstado(estadoUna, `Error: ${error.message}`, "error");

    });

});


// ==========================================
// 2. LISTA DE USUARIOS (ASYNC / AWAIT)
// ==========================================

const btnUsuarios = document.querySelector("#btnUsuarios");
const estadoUsuarios = document.querySelector("#estadoUsuarios");
const tarjetasUsuarios = document.querySelector("#tarjetasUsuarios");

async function cargarUsuarios() {

  // Estado de carga: botón bloqueado y mensaje

  btnUsuarios.disabled = true;

  mostrarEstado(estadoUsuarios, "Cargando usuarios...");

  tarjetasUsuarios.replaceChildren();

  try {

    const usuarios = await pedirJSON("/users");

    for (const usuario of usuarios) {

      tarjetasUsuarios.append(

        crearTarjeta(
          usuario.name,
          usuario.email,
          usuario.address.city
        )

      );

    }

    mostrarEstado(
      estadoUsuarios,
      `${usuarios.length} usuarios cargados.`,
      "ok"
    );

  } catch (error) {

    mostrarEstado(estadoUsuarios, `Error: ${error.message}`, "error");

  } finally {

    // finally se ejecuta siempre, haya error o no

    btnUsuarios.disabled = false;

  }

}

btnUsuarios.addEventListener("click", cargarUsuarios);


// ==========================================
// 3. PARÁMETROS EN LA URL
// ==========================================

// URLSearchParams arma la parte ?clave=valor
// y se encarga de codificar los caracteres.

const selectUsuario = document.querySelector("#selectUsuario");
const selectEstado = document.querySelector("#selectEstado");
const btnTareas = document.querySelector("#btnTareas");
const estadoTareas = document.querySelector("#estadoTareas");
const tarjetasTareas = document.querySelector("#tarjetasTareas");

async function buscarTareas() {

  const parametros = new URLSearchParams({

    userId: selectUsuario.value

  });

  // Solo se agrega "completed" si se eligió un filtro

  if (selectEstado.value !== "") {

    parametros.set("completed", selectEstado.value);

  }

  btnTareas.disabled = true;

  mostrarEstado(estadoTareas, "Buscando...");

  tarjetasTareas.replaceChildren();

  try {

    const tareas = await pedirJSON(`/todos?${parametros}`);

    if (tareas.length === 0) {

      mostrarEstado(estadoTareas, "No hay resultados.");

      return;

    }

    for (const tarea of tareas) {

      tarjetasTareas.append(

        crearTarjeta(
          tarea.title,
          `Tarea #${tarea.id}`,
          tarea.completed ? "Completada" : "Pendiente",
          tarea.completed
        )

      );

    }

    mostrarEstado(
      estadoTareas,
      `${tareas.length} tareas (?${parametros})`,
      "ok"
    );

  } catch (error) {

    mostrarEstado(estadoTareas, `Error: ${error.message}`, "error");

  } finally {

    btnTareas.disabled = false;

  }

}

btnTareas.addEventListener("click", buscarTareas);


// ==========================================
// 4. POST: ENVIAR DATOS
// ==========================================

// Para enviar datos se necesita:
//
// method  → "POST"
// headers → indica que el cuerpo es JSON
// body    → los datos convertidos a texto
//           con JSON.stringify()
//
// JSONPlaceholder simula el envío: responde
// con los datos y un id, pero no los guarda.

const formPost = document.querySelector("#formPost");
const btnEnviar = document.querySelector("#btnEnviar");
const estadoPost = document.querySelector("#estadoPost");

formPost.addEventListener("submit", async (event) => {

  event.preventDefault();

  const nuevoPost = {

    title: document.querySelector("#tituloPost").value.trim(),
    body: document.querySelector("#cuerpoPost").value.trim(),
    userId: 1

  };

  btnEnviar.disabled = true;

  mostrarEstado(estadoPost, "Enviando...");

  try {

    const creado = await pedirJSON("/posts", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(nuevoPost)

    });

    mostrarEstado(
      estadoPost,
      "Respuesta del servidor:\n" + JSON.stringify(creado, null, 2),
      "ok"
    );

    formPost.reset();

  } catch (error) {

    mostrarEstado(estadoPost, `Error: ${error.message}`, "error");

  } finally {

    btnEnviar.disabled = false;

  }

});


// ==========================================
// 5. PROMISE.ALL: PETICIONES EN PARALELO
// ==========================================

// Si las peticiones no dependen entre sí,
// es más rápido lanzarlas todas a la vez
// que esperar una por una.
//
// Promise.all espera a que TODAS terminen.
// Si una falla, falla el conjunto.

const btnResumen = document.querySelector("#btnResumen");
const estadoResumen = document.querySelector("#estadoResumen");

btnResumen.addEventListener("click", async () => {

  btnResumen.disabled = true;

  mostrarEstado(estadoResumen, "Cargando resumen...");

  const inicio = performance.now();

  try {

    const [usuarios, posts, tareas] = await Promise.all([

      pedirJSON("/users"),
      pedirJSON("/posts"),
      pedirJSON("/todos")

    ]);

    const completadas = tareas.filter((t) => t.completed).length;

    const milisegundos = Math.round(performance.now() - inicio);

    mostrarEstado(
      estadoResumen,
      `Usuarios: ${usuarios.length}\n` +
      `Publicaciones: ${posts.length}\n` +
      `Tareas: ${tareas.length} (${completadas} completadas)\n` +
      `Tiempo total: ${milisegundos} ms`,
      "ok"
    );

  } catch (error) {

    mostrarEstado(estadoResumen, `Error: ${error.message}`, "error");

  } finally {

    btnResumen.disabled = false;

  }

});


// ==========================================
// 6. ERRORES Y CANCELACIÓN
// ==========================================

// Hay tres tipos de problemas:
//
// 1. El servidor responde con error (404, 500)
//    → fetch NO falla; respuesta.ok es false.
//
// 2. No hay conexión o el dominio no existe
//    → fetch falla con un TypeError.
//
// 3. Se cancela o se agota el tiempo
//    → con AbortController, el error se
//      llama AbortError.

const estadoErrores = document.querySelector("#estadoErrores");

// 6.1 Ruta inexistente

document.querySelector("#btnError404").addEventListener("click", async () => {

  mostrarEstado(estadoErrores, "Pidiendo ruta inexistente...");

  try {

    await pedirJSON("/ruta-que-no-existe");

  } catch (error) {

    mostrarEstado(estadoErrores, `Capturado: ${error.message}`, "error");

  }

});

// 6.2 Dominio inválido (error de red)

document.querySelector("#btnRed").addEventListener("click", async () => {

  mostrarEstado(estadoErrores, "Pidiendo dominio inválido...");

  try {

    await fetch("https://dominio-que-no-existe.invalid/datos");

  } catch (error) {

    mostrarEstado(
      estadoErrores,
      `Error de red (${error.name}): no se pudo conectar.`,
      "error"
    );

  }

});

// 6.3 Timeout con AbortController
//
// Se crea un controlador, se pasa su signal a
// fetch y se llama a abort() cuando pase el
// tiempo límite.

async function pedirConTimeout(ruta, milisegundos) {

  const controlador = new AbortController();

  const temporizador = setTimeout(
    () => controlador.abort(),
    milisegundos
  );

  try {

    return await pedirJSON(ruta, { signal: controlador.signal });

  } finally {

    clearTimeout(temporizador);

  }

}

document.querySelector("#btnCancelar").addEventListener("click", async () => {

  mostrarEstado(estadoErrores, "Pidiendo con timeout de 1 ms...");

  try {

    await pedirConTimeout("/todos", 1);

    mostrarEstado(estadoErrores, "La petición fue más rápida que 1 ms.", "ok");

  } catch (error) {

    if (error.name === "AbortError") {

      mostrarEstado(
        estadoErrores,
        "Petición cancelada: se agotó el tiempo.",
        "error"
      );

    } else {

      mostrarEstado(estadoErrores, `Error: ${error.message}`, "error");

    }

  }

});


// ==========================================
// RESUMEN
// ==========================================

// fetch(url)                → pide datos (GET por defecto)
// await respuesta.json()    → convierte el JSON a objeto
// respuesta.ok              → ¿el código fue 200-299?
// try / catch / finally     → manejar errores y limpiar
// method + headers + body   → enviar datos (POST)
// URLSearchParams           → armar ?clave=valor
// Promise.all([...])        → varias peticiones a la vez
// AbortController           → cancelar o poner timeout