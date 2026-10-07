// ==========================================
// UI: dibuja la interfaz
// ==========================================

// Solo crea y actualiza elementos. No hace
// peticiones ni guarda datos.
//
// Todo el texto se inserta con textContent (nunca
// con innerHTML), así lo que llegue de la API o del
// usuario jamás se interpreta como HTML.

import {

  describirCodigo,
  etiquetaLugar,
  extraerHora,
  formatearDia,
  idLugar,
  redondear

} from "./clima.js";

const resultado = document.querySelector("#resultado");
const estado = document.querySelector("#estado");
const clima = document.querySelector("#clima");
const sugerencias = document.querySelector("#sugerencias");
const favoritos = document.querySelector("#favoritos");
const aviso = document.querySelector("#aviso");
const btnUnidad = document.querySelector("#btnUnidad");

let temporizadorAviso = null;


// ==========================================
// AUXILIARES
// ==========================================

function crear(etiqueta, clase, texto) {

  const elemento = document.createElement(etiqueta);

  if (clase) elemento.className = clase;

  if (texto !== undefined) elemento.textContent = texto;

  return elemento;

}

function crearDetalle(titulo, valor) {

  const contenedor = crear("div", "detalle");

  contenedor.append(crear("dt", "", titulo), crear("dd", "", valor));

  return contenedor;

}


// ==========================================
// ESTADOS: CARGANDO Y ERROR
// ==========================================

export function mostrarCargando() {

  resultado.setAttribute("aria-busy", "true");

  estado.hidden = false;
  estado.className = "estado";

  estado.replaceChildren(
    crear("span", "spinner"),
    crear("span", "", "Consultando el clima...")
  );

  clima.hidden = true;

}

export function mostrarError(mensaje, conReintento = true) {

  resultado.setAttribute("aria-busy", "false");

  estado.hidden = false;
  estado.className = "estado error";

  estado.replaceChildren(crear("p", "", mensaje));

  if (conReintento) {

    const boton = crear("button", "btn", "Reintentar");

    boton.type = "button";
    boton.dataset.accion = "reintentar";

    estado.append(boton);

  }

  clima.hidden = true;

}

export function avisar(texto) {

  aviso.textContent = texto;

  clearTimeout(temporizadorAviso);

  temporizadorAviso = setTimeout(() => {

    aviso.textContent = "";

  }, 3500);

}


// ==========================================
// TARJETA DEL CLIMA
// ==========================================

function crearDia(dia, indice) {

  const info = describirCodigo(dia.codigo, true);

  const tarjeta = crear("div", "dia-tarjeta");

  const icono = crear("span", "dia-icono", info.icono);

  icono.title = info.texto;

  tarjeta.append(

    crear("p", "dia-nombre", formatearDia(dia.fecha, indice)),
    icono,
    crear("p", "dia-rango", `${redondear(dia.max)}° / ${redondear(dia.min)}°`)

  );

  if (dia.probLluvia !== null) {

    tarjeta.append(crear("p", "dia-lluvia", `💧 ${dia.probLluvia}%`));

  }

  return tarjeta;

}

export function mostrarClima({ lugar, datos, esFavorito }) {

  const { actual, unidades, dias } = datos;

  const info = describirCodigo(actual.codigo, actual.esDia);

  const tarjeta = crear(
    "article",
    `tarjeta-clima ${actual.esDia ? "dia" : "noche"}`
  );

  // Cabecera: nombre, hora y botón de favorito

  const cabecera = crear("div", "tarjeta-cabecera");

  const titulo = crear("div");

  titulo.append(
    crear("h2", "", etiquetaLugar(lugar)),
    crear("p", "hora", `Hora local: ${extraerHora(actual.hora)}`)
  );

  const btnFavorito = crear(
    "button",
    "btn btn-fav",
    esFavorito ? "★ Guardado" : "☆ Guardar"
  );

  btnFavorito.type = "button";
  btnFavorito.dataset.accion = "favorito";
  btnFavorito.setAttribute("aria-pressed", String(esFavorito));

  cabecera.append(titulo, btnFavorito);

  // Tiempo actual

  const bloqueActual = crear("div", "actual");

  const textoActual = crear("div");

  textoActual.append(
    crear(
      "p",
      "temperatura",
      `${redondear(actual.temperatura)}${unidades.temperatura}`
    ),
    crear("p", "descripcion", info.texto)
  );

  bloqueActual.append(crear("span", "icono-grande", info.icono), textoActual);

  // Detalles

  const detalles = crear("dl", "detalles");

  detalles.append(

    crearDetalle(
      "Sensación térmica",
      `${redondear(actual.sensacion)}${unidades.temperatura}`
    ),
    crearDetalle("Humedad", `${redondear(actual.humedad)}%`),
    crearDetalle(
      "Viento",
      `${redondear(actual.viento)} ${unidades.viento}`
    ),
    crearDetalle(
      "Precipitación",
      `${actual.precipitacion ?? 0} ${unidades.precipitacion}`
    )

  );

  // Pronóstico

  const pronostico = crear("div", "pronostico");

  const contenedorDias = crear("div", "dias");

  contenedorDias.append(...dias.map(crearDia));

  pronostico.append(crear("h3", "", "Próximos días"), contenedorDias);

  tarjeta.append(cabecera, bloqueActual, detalles, pronostico);

  clima.replaceChildren(tarjeta);

  clima.hidden = false;

  estado.hidden = true;

  resultado.setAttribute("aria-busy", "false");

}


// ==========================================
// SUGERENCIAS DE BÚSQUEDA
// ==========================================

export function mostrarSugerencias(ciudades) {

  sugerencias.hidden = false;

  if (ciudades.length === 0) {

    sugerencias.replaceChildren(
      crear("li", "vacio", "No se encontraron ciudades.")
    );

    return;

  }

  sugerencias.replaceChildren(

    ...ciudades.map((ciudad, indice) => {

      const item = crear("li");

      const boton = crear("button");

      boton.type = "button";
      boton.dataset.indice = String(indice);

      boton.append(
        crear("strong", "", ciudad.nombre),
        crear(
          "small",
          "",
          [ciudad.region, ciudad.pais].filter(Boolean).join(", ")
        )
      );

      item.append(boton);

      return item;

    })

  );

}

export function mostrarMensajeSugerencias(texto) {

  sugerencias.hidden = false;

  sugerencias.replaceChildren(crear("li", "vacio", texto));

}

export function ocultarSugerencias() {

  sugerencias.hidden = true;

  sugerencias.replaceChildren();

}


// ==========================================
// FAVORITOS Y UNIDAD
// ==========================================

export function mostrarFavoritos(lista) {

  favoritos.replaceChildren(

    ...lista.map((lugar) => {

      const id = idLugar(lugar);

      const chip = crear("div", "chip-fav");

      const abrir = crear("button", "chip", lugar.nombre);

      abrir.type = "button";
      abrir.dataset.accion = "abrir";
      abrir.dataset.id = id;
      abrir.title = etiquetaLugar(lugar);

      const quitar = crear("button", "chip-quitar", "✕");

      quitar.type = "button";
      quitar.dataset.accion = "quitar";
      quitar.dataset.id = id;
      quitar.setAttribute("aria-label", `Quitar ${lugar.nombre} de favoritos`);

      chip.append(abrir, quitar);

      return chip;

    })

  );

}

export function mostrarUnidad(unidad) {

  btnUnidad.textContent = `°${unidad}`;

  btnUnidad.setAttribute(

    "aria-label",
    `Unidad actual: grados ${unidad === "C" ? "Celsius" : "Fahrenheit"}. Cambiar unidad.`

  );

}