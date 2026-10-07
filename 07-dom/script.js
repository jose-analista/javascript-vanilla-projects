// ==========================================
// 07 - MANIPULACIÓN DEL DOM
// ==========================================

// ------------------------------------------
// 1. Seleccionar elementos
// ------------------------------------------

// getElementById permite seleccionar un elemento
// utilizando su atributo id.

const titulo = document.getElementById("titulo");

const descripcion =
    document.getElementById("descripcion");

console.log(titulo);
console.log(descripcion);


// ------------------------------------------
// 2. Cambiar contenido
// ------------------------------------------

// textContent permite cambiar el texto
// de un elemento.

titulo.textContent = "DOM con JavaScript";


// ------------------------------------------
// 3. Cambiar HTML
// ------------------------------------------

descripcion.innerHTML =
    "Manipulando <strong>HTML</strong> con JavaScript.";


// ------------------------------------------
// 4. Seleccionar elementos con querySelector
// ------------------------------------------

// querySelector permite utilizar selectores CSS.

const nombre = document.querySelector("#nombre");

const profesion =
    document.querySelector("#profesion");

console.log(nombre);
console.log(profesion);


// ------------------------------------------
// 5. Cambiar estilos
// ------------------------------------------

nombre.style.fontWeight = "bold";

profesion.style.fontStyle = "italic";


// ------------------------------------------
// 6. Cambiar atributos
// ------------------------------------------

titulo.setAttribute(
    "title",
    "Título modificado con JavaScript"
);

console.log(
    titulo.getAttribute("title")
);


// ------------------------------------------
// 7. Eventos
// ------------------------------------------

// addEventListener permite reaccionar
// a acciones del usuario.

const btnCambiar =
    document.getElementById("btnCambiar");

btnCambiar.addEventListener(
    "click",
    function () {

        nombre.textContent =
            "Nombre: José Calderón";

        profesion.textContent =
            "Profesión: Analista Programador";

    }
);


// ------------------------------------------
// 8. Contador
// ------------------------------------------

const contador =
    document.getElementById("contador");

const btnSumar =
    document.getElementById("btnSumar");

const btnRestar =
    document.getElementById("btnRestar");

const btnReset =
    document.getElementById("btnReset");

let valorContador = 0;


// Sumar

btnSumar.addEventListener(
    "click",
    function () {

        valorContador++;

        contador.textContent =
            valorContador;

    }
);


// Restar

btnRestar.addEventListener(
    "click",
    function () {

        valorContador--;

        contador.textContent =
            valorContador;

    }
);


// Reiniciar

btnReset.addEventListener(
    "click",
    function () {

        valorContador = 0;

        contador.textContent =
            valorContador;

    }
);


// ------------------------------------------
// 9. Crear elementos
// ------------------------------------------

const lista =
    document.getElementById("listaTecnologias");

const btnAgregar =
    document.getElementById("btnAgregar");

btnAgregar.addEventListener(
    "click",
    function () {

        const nuevaTecnologia =
            document.createElement("li");

        nuevaTecnologia.textContent =
            "Laravel";

        lista.appendChild(
            nuevaTecnologia
        );

    }
);


// ------------------------------------------
// 10. Crear elementos dinámicamente
// ------------------------------------------

const elemento = document.createElement("p");

elemento.textContent =
    "Este elemento fue creado con JavaScript.";

document.querySelector(".container")
    .appendChild(elemento);


// ------------------------------------------
// 11. classList
// ------------------------------------------

// classList permite agregar, eliminar
// y comprobar clases CSS.

titulo.classList.add("titulo-principal");

console.log(
    titulo.classList.contains(
        "titulo-principal"
    )
);


// ------------------------------------------
// 12. Ejemplo práctico
// ------------------------------------------

const tecnologias = [
    "JavaScript",
    "Python",
    "PHP",
    "Laravel"
];

tecnologias.forEach(
    tecnologia => {

        const item =
            document.createElement("li");

        item.textContent =
            tecnologia;

        lista.appendChild(item);

    }
);