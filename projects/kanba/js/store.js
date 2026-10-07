// ==========================================
// STORE: estado y reglas de negocio
// ==========================================

// Aquí vive la lista de tareas y todas las
// operaciones que la modifican. No toca el DOM.
//
// Modelo de una tarea:
//
// {
//   id: "texto único",
//   titulo: "Comprar leche",
//   descripcion: "Opcional",
//   prioridad: "baja" | "media" | "alta",
//   columna: "pendiente" | "en-curso" | "hecho",
//   creada: "2026-10-07T12:00:00.000Z"
// }
//
// El ORDEN de las tareas dentro del arreglo es el
// orden en que aparecen dentro de cada columna.

import { cargar, guardar } from "./storage.js";

export const COLUMNAS = [

  { id: "pendiente", nombre: "Pendiente" },
  { id: "en-curso", nombre: "En curso" },
  { id: "hecho", nombre: "Hecho" }

];

export const PRIORIDADES = ["baja", "media", "alta"];

const IDS_COLUMNAS = COLUMNAS.map((columna) => columna.id);

const MAX_TITULO = 80;
const MAX_DESCRIPCION = 300;


// ==========================================
// FUNCIONES INTERNAS
// ==========================================

function crearId() {

  // randomUUID solo existe en contextos seguros
  // (https o localhost), por eso hay un respaldo.

  return globalThis.crypto?.randomUUID?.()
    ?? `t-${Date.now()}-${Math.random().toString(16).slice(2)}`;

}

function esTareaValida(tarea) {

  return Boolean(tarea)
    && typeof tarea.id === "string"
    && typeof tarea.titulo === "string"
    && IDS_COLUMNAS.includes(tarea.columna)
    && PRIORIDADES.includes(tarea.prioridad);

}

function tareasIniciales() {

  const ahora = new Date().toISOString();

  return [

    {
      id: crearId(),
      titulo: "Bienvenido al tablero",
      descripcion: "Arrastra esta tarjeta a otra columna.",
      prioridad: "media",
      columna: "pendiente",
      creada: ahora
    },

    {
      id: crearId(),
      titulo: "Crear mi primera tarea",
      descripcion: "Usa el formulario de arriba.",
      prioridad: "alta",
      columna: "en-curso",
      creada: ahora
    },

    {
      id: crearId(),
      titulo: "Abrir el proyecto",
      descripcion: "",
      prioridad: "baja",
      columna: "hecho",
      creada: ahora
    }

  ];

}

// Valida y limpia los datos que vienen del formulario.
// Lanza un Error con un mensaje claro si algo falla.

function normalizar({ titulo, descripcion = "", prioridad = "media" }) {

  const tituloLimpio = String(titulo ?? "").trim();

  if (tituloLimpio === "") {

    throw new Error("El título es obligatorio.");

  }

  if (tituloLimpio.length > MAX_TITULO) {

    throw new Error(`El título no puede superar ${MAX_TITULO} caracteres.`);

  }

  return {

    titulo: tituloLimpio,
    descripcion: String(descripcion ?? "").trim().slice(0, MAX_DESCRIPCION),
    prioridad: PRIORIDADES.includes(prioridad) ? prioridad : "media"

  };

}


// ==========================================
// ESTADO
// ==========================================

// Si no hay nada guardado (primera visita)
// se cargan tareas de ejemplo.

let tareas = (cargar() ?? tareasIniciales()).filter(esTareaValida);

function persistir() {

  guardar(tareas);

}


// ==========================================
// API PÚBLICA
// ==========================================

export function obtenerTareas() {

  return [...tareas];

}

export function obtenerTarea(id) {

  return tareas.find((tarea) => tarea.id === id) ?? null;

}

export function crearTarea(datos) {

  const tarea = {

    id: crearId(),
    ...normalizar(datos),
    columna: "pendiente",
    creada: new Date().toISOString()

  };

  tareas.push(tarea);

  persistir();

  return tarea;

}

export function editarTarea(id, datos) {

  const tarea = obtenerTarea(id);

  if (!tarea) throw new Error("La tarea ya no existe.");

  Object.assign(tarea, normalizar(datos));

  persistir();

  return tarea;

}

export function eliminarTarea(id) {

  tareas = tareas.filter((tarea) => tarea.id !== id);

  persistir();

}

// Mueve una tarea a una columna.
// Si se indica antesDeId, queda justo antes de esa
// tarea; si no, queda al final de la columna.

export function moverTarea(id, columna, antesDeId = null) {

  const indice = tareas.findIndex((tarea) => tarea.id === id);

  if (indice === -1 || !IDS_COLUMNAS.includes(columna)) return false;

  const [tarea] = tareas.splice(indice, 1);

  tarea.columna = columna;

  const destino = antesDeId
    ? tareas.findIndex((otra) => otra.id === antesDeId)
    : -1;

  if (destino === -1) {

    tareas.push(tarea);

  } else {

    tareas.splice(destino, 0, tarea);

  }

  persistir();

  return true;

}

// Mueve una tarea a la columna de al lado.
// direccion: -1 (izquierda) o 1 (derecha)

export function desplazarTarea(id, direccion) {

  const tarea = obtenerTarea(id);

  if (!tarea) return false;

  const actual = IDS_COLUMNAS.indexOf(tarea.columna);

  const nueva = actual + direccion;

  if (nueva < 0 || nueva >= IDS_COLUMNAS.length) return false;

  return moverTarea(id, IDS_COLUMNAS[nueva]);

}

export function limpiarHechas() {

  tareas = tareas.filter((tarea) => tarea.columna !== "hecho");

  persistir();

}