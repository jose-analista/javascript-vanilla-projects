// ==========================================
// 06 - OBJETOS EN JAVASCRIPT
// ==========================================

// ------------------------------------------
// 1. Crear un objeto
// ------------------------------------------

// Un objeto permite almacenar información
// utilizando propiedades y valores.

let usuario = {
    nombre: "José",
    edad: 25,
    profesion: "Analista Programador"
};

console.log(usuario);


// ------------------------------------------
// 2. Acceder a propiedades
// ------------------------------------------

console.log(usuario.nombre);
console.log(usuario.edad);
console.log(usuario.profesion);


// ------------------------------------------
// 3. Notación con corchetes
// ------------------------------------------

console.log(usuario["nombre"]);
console.log(usuario["edad"]);


// ------------------------------------------
// 4. Modificar propiedades
// ------------------------------------------

usuario.edad = 26;

console.log(usuario.edad);


// ------------------------------------------
// 5. Agregar propiedades
// ------------------------------------------

usuario.ciudad = "Santiago";

console.log(usuario);


// ------------------------------------------
// 6. Eliminar propiedades
// ------------------------------------------

delete usuario.ciudad;

console.log(usuario);


// ------------------------------------------
// 7. Comprobar si existe una propiedad
// ------------------------------------------

console.log("nombre" in usuario);
console.log("email" in usuario);


// ------------------------------------------
// 8. Object.keys()
// ------------------------------------------

// Devuelve un array con las propiedades.

console.log(Object.keys(usuario));


// ------------------------------------------
// 9. Object.values()
// ------------------------------------------

// Devuelve un array con los valores.

console.log(Object.values(usuario));


// ------------------------------------------
// 10. Object.entries()
// ------------------------------------------

// Devuelve un array con pares
// [propiedad, valor].

console.log(Object.entries(usuario));


// ------------------------------------------
// 11. Recorrer un objeto
// ------------------------------------------

for (let propiedad in usuario) {

    console.log(
        `${propiedad}: ${usuario[propiedad]}`
    );

}


// ------------------------------------------
// 12. Métodos dentro de objetos
// ------------------------------------------

// Un objeto también puede contener funciones.
// Cuando una función pertenece a un objeto,
// normalmente se llama método.

let persona = {

    nombre: "José",

    saludar() {
        console.log(`Hola, soy ${this.nombre}.`);
    }

};

persona.saludar();


// ------------------------------------------
// 13. La palabra this
// ------------------------------------------

// this hace referencia al objeto que está
// ejecutando el método.

let desarrollador = {

    nombre: "José",
    lenguaje: "JavaScript",

    presentar() {

        console.log(
            `Soy ${this.nombre} y programo en ${this.lenguaje}.`
        );

    }

};

desarrollador.presentar();


// ------------------------------------------
// 14. Objetos anidados
// ------------------------------------------

let empleado = {

    nombre: "José",

    contacto: {

        email: "jose@example.com",
        telefono: "+56 9 1234 5678"

    }

};

console.log(empleado.contacto.email);
console.log(empleado.contacto.telefono);


// ------------------------------------------
// 15. Arrays dentro de objetos
// ------------------------------------------

let programador = {

    nombre: "José",

    lenguajes: [
        "JavaScript",
        "Python",
        "PHP"
    ]

};

console.log(programador.lenguajes);

console.log(
    programador.lenguajes[0]
);


// ------------------------------------------
// 16. Objetos dentro de arrays
// ------------------------------------------

let usuarios = [

    {
        nombre: "José",
        edad: 25
    },

    {
        nombre: "Ana",
        edad: 30
    },

    {
        nombre: "Carlos",
        edad: 28
    }

];

console.log(usuarios);


// ------------------------------------------
// 17. Acceder a objetos dentro de un array
// ------------------------------------------

console.log(usuarios[0].nombre);
console.log(usuarios[1].edad);


// ------------------------------------------
// 18. Recorrer array de objetos
// ------------------------------------------

usuarios.forEach((usuario) => {

    console.log(
        `${usuario.nombre} - ${usuario.edad} años`
    );

});


// ------------------------------------------
// 19. Destructuring de objetos
// ------------------------------------------

// Permite extraer propiedades de un objeto
// directamente en variables.

let cliente = {

    nombre: "Empresa ABC",
    ciudad: "Santiago",
    activo: true

};

const {
    nombre,
    ciudad,
    activo
} = cliente;

console.log(nombre);
console.log(ciudad);
console.log(activo);


// ------------------------------------------
// 20. Destructuring con nombres diferentes
// ------------------------------------------

const {
    nombre: nombreCliente,
    ciudad: ciudadCliente
} = cliente;

console.log(nombreCliente);
console.log(ciudadCliente);


// ------------------------------------------
// 21. Valores por defecto
// ------------------------------------------

const {
    telefono = "No registrado"
} = cliente;

console.log(telefono);


// ------------------------------------------
// 22. Spread operator con objetos
// ------------------------------------------

// Permite copiar las propiedades de un objeto.

let usuarioOriginal = {

    nombre: "José",
    profesion: "Analista Programador"

};

let usuarioCopia = {
    ...usuarioOriginal
};

console.log(usuarioCopia);


// ------------------------------------------
// 23. Agregar propiedades usando spread
// ------------------------------------------

let usuarioCompleto = {

    ...usuarioOriginal,
    ciudad: "Santiago",
    experiencia: 2

};

console.log(usuarioCompleto);


// ------------------------------------------
// 24. Combinar objetos
// ------------------------------------------

let datosPersonales = {

    nombre: "José",
    edad: 25

};

