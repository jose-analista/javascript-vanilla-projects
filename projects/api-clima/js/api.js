// ==========================================
// API: comunicación con Open-Meteo
// ==========================================

// Este módulo es el único que hace peticiones.
// No toca el DOM: devuelve datos ya ordenados
// o lanza un ErrorApi con un mensaje claro.
//
// Se usan dos servicios gratuitos y sin clave:
//
// - Geocoding: convierte un nombre de ciudad en
//   coordenadas.
// - Forecast: entrega el tiempo actual y el
//   pronóstico a partir de coordenadas.

const URL_GEOCODING = "https://geocoding-api.open-meteo.com/v1/search";

const URL_PRONOSTICO = "https://api.open-meteo.com/v1/forecast";

const TIEMPO_LIMITE_MS = 10000;

const VARIABLES_ACTUALES = [

  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "is_day",
  "precipitation",
  "weather_code",
  "wind_speed_10m"

].join(",");

const VARIABLES_DIARIAS = [

  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "precipitation_probability_max"

].join(",");


// ==========================================
// ERROR PROPIO
// ==========================================

// tipo: "red" | "timeout" | "http" | "formato" | "cancelada"
//
// Permite a quien llama distinguir, por ejemplo,
// una petición cancelada a propósito (no es un
// error para el usuario) de una caída de internet.

export class ErrorApi extends Error {

  constructor(mensaje, tipo) {

    super(mensaje);

    this.name = "ErrorApi";
    this.tipo = tipo;

  }

}


// ==========================================
// PETICIÓN BASE
// ==========================================

// Hace un GET, con tiempo límite, y devuelve el
// JSON. signalExterna permite cancelar desde fuera
// (por ejemplo, cuando el usuario escribe otra cosa).

async function pedirJSON(url, parametros, signalExterna) {

  const controlador = new AbortController();

  let agotado = false;

  const temporizador = setTimeout(() => {

    agotado = true;

    controlador.abort();

  }, TIEMPO_LIMITE_MS);

  signalExterna?.addEventListener(
    "abort",
    () => controlador.abort(),
    { once: true }
  );

  try {

    const respuesta = await fetch(
      `${url}?${new URLSearchParams(parametros)}`,
      { signal: controlador.signal }
    );

    // fetch NO lanza error con un 404 o 500:
    // hay que revisar respuesta.ok.

    if (!respuesta.ok) {

      throw new ErrorApi(
        `El servicio respondió con un error (${respuesta.status}).`,
        "http"
      );

    }

    return await respuesta.json();

  } catch (error) {

    if (error instanceof ErrorApi) throw error;

    if (error.name === "AbortError") {

      throw agotado
        ? new ErrorApi("El servicio tardó demasiado en responder.", "timeout")
        : new ErrorApi("Petición cancelada.", "cancelada");

    }

    if (error instanceof SyntaxError) {

      throw new ErrorApi("El servicio devolvió datos inválidos.", "formato");

    }

    throw new ErrorApi(
      "No se pudo conectar. Revisa tu conexión a internet.",
      "red"
    );

  } finally {

    clearTimeout(temporizador);

  }

}


// ==========================================
// API PÚBLICA
// ==========================================

// Busca ciudades por nombre.
// Devuelve hasta 5 resultados normalizados.
// Si no hay coincidencias, la API omite "results",
// por eso se usa ?? [].

export async function buscarCiudades(texto, signal) {

  const nombre = texto.trim();

  if (nombre.length < 2) return [];

  const datos = await pedirJSON(
    URL_GEOCODING,
    { name: nombre, count: 5, language: "es", format: "json" },
    signal
  );

  return (datos.results ?? []).map((ciudad) => ({

    nombre: ciudad.name,
    region: ciudad.admin1 ?? "",
    pais: ciudad.country ?? "",
    latitud: ciudad.latitude,
    longitud: ciudad.longitude

  }));

}

// Obtiene el tiempo actual y el pronóstico de 5 días.
// unidad: "C" (Celsius) o "F" (Fahrenheit).

export async function obtenerClima({ latitud, longitud }, unidad, signal) {

  const datos = await pedirJSON(
    URL_PRONOSTICO,
    {
      latitude: latitud,
      longitude: longitud,
      current: VARIABLES_ACTUALES,
      daily: VARIABLES_DIARIAS,
      timezone: "auto",
      forecast_days: 5,
      temperature_unit: unidad === "F" ? "fahrenheit" : "celsius"
    },
    signal
  );

  if (!datos.current || !datos.daily) {

    throw new ErrorApi("Respuesta inesperada del servicio.", "formato");

  }

  const actual = datos.current;
  const diario = datos.daily;

  return {

    actual: {
      temperatura: actual.temperature_2m,
      sensacion: actual.apparent_temperature,
      humedad: actual.relative_humidity_2m,
      viento: actual.wind_speed_10m,
      precipitacion: actual.precipitation,
      codigo: actual.weather_code,
      esDia: actual.is_day === 1,
      hora: actual.time
    },

    unidades: {
      temperatura: datos.current_units?.temperature_2m
        ?? (unidad === "F" ? "°F" : "°C"),
      viento: datos.current_units?.wind_speed_10m ?? "km/h",
      precipitacion: datos.current_units?.precipitation ?? "mm"
    },

    dias: diario.time.map((fecha, i) => ({

      fecha,
      codigo: diario.weather_code[i],
      max: diario.temperature_2m_max[i],
      min: diario.temperature_2m_min[i],
      probLluvia: diario.precipitation_probability_max?.[i] ?? null

    }))

  };

}