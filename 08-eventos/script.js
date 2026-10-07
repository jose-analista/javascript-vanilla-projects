// ============================================
// 1. EVENTO CLICK
// ============================================

const btnClick = document.getElementById("btnClick");

const mensajeClick = document.getElementById("mensajeClick");

btnClick.addEventListener("click", function () {

    mensajeClick.textContent =
        "El botón fue presionado.";

});


// ============================================
// 2. EVENTO DOBLE CLICK
// ============================================

const btnDobleClick =
    document.getElementById("btnDobleClick");

const mensajeDobleClick =
    document.getElementById("mensajeDobleClick");

btnDobleClick.addEventListener("dblclick", function () {

    mensajeDobleClick.textContent =
        "Detectamos un doble click.";

});


// ============================================
// 3. MOUSEOVER Y MOUSEOUT
// ============================================

const zonaHover =
    document.getElementById("zonaHover");

zonaHover.addEventListener("mouseover", function () {

    zonaHover.textContent =
        "El mouse está dentro.";

});

zonaHover.addEventListener("mouseout", function () {

    zonaHover.textContent =
        "El mouse salió.";

});


// ============================================
// 4. EVENTO INPUT
// ============================================

const campoTexto =
    document.getElementById("campoTexto");

const textoIngresado =
    document.getElementById("textoIngresado");

campoTexto.addEventListener("input", function () {

    textoIngresado.textContent =
        campoTexto.value;

});


// ============================================
// 5. EVENTO KEYDOWN
// ============================================

const campoTeclado =
    document.getElementById("campoTeclado");

const teclaPresionada =
    document.getElementById("teclaPresionada");

campoTeclado.addEventListener("keydown", function (evento) {

    teclaPresionada.textContent =
        `Tecla presionada: ${evento.key}`;

});


// ============================================
// 6. EVENTO CHANGE
// ============================================

const selectorTecnologia =
    document.getElementById("selectorTecnologia");

const tecnologiaSeleccionada =
    document.getElementById("tecnologiaSeleccionada");

selectorTecnologia.addEventListener("change", function () {

    tecnologiaSeleccionada.textContent =
        `Tecnología seleccionada: ${selectorTecnologia.value}`;

});


// ============================================
// 7. EVENTO SUBMIT
// ============================================

const formulario =
    document.getElementById("formulario");

const resultadoFormulario =
    document.getElementById("resultadoFormulario");

formulario.addEventListener("submit", function (evento) {

    // Evita que el navegador recargue la página
    evento.preventDefault();

    const nombre =
        document.getElementById("nombre").value;

    resultadoFormulario.textContent =
        `Formulario enviado correctamente. Hola ${nombre}.`;

});


// ============================================
// 8. EVENTO CON OBJETO EVENT
// ============================================

btnClick.addEventListener("click", function (evento) {

    console.log("Evento:", evento);

    console.log("Elemento que recibió el evento:", evento.target);

});


// ============================================
// 9. EVENTO CON ARROW FUNCTION
// ============================================

btnDobleClick.addEventListener("dblclick", (evento) => {

    console.log("Doble click detectado.");
    console.log("Elemento:", evento.target);

});