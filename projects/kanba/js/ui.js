// ==========================================
// UI: dibuja el tablero en el DOM
// ==========================================

// Este módulo solo crea y actualiza elementos.
// No guarda datos ni decide reglas de negocio.
//
// Todo el texto se inserta con textContent (nunca
// con innerHTML), así lo que escriba el usuario
// jamás se interpreta como HTML.

import { COLUMNAS } from "./store.js";

const ETIQUETAS_PRIORIDAD = {

  baja: "Baja",
  media: "Media",
  alta: "Alta"

};


// ==========================================
// ELEMENTOS AUXILIARES
// ==========================================

function crearElemento(etiqueta, clase, texto) {

  const elemento = document.createElement(etiqueta);

  if (clase) elemento.className = clase;

  if (texto !== undefined) elemento.textContent = texto;

  return elemento;

}

function crearBoton({ texto, accion, aria, deshabilitado = false }) {

  const boton = crearElemento("button", "btn", texto);

  boton.type = "button";
  boton.dataset.accion = accion;
  boton.setAttribute("aria-label", aria);
  boton.title = aria;
  boton.disabled = deshabilitado;

  return boton;

}


// ==========================================
// TARJETA
// ==========================================

function crearTarjeta(tarea) {

  const indiceColumna = COLUMNAS.findIndex(
    (columna) => columna.id === tarea.columna
  );

  const tarjeta = crearElemento(
    "article",
    `tarjeta prioridad-${tarea.prioridad}`
  );

  tarjeta.draggable = true;
  tarjeta.dataset.id = tarea.id;

  tarjeta.append(

    crearElemento(
      "span",
      `etiqueta prioridad-${tarea.prioridad}`,
      ETIQUETAS_PRIORIDAD[tarea.prioridad]
    ),

    crearElemento("h3", "", tarea.titulo)

  );

  if (tarea.descripcion) {

    tarjeta.append(crearElemento("p", "", tarea.descripcion));

  }

  const acciones = crearElemento("div", "tarjeta-acciones");

  acciones.append(

    crearBoton({
      texto: "◀",
      accion: "izquierda",
      aria: "Mover a la columna anterior",
      deshabilitado: indiceColumna === 0
    }),

    crearBoton({
      texto: "▶",
      accion: "derecha",
      aria: "Mover a la columna siguiente",
      deshabilitado: indiceColumna === COLUMNAS.length - 1
    }),

    crearElemento("span", "separador"),

    crearBoton({ texto: "✎", accion: "editar", aria: "Editar tarea" }),

    crearBoton({ texto: "✕", accion: "eliminar", aria: "Eliminar tarea" })

  );

  tarjeta.append(acciones);

  return tarjeta;

}


// ==========================================
// TABLERO
// ==========================================

// Crea las columnas una sola vez, a partir de
// COLUMNAS. Así la definición de las columnas
// vive en un único lugar.

export function construirTablero(contenedor) {

  for (const columna of COLUMNAS) {

    const seccion = crearElemento("section", "columna");

    seccion.setAttribute("aria-labelledby", `titulo-${columna.id}`);

    const cabecera = crearElemento("div", "columna-cabecera");

    const titulo = crearElemento("h2", "columna-titulo");

    const nombre = crearElemento("span", "", columna.nombre);
    nombre.id = `titulo-${columna.id}`;

    const contador = crearElemento("span", "contador", "0");
    contador.id = `contador-${columna.id}`;

    titulo.append(nombre, contador);

    cabecera.append(titulo);

    if (columna.id === "hecho") {

      const limpiar = crearElemento("button", "btn btn-pequeno", "Limpiar");

      limpiar.type = "button";
      limpiar.dataset.accion = "limpiar-hechas";
      limpiar.title = "Eliminar todas las tareas hechas";

      cabecera.append(limpiar);

    }

    const lista = crearElemento("div", "lista");

    lista.id = `lista-${columna.id}`;
    lista.dataset.columna = columna.id;

    seccion.append(cabecera, lista);

    contenedor.append(seccion);

  }

}

function coincide(tarea, filtro) {

  const texto = (filtro.texto ?? "").trim().toLowerCase();

  if (filtro.prioridad && tarea.prioridad !== filtro.prioridad) {

    return false;

  }

  if (texto === "") return true;

  return `${tarea.titulo} ${tarea.descripcion ?? ""}`
    .toLowerCase()
    .includes(texto);

}

// Vuelve a dibujar las tarjetas de cada columna.
// filtro: { texto, prioridad }

export function renderizar(tareas, filtro = {}) {

  const visibles = tareas.filter((tarea) => coincide(tarea, filtro));

  for (const columna of COLUMNAS) {

    const lista = document.querySelector(`#lista-${columna.id}`);

    const contador = document.querySelector(`#contador-${columna.id}`);

    const deLaColumna = visibles.filter(
      (tarea) => tarea.columna === columna.id
    );

    contador.textContent = String(deLaColumna.length);

    if (deLaColumna.length === 0) {

      lista.replaceChildren(crearElemento("p", "vacio", "Sin tareas"));

    } else {

      lista.replaceChildren(...deLaColumna.map(crearTarjeta));

    }

  }

}