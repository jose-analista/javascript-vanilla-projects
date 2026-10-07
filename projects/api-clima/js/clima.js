// ==========================================
// CLIMA: funciones puras de ayuda
// ==========================================

// Aquí no hay peticiones ni DOM: solo funciones que
// reciben datos y devuelven datos. Por eso son fáciles
// de probar.


// ==========================================
// CÓDIGOS DEL TIEMPO (WMO)
// ==========================================

// Open-Meteo entrega el estado del tiempo como un
// número (código WMO). Esta tabla lo traduce a texto
// y a un icono.

const CODIGOS = {

  0: { texto: "Despejado", dia: "☀️", noche: "🌙" },
  1: { texto: "Mayormente despejado", dia: "🌤️", noche: "🌙" },
  2: { texto: "Parcialmente nublado", dia: "⛅", noche: "☁️" },
  3: { texto: "Nublado", dia: "☁️", noche: "☁️" },

  45: { texto: "Niebla", dia: "🌫️", noche: "🌫️" },
  48: { texto: "Niebla con escarcha", dia: "🌫️", noche: "🌫️" },

  51: { texto: "Llovizna ligera", dia: "🌦️", noche: "🌧️" },
  53: { texto: "Llovizna", dia: "🌦️", noche: "🌧️" },
  55: { texto: "Llovizna intensa", dia: "🌧️", noche: "🌧️" },
  56: { texto: "Llovizna helada", dia: "🌧️", noche: "🌧️" },
  57: { texto: "Llovizna helada intensa", dia: "🌧️", noche: "🌧️" },

  61: { texto: "Lluvia ligera", dia: "🌦️", noche: "🌧️" },
  63: { texto: "Lluvia", dia: "🌧️", noche: "🌧️" },
  65: { texto: "Lluvia intensa", dia: "🌧️", noche: "🌧️" },
  66: { texto: "Lluvia helada", dia: "🌧️", noche: "🌧️" },
  67: { texto: "Lluvia helada intensa", dia: "🌧️", noche: "🌧️" },

  71: { texto: "Nevada ligera", dia: "🌨️", noche: "🌨️" },
  73: { texto: "Nevada", dia: "🌨️", noche: "🌨️" },
  75: { texto: "Nevada intensa", dia: "❄️", noche: "❄️" },
  77: { texto: "Granizo fino", dia: "❄️", noche: "❄️" },

  80: { texto: "Chubascos ligeros", dia: "🌦️", noche: "🌧️" },
  81: { texto: "Chubascos", dia: "🌧️", noche: "🌧️" },
  82: { texto: "Chubascos violentos", dia: "⛈️", noche: "⛈️" },

  85: { texto: "Chubascos de nieve", dia: "🌨️", noche: "🌨️" },
  86: { texto: "Chubascos de nieve intensos", dia: "❄️", noche: "❄️" },

  95: { texto: "Tormenta", dia: "⛈️", noche: "⛈️" },
  96: { texto: "Tormenta con granizo", dia: "⛈️", noche: "⛈️" },
  99: { texto: "Tormenta con granizo fuerte", dia: "⛈️", noche: "⛈️" }

};

export function describirCodigo(codigo, esDia = true) {

  const info = CODIGOS[codigo];

  if (!info) return { texto: "Sin información", icono: "❓" };

  return {

    texto: info.texto,
    icono: esDia ? info.dia : info.noche

  };

}


// ==========================================
// FORMATO
// ==========================================

export function redondear(numero) {

  return Number.isFinite(numero) ? Math.round(numero) : "–";

}

// Convierte "2026-10-07" en "Hoy", "Mañana" o
// algo como "vie 9". Se usa UTC para que la zona
// horaria del navegador no corra el día.

export function formatearDia(fechaISO, indice) {

  if (indice === 0) return "Hoy";

  if (indice === 1) return "Mañana";

  const fecha = new Date(`${fechaISO}T00:00:00Z`);

  return new Intl.DateTimeFormat("es", {

    weekday: "short",
    day: "numeric",
    timeZone: "UTC"

  }).format(fecha).replace(".", "");

}

// "2026-10-07T14:30" → "14:30"
// La hora ya viene en la zona horaria de la ciudad
// (por timezone=auto), así que solo se recorta.

export function extraerHora(fechaHoraISO) {

  return typeof fechaHoraISO === "string"
    ? fechaHoraISO.slice(11, 16)
    : "";

}


// ==========================================
// LUGARES
// ==========================================

// "Santiago, Región Metropolitana, Chile"

export function etiquetaLugar(lugar) {

  return [lugar.nombre, lugar.region, lugar.pais]
    .filter(Boolean)
    .join(", ");

}

// Identificador estable para guardar favoritos.
// Se redondean las coordenadas para que dos
// búsquedas de la misma ciudad den el mismo id.

export function idLugar(lugar) {

  return `${lugar.latitud.toFixed(2)},${lugar.longitud.toFixed(2)}`;

}

export function esLugarValido(lugar) {

  return Boolean(lugar)
    && typeof lugar.nombre === "string"
    && Number.isFinite(lugar.latitud)
    && Number.isFinite(lugar.longitud);

}


// ==========================================
// DEBOUNCE
// ==========================================

// Espera a que el usuario deje de escribir antes
// de ejecutar la función. Evita lanzar una petición
// por cada letra.

export function debounce(funcion, espera) {

  let temporizador;

  return (...argumentos) => {

    clearTimeout(temporizador);

    temporizador = setTimeout(() => funcion(...argumentos), espera);

  };

}