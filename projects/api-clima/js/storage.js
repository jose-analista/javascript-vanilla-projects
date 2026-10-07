// ==========================================
// STORAGE: preferencias guardadas en el navegador
// ==========================================

// Es el único módulo que conoce localStorage.
// Guarda tres cosas:
//
// - favoritos: lista de ciudades
// - ultima: la última ciudad consultada
// - unidad: "C" o "F"

import { esLugarValido } from "./clima.js";

const CLAVES = {

  favoritos: "clima:favoritos:v1",
  ultima: "clima:ultima:v1",
  unidad: "clima:unidad:v1"

};

function leer(clave) {

  try {

    const texto = localStorage.getItem(clave);

    return texto === null ? null : JSON.parse(texto);

  } catch (error) {

    console.warn(`No se pudo leer "${clave}":`, error);

    return null;

  }

}

function escribir(clave, valor) {

  try {

    localStorage.setItem(clave, JSON.stringify(valor));

  } catch (error) {

    console.warn(`No se pudo guardar "${clave}":`, error);

  }

}


// ==========================================
// FAVORITOS
// ==========================================

export function cargarFavoritos() {

  const datos = leer(CLAVES.favoritos);

  return Array.isArray(datos) ? datos.filter(esLugarValido) : [];

}

export function guardarFavoritos(favoritos) {

  escribir(CLAVES.favoritos, favoritos);

}


// ==========================================
// ÚLTIMA CIUDAD
// ==========================================

export function cargarUltima() {

  const lugar = leer(CLAVES.ultima);

  return esLugarValido(lugar) ? lugar : null;

}

export function guardarUltima(lugar) {

  escribir(CLAVES.ultima, lugar);

}


// ==========================================
// UNIDAD
// ==========================================

export function cargarUnidad() {

  return leer(CLAVES.unidad) === "F" ? "F" : "C";

}

export function guardarUnidad(unidad) {

  escribir(CLAVES.unidad, unidad);

}