let datosProfesionales = {

    profesion: "Analista Programador",
    experiencia: 2

};

let perfil = {

    ...datosPersonales,
    ...datosProfesionales

};

console.log(perfil);


// ------------------------------------------
// 25. Object.assign()
// ------------------------------------------

// Otra forma de combinar objetos.

let objeto1 = {
    nombre: "José"
};

let objeto2 = {
    profesion: "Analista Programador"
};

let objetoCombinado = Object.assign(
    {},
    objeto1,
    objeto2
);

console.log(objetoCombinado);


// ------------------------------------------
// 26. Optional chaining ?.
// ------------------------------------------

// Permite acceder a propiedades anidadas
// sin provocar un error si no existen.

let empresa = {

    nombre: "Empresa ABC",

    contacto: {
        email: "contacto@empresa.cl"
    }

};

console.log(
    empresa.contacto?.email
);

console.log(
    empresa.contacto?.telefono
);


// ------------------------------------------
// 27. Nullish coalescing ??
// ------------------------------------------

// Permite utilizar un valor alternativo
// cuando el valor es null o undefined.

let telefonoEmpresa = null;

let telefonoMostrar =
    telefonoEmpresa ?? "No disponible";

console.log(telefonoMostrar);


// ------------------------------------------
// 28. Object.freeze()
// ------------------------------------------

// Impide modificar propiedades del objeto.

let configuracion = {

    idioma: "es",
    modo: "oscuro"

};

Object.freeze(configuracion);

// Esta modificación no tendrá efecto:
// configuracion.idioma = "en";

console.log(configuracion);


// ------------------------------------------
// 29. Object.hasOwn()
// ------------------------------------------

// Comprueba si una propiedad pertenece
// directamente al objeto.

let producto = {

    nombre: "Notebook",
    precio: 500000

};

console.log(
    Object.hasOwn(producto, "nombre")
);

console.log(
    Object.hasOwn(producto, "marca")
);


// ------------------------------------------
// 30. Métodos de objetos
// ------------------------------------------

let calculadora = {

    sumar(a, b) {
        return a + b;
    },

    restar(a, b) {
        return a - b;
    },

    multiplicar(a, b) {
        return a * b;
    },

    dividir(a, b) {

        if (b === 0) {
            return "No se puede dividir por cero.";
        }

        return a / b;
    }

};

console.log(calculadora.sumar(10, 5));
console.log(calculadora.restar(10, 5));
console.log(calculadora.multiplicar(10, 5));
console.log(calculadora.dividir(10, 5));


// ------------------------------------------
// 31. Ejemplo práctico: producto
// ------------------------------------------

let productoWeb = {

    nombre: "Sistema de gestión",
    precio: 150000,
    tecnologia: "Laravel",
    disponible: true,

    mostrarInformacion() {

        console.log(
            `${this.nombre} - ${this.tecnologia}`
        );

        console.log(
            `Precio: $${this.precio}`
        );

        console.log(
            `Disponible: ${this.disponible}`
        );

    }

};

productoWeb.mostrarInformacion();


// ------------------------------------------
// 32. Filtrar objetos dentro de un array
// ------------------------------------------

let proyectos = [

    {
        nombre: "Sistema de gestión",
        tecnologia: "Laravel",
        completado: true
    },

    {
        nombre: "Aplicación Android",
        tecnologia: "Java",
        completado: false
    },

    {
        nombre: "API REST",
        tecnologia: "Python",
        completado: true
    }

];

let proyectosCompletados =
    proyectos.filter(
        proyecto => proyecto.completado
    );

console.log(proyectosCompletados);


// ------------------------------------------
// 33. Buscar un objeto
// ------------------------------------------

let proyectoEncontrado =
    proyectos.find(
        proyecto => proyecto.tecnologia === "Python"
    );

console.log(proyectoEncontrado);


// ------------------------------------------
// 34. Transformar objetos
// ------------------------------------------

let nombresProyectos =
    proyectos.map(
        proyecto => proyecto.nombre
    );

console.log(nombresProyectos);


// ------------------------------------------
// 35. Convertir objeto a JSON
// ------------------------------------------

// JSON.stringify() convierte un objeto
// JavaScript en texto JSON.

let usuarioJSON = {

    nombre: "José",
    profesion: "Analista Programador",
    experiencia: 2

};

let json = JSON.stringify(usuarioJSON);

console.log(json);


// ------------------------------------------
// 36. Convertir JSON a objeto
// ------------------------------------------

// JSON.parse() convierte texto JSON
// nuevamente en un objeto JavaScript.

let textoJSON = `
{
    "nombre": "José",
    "profesion": "Analista Programador",
    "experiencia": 2
}
`;

let objetoJSON = JSON.parse(textoJSON);

console.log(objetoJSON);
console.log(objetoJSON.nombre);


// ------------------------------------------
// 37. Ejemplo práctico para reclutadores
// ------------------------------------------

let perfilProfesional = {

    nombre: "José Calderón",
    cargo: "Analista Programador",

    tecnologias: [
        "JavaScript",
        "Python",
        "PHP",
        "Laravel",
        "SQL"
    ],

    proyectos: 5,

    disponible: true,

    mostrarPerfil() {

        console.log(
            `${this.nombre} - ${this.cargo}`
        );

        console.log(
            `Proyectos: ${this.proyectos}`
        );

        console.log(
            `Disponible: ${this.disponible}`
        );

        console.log(
            `Tecnologías: ${this.tecnologias.join(", ")}`
        );

    }

};

perfilProfesional.mostrarPerfil();