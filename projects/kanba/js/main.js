// ==========================================
// MAIN: conecta eventos, estado e interfaz
// ==========================================

import * as store from "./store.js";
import { construirTablero, renderizar } from "./ui.js";


// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const tablero = document.querySelector("#tablero");
const formNueva = document.querySelector("#formNueva");
const mensaje = document.querySelector("#mensaje");
const buscar = document.querySelector("#buscar");
const filtroPrioridad = document.querySelector("#filtroPrioridad");

const dialogo = document.querySelector("#dialogoEditar");
const formEditar = document.querySelector("#formEditar");
const mensajeEditar = document.querySelector("#mensajeEditar");
const btnCancelarEdicion = document.querySelector("#btnCancelarEdicion");

let idEditando = null;
let idArrastrado = null;
let temporizadorMensaje = null;


// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

function pintar() {

  renderizar(store.obtenerTareas(), {

    texto: buscar.value,
    prioridad: filtroPrioridad.value

  });

}

function avisar(texto, tipo = "") {

  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`.trim();

  clearTimeout(temporizadorMensaje);

  temporizadorMensaje = setTimeout(() => {

    mensaje.textContent = "";

  }, 3000);

}


// ==========================================
// CREAR TAREAS
// ==========================================

formNueva.addEventListener("submit", (event) => {

  event.preventDefault();

  const datos = Object.fromEntries(new FormData(formNueva));

  try {

    store.crearTarea(datos);

    formNueva.reset();

    avisar("Tarea creada.", "ok");

    pintar();

    formNueva.elements.titulo.focus();

  } catch (error) {

    avisar(error.message, "error");

  }

});


// ==========================================
// FILTROS
// ==========================================

buscar.addEventListener("input", pintar);

filtroPrioridad.addEventListener("change", pintar);


// ==========================================
// ACCIONES DE LAS TARJETAS (DELEGACIÓN)
// ==========================================

// Un solo escuchador en el tablero atiende todos
// los botones, incluso los de tarjetas nuevas.

tablero.addEventListener("click", (event) => {

  const boton = event.target.closest("button[data-accion]");

  if (!boton) return;

  const id = boton.closest(".tarjeta")?.dataset.id;

  switch (boton.dataset.accion) {

    case "izquierda":

      store.desplazarTarea(id, -1);

      break;

    case "derecha":

      store.desplazarTarea(id, 1);

      break;

    case "editar":

      abrirEdicion(id);

      return;

    case "eliminar":

      if (!confirm("¿Eliminar esta tarea?")) return;

      store.eliminarTarea(id);

      break;

    case "limpiar-hechas":

      if (!confirm("¿Eliminar todas las tareas hechas?")) return;

      store.limpiarHechas();

      break;

    default:

      return;

  }

  pintar();

});


// ==========================================
// EDITAR TAREAS
// ==========================================

function abrirEdicion(id) {

  const tarea = store.obtenerTarea(id);

  if (!tarea) return;

  idEditando = id;

  formEditar.elements.titulo.value = tarea.titulo;
  formEditar.elements.descripcion.value = tarea.descripcion ?? "";
  formEditar.elements.prioridad.value = tarea.prioridad;

  mensajeEditar.textContent = "";

  dialogo.showModal();

}

formEditar.addEventListener("submit", (event) => {

  event.preventDefault();

  const datos = Object.fromEntries(new FormData(formEditar));

  try {

    store.editarTarea(idEditando, datos);

    dialogo.close();

    pintar();

  } catch (error) {

    mensajeEditar.textContent = error.message;

  }

});

btnCancelarEdicion.addEventListener("click", () => dialogo.close());


// ==========================================
// ARRASTRAR Y SOLTAR (DRAG & DROP)
// ==========================================

// Devuelve la tarjeta ANTES de la cual hay que
// insertar lo que se suelta, según la posición
// vertical del mouse. Si no hay ninguna, devuelve
// null y la tarea queda al final de la columna.

function tarjetaSiguiente(lista, posicionY) {

  const tarjetas = [

    ...lista.querySelectorAll(".tarjeta:not(.arrastrando)")

  ];

  return tarjetas.find((tarjeta) => {

    const caja = tarjeta.getBoundingClientRect();

    return posicionY < caja.top + caja.height / 2;

  }) ?? null;

}

function limpiarResaltado() {

  document
    .querySelectorAll(".lista.sobre")
    .forEach((lista) => lista.classList.remove("sobre"));

}

tablero.addEventListener("dragstart", (event) => {

  const tarjeta = event.target instanceof Element
    ? event.target.closest(".tarjeta")
    : null;

  if (!tarjeta) return;

  idArrastrado = tarjeta.dataset.id;

  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", idArrastrado);

  // Se marca después, para que el "fantasma" que
  // dibuja el navegador no salga semitransparente.

  requestAnimationFrame(() => tarjeta.classList.add("arrastrando"));

});

tablero.addEventListener("dragend", () => {

  idArrastrado = null;

  limpiarResaltado();

  document
    .querySelectorAll(".tarjeta.arrastrando")
    .forEach((tarjeta) => tarjeta.classList.remove("arrastrando"));

});

tablero.addEventListener("dragover", (event) => {

  const lista = event.target.closest(".lista");

  if (!lista || !idArrastrado) return;

  // Sin preventDefault el navegador no permite soltar.

  event.preventDefault();

  event.dataTransfer.dropEffect = "move";

  limpiarResaltado();

  lista.classList.add("sobre");

});

tablero.addEventListener("dragleave", (event) => {

  const lista = event.target.closest(".lista");

  if (lista && !lista.contains(event.relatedTarget)) {

    lista.classList.remove("sobre");

  }

});

tablero.addEventListener("drop", (event) => {

  const lista = event.target.closest(".lista");

  if (!lista || !idArrastrado) return;

  event.preventDefault();

  const siguiente = tarjetaSiguiente(lista, event.clientY);

  store.moverTarea(
    idArrastrado,
    lista.dataset.columna,
    siguiente?.dataset.id ?? null
  );

  idArrastrado = null;

  limpiarResaltado();

  pintar();

});


// ==========================================
// INICIO
// ==========================================

construirTablero(tablero);

pintar();