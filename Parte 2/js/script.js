//------------------------------------------------------------------------
//------------------------------------------------------------------------
// AGREGAR PRODUCTO
//------------------------------------------------------------------------
//------------------------------------------------------------------------

// Inputs del formulario
const nombre_producto = document.getElementById("nombre-producto");
const precio_producto = document.getElementById("precio-producto");
const imagen_producto = document.getElementById("imagen-producto");
const material_producto = document.getElementById("material-producto");
const color_producto = document.getElementById("color-producto");

// Contenedor de tarjetas
const lista_productos = document.querySelector("#contenedor-tarjetas");

// Formulario
const formulario = document.querySelector("#formulario-producto");

//------------------------------------------------------------------------
// FUNCION PARA AGREGAR PRODUCTO
//------------------------------------------------------------------------
function crear_producto(e) {
    e.preventDefault();
    
    const nombre = nombre_producto.value;
    const precio = parseInt(precio_producto.value);
    const imagen = imagen_producto.value;
    const material = material_producto.value;
    const color = color_producto.value;
    const talla = document.querySelector('#grupo-talla input:checked');

    // Validaciones
    if (precio < 1000) {
        alert("El precio mínimo es 1.000 COP");
        return;
    }
        
    if (!nombre || !precio || !imagen || !material || !color || !talla) {
        alert("Por favor, completa todos los campos");
        return;
    }
    
    // Generar ID para la nueva tarjeta
    const tarjetas = document.querySelectorAll(".tarjeta-producto");
    const nuevoId = tarjetas.length + 1;
    
    // Crear tarjeta
    const nuevaTarjeta = `
        <article class="tarjeta-producto" data-id="${nuevoId}">
            <img class="imagen-producto" src="${imagen}" alt="${nombre}">
            <h3>${nombre}</h3>
            <p class="precio">$${precio.toLocaleString()}</p>
            <div class="atributos-producto">
                <p><strong>Tamaño:</strong> ${talla.value}</p>
                <p><strong>Material:</strong> ${material}</p>
                <p><strong>Color:</strong> ${color}</p>
            </div>
            <button class="btn-agregar" data-id="${nuevoId}">Agregar al Carrito</button>
        </article>
    `;
    
    // Agregar
    lista_productos.innerHTML += nuevaTarjeta;

    const nuevoBoton = document.querySelector(`.btn-agregar[data-id="${nuevoId}"]`);
    if (nuevoBoton) {
        nuevoBoton.addEventListener("click", function() {
            const tarjeta = this.closest(".tarjeta-producto");
            const id = parseInt(tarjeta.dataset.id);
            const nombre = tarjeta.querySelector("h3").textContent;
            const precioTexto = tarjeta.querySelector(".precio").textContent;
            const precio = parseInt(precioTexto.replace(/[^0-9]/g, ""));
            const imagen = tarjeta.querySelector(".imagen-producto").src;
            
            agregarAlCarrito(id, nombre, precio, imagen);
        });
    }

    formulario.reset();
    
}

//------------------------------------------------------------------------
// EVENTO PARA BOTON DE AGREGAR
//------------------------------------------------------------------------
const boton_crear = document.getElementById("btn-agregar-producto");
boton_crear.addEventListener("click", crear_producto);


//------------------------------------------------------------------------
//------------------------------------------------------------------------
// CARRITO DE COMPRAS
//------------------------------------------------------------------------
//------------------------------------------------------------------------

// Array para almacenar los productos del carrito
let carrito = [];

// Seleccionar elementos del carrito
const carritoIcono = document.getElementById("carrito-icono");
const carritoDesplegado = document.getElementById("carrito-desplegado");
const listaCarrito = document.getElementById("lista-carrito");
const btnVaciar = document.getElementById("btn-vaciar");

//------------------------------------------------------------------------
// FUNCIONES CARRITO
//------------------------------------------------------------------------

// Agregar producto al carrito
function agregarAlCarrito(id, nombre, precio, imagen) {
    
    const productoExistente = carrito.find(item => item.id === id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, agregar nuevo producto con cantidad 1
        carrito.push({
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }
    
    // Actualizar la vista del carrito
    mostrarCarrito();
}

// Mostrar el carrito en HTML
function mostrarCarrito() {
    // Limpiar el contenido actual
    listaCarrito.innerHTML = "";
    
    // Si esta vacio
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
        return;
    }
    
    // Recorrer el carrito y crear elementos HTML
    carrito.forEach(item => {
        const itemHTML = `
            <div class="item-carrito">
                <img class="item-carrito-imagen" src="${item.imagen}" alt="${item.nombre}">
                <div class="item-carrito-info">
                    <div class="item-carrito-nombre">${item.nombre}</div>
                    <div class="item-carrito-precio">$${item.precio.toLocaleString()}</div>
                </div>
                <div class="item-carrito-cantidad">x${item.cantidad}</div>
            </div>
        `;
        listaCarrito.innerHTML += itemHTML;
    });
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = []; // Vaciar el array
    mostrarCarrito(); // Actualizar la vista
}

//------------------------------------------------------------------------
// EVENTOS DEL CARRITO
//------------------------------------------------------------------------

// Evento para mostrar/ocultar carrito con click
carritoIcono.addEventListener("click", function(evento) {
    carritoDesplegado.classList.toggle("mostrar");
});

// Vaciar carrito
btnVaciar.addEventListener("click", function() {
    vaciarCarrito();
});

//------------------------------------------------------------------------
// FUNCION PARA LOS BOTONES DE LAS TARJETAS
//------------------------------------------------------------------------

const botonesAgregar = document.querySelectorAll(".btn-agregar");

// Agregar evento a cada boton
botonesAgregar.forEach(boton => {
    boton.addEventListener("click", function() {
        // Obtener la tarjeta padre
        const tarjeta = this.closest(".tarjeta-producto");
        
        // Obtener los datos de la tarjeta
        const id = parseInt(tarjeta.dataset.id);
        const nombre = tarjeta.querySelector("h3").textContent;
        const precioTexto = tarjeta.querySelector(".precio").textContent;
        const precio = parseInt(precioTexto.replace(/[^0-9]/g, ""));
        const imagen = tarjeta.querySelector(".imagen-producto").src;
        
        // Agregar al carrito
        agregarAlCarrito(id, nombre, precio, imagen);
        
    });
});