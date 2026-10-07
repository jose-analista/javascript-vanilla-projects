// ==========================================
// MAIN: conecta eventos, datos e interfaz
// ==========================================

import { ErrorApi, buscarCiudades, obtenerClima } from "./api.js";
import { debounce, idLugar } from "./clima.js";
import {

  cargarFavoritos,
  cargarUltima,
  cargarUnidad,
  guardarFavoritos,
  guardarUltima,
  guardarUnidad

} from "./storage.js";
import * as ui from "./ui.js";


// ==========================================
// CONFIGURACIÓN Y ESTADO
// ==========================================

const MAX_FAVORITOS = 8;

const ESPERA_BUSQUEDA_MS = 350;

// Ciudad que se muestra la primera vez.

const LUGAR_INICIAL = {

  nombre: "Santiago",
  region: "Región Metropolitana",
  pais: "Chile",
  latitud: -33.45694,
  longitud: -70.64827

};

const estado = {

  lugar: null,
  datos: null,
  unidad: cargarUnidad(),
  favoritos: cargarFavoritos(),
  sugerencias: [],
  controladorClima: null,
  controladorBusqueda: null

};


// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const formBusqueda = document.querySelector("#formBusqueda");
const inputCiudad = document.querySelector("#inputCiudad");
const listaSugerencias = document.querySelector("#sugerencias");
const btnUbicacion = document.querySelector("#btnUbicacion");
const btnUnidad = document.querySelector("#btnUnidad");
const contenedorFavoritos = document.querySelector("#favoritos");
const contenedorClima = document.querySelector("#clima");
const contenedorEstado = document.querySelector("#estado");


// ==========================================
// CARGAR EL CLIMA
// ==========================================

function esFavorito(lugar) {

  return estado.favoritos.some((fav) => idLugar(fav) === idLugar(lugar));

}

function pintarClima() {

  ui.mostrarClima({

    lugar: estado.lugar,
    datos: estado.datos,
    esFavorito: esFavorito(estado.lugar)

  });

}

async function cargarClima(lugar) {

  // Si había una petición en curso, se cancela:
  // así una respuesta lenta y antigua nunca pisa
  // a una más nueva.

  estado.controladorClima?.abort();

  estado.controladorClima = new AbortController();

  const { signal } = estado.controladorClima;

  estado.lugar = lugar;

  ui.mostrarCargando();

  try {

    estado.datos = await obtenerClima(lugar, estado.unidad, signal);

    guardarUltima(lugar);

    pintarClima();

  } catch (error) {

    // Una petición cancelada a propósito no es un error.

    if (error instanceof ErrorApi && error.tipo === "cancelada") return;

    ui.mostrarError(
      error instanceof ErrorApi
        ? error.message
        : "Ocurrió un error inesperado."
    );

    console.error(error);

  }

}


// ==========================================
// BÚSQUEDA DE CIUDADES
// ==========================================

const buscarSugerencias = debounce(async (texto) => {

  if (texto.trim().length < 2) {

    ui.ocultarSugerencias();

    return;

  }

  estado.controladorBusqueda = new AbortController();

  try {

    estado.sugerencias = await buscarCiudades(
      texto,
      estado.controladorBusqueda.signal
    );

    ui.mostrarSugerencias(estado.sugerencias);

  } catch (error) {

    if (error instanceof ErrorApi && error.tipo === "cancelada") return;

    ui.mostrarMensajeSugerencias(
      error instanceof ErrorApi ? error.message : "No se pudo buscar."
    );

  }

}, ESPERA_BUSQUEDA_MS);

inputCiudad.addEventListener("input", () => {

  // Se cancela de inmediato la búsqueda anterior
  // (el debounce solo retrasa la nueva).

  estado.controladorBusqueda?.abort();

  buscarSugerencias(inputCiudad.value);

});

function elegirCiudad(ciudad) {

  inputCiudad.value = ciudad.nombre;

  ui.ocultarSugerencias();

  cargarClima(ciudad);

}

listaSugerencias.addEventListener("click", (event) => {

  const boton = event.target.closest("button[data-indice]");

  if (!boton) return;

  elegirCiudad(estado.sugerencias[Number(boton.dataset.indice)]);

});

// Enter en el campo: se usa la primera coincidencia.

formBusqueda.addEventListener("submit", async (event) => {

  event.preventDefault();

  const texto = inputCiudad.value.trim();

  if (texto.length < 2) {

    ui.avisar("Escribe al menos 2 letras.");

    return;

  }

  estado.controladorBusqueda?.abort();

  estado.controladorBusqueda = new AbortController();

  try {

    const ciudades = await buscarCiudades(
      texto,
      estado.controladorBusqueda.signal
    );

    if (ciudades.length === 0) {

      ui.avisar(`No se encontró "${texto}".`);

      return;

    }

    elegirCiudad(ciudades[0]);

  } catch (error) {

    if (error instanceof ErrorApi && error.tipo === "cancelada") return;

    ui.avisar(
      error instanceof ErrorApi ? error.message : "No se pudo buscar."
    );

  }

});

