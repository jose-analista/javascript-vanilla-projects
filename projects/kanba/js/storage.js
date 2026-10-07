// ==========================================
// STORAGE: lectura y escritura en localStorage
// ==========================================

// Este módulo es el único que conoce localStorage.
// Si algún día se cambia por una API o IndexedDB,
// solo hay que modificar este archivo.

const CLAVE = "kanban:tareas:v1";

// Devuelve el arreglo guardado, o null si no hay
// datos (primera visita) o si están dañados.

export function cargar() {

  try {

    const texto = localStorage.getItem(CLAVE);

    if (texto === null) return null;

    const datos = JSON.parse(texto);

    return Array.isArray(datos) ? datos : null;

  } catch (error) {

    console.warn("No se pudo leer localStorage:", error);

    return null;

  }

}

// Devuelve true si se pudo guardar.
// Puede fallar en modo privado o si el
// almacenamiento está lleno.

export function guardar(tareas) {

  try {

    localStorage.setItem(CLAVE, JSON.stringify(tareas));

    return true;

  } catch (error) {

    console.warn("No se pudo guardar en localStorage:", error);

    return false;

  }

}