// Teclado: Escape cierra la lista y ↓ pasa a la primera opción.

inputCiudad.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    ui.ocultarSugerencias();

  } else if (event.key === "ArrowDown") {

    listaSugerencias.querySelector("button")?.focus();

    event.preventDefault();

  }

});

listaSugerencias.addEventListener("keydown", (event) => {

  const botones = [...listaSugerencias.querySelectorAll("button")];

  const indice = botones.indexOf(document.activeElement);

  if (event.key === "ArrowDown") {

    botones[Math.min(indice + 1, botones.length - 1)]?.focus();

    event.preventDefault();

  } else if (event.key === "ArrowUp") {

    if (indice <= 0) inputCiudad.focus();
    else botones[indice - 1].focus();

    event.preventDefault();

  } else if (event.key === "Escape") {

    ui.ocultarSugerencias();

    inputCiudad.focus();

  }

});

// Clic fuera: se cierra la lista.

document.addEventListener("click", (event) => {

  if (!event.target.closest(".campo-busqueda")) ui.ocultarSugerencias();

});


// ==========================================
// UBICACIÓN DEL USUARIO
// ==========================================

const ERRORES_UBICACION = {

  1: "Permiso de ubicación denegado.",
  2: "No se pudo determinar tu ubicación.",
  3: "Se agotó el tiempo al obtener tu ubicación."

};

btnUbicacion.addEventListener("click", () => {

  if (!navigator.geolocation) {

    ui.avisar("Tu navegador no permite obtener la ubicación.");

    return;

  }

  ui.avisar("Obteniendo tu ubicación...");

  navigator.geolocation.getCurrentPosition(

    (posicion) => {

      cargarClima({

        nombre: "Mi ubicación",
        region: "",
        pais: "",
        latitud: posicion.coords.latitude,
        longitud: posicion.coords.longitude

      });

    },

    (error) => {

      ui.avisar(
        ERRORES_UBICACION[error.code] ?? "No se pudo obtener la ubicación."
      );

    },

    { timeout: 10000 }

  );

});


// ==========================================
// UNIDAD DE TEMPERATURA
// ==========================================

btnUnidad.addEventListener("click", () => {

  estado.unidad = estado.unidad === "C" ? "F" : "C";

  guardarUnidad(estado.unidad);

  ui.mostrarUnidad(estado.unidad);

  // Los valores vienen ya convertidos desde la API,
  // así que hay que volver a pedirlos.

  if (estado.lugar) cargarClima(estado.lugar);

});


// ==========================================
// FAVORITOS
// ==========================================

function alternarFavorito() {

  const lugar = estado.lugar;

  if (!lugar) return;

  if (esFavorito(lugar)) {

    estado.favoritos = estado.favoritos.filter(
      (fav) => idLugar(fav) !== idLugar(lugar)
    );

  } else {

    if (estado.favoritos.length >= MAX_FAVORITOS) {

      ui.avisar(`Máximo ${MAX_FAVORITOS} favoritos. Quita alguno primero.`);

      return;

    }

    estado.favoritos.push(lugar);

  }

  guardarFavoritos(estado.favoritos);

  ui.mostrarFavoritos(estado.favoritos);

  pintarClima();

}

contenedorClima.addEventListener("click", (event) => {

  if (event.target.closest("button[data-accion='favorito']")) {

    alternarFavorito();

  }

});

contenedorFavoritos.addEventListener("click", (event) => {

  const boton = event.target.closest("button[data-accion]");

  if (!boton) return;

  const lugar = estado.favoritos.find(
    (fav) => idLugar(fav) === boton.dataset.id
  );

  if (!lugar) return;

  if (boton.dataset.accion === "abrir") {

    cargarClima(lugar);

  } else if (boton.dataset.accion === "quitar") {

    estado.favoritos = estado.favoritos.filter((fav) => fav !== lugar);

    guardarFavoritos(estado.favoritos);

    ui.mostrarFavoritos(estado.favoritos);

    // Si la ciudad quitada está en pantalla, se actualiza la estrella.

    if (estado.datos && estado.lugar && idLugar(estado.lugar) === boton.dataset.id) {

      pintarClima();

    }

  }

});


// ==========================================
// REINTENTAR TRAS UN ERROR
// ==========================================

contenedorEstado.addEventListener("click", (event) => {

  if (event.target.closest("button[data-accion='reintentar']") && estado.lugar) {

    cargarClima(estado.lugar);

  }

});


// ==========================================
// INICIO
// ==========================================

ui.mostrarUnidad(estado.unidad);

ui.mostrarFavoritos(estado.favoritos);

cargarClima(cargarUltima() ?? LUGAR_INICIAL);