const productos = [
    {
        id: "conjunto-01",
        titulo: "Conjunto 01",
        imagen: "./img/conjuntos/01.png",
        categoria: {
            nombre: "Conjuntos",
            id: "conjuntos"
        },
        precio: 14000
    },
    {
        id: "conjunto-02",
        titulo: "Conjunto 02",
        imagen: "./img/conjuntos/02.png",
        categoria: {
            nombre: "Conjuntos",
            id: "conjuntos"
        },
        precio: 13800
    },
    {
        id: "conjunto-03",
        titulo: "Conjunto 03",
        imagen: "./img/conjuntos/03.png",
        categoria: {
            nombre: "Conjuntos",
            id: "conjuntos"
        },
        precio: 13800
    },
    {
        id: "conjunto-04",
        titulo: "Conjunto 04",
        imagen: "./img/conjuntos/04.png",
        categoria: {
            nombre: "Conjuntos",
            id: "conjuntos"
        },
        precio: 14000
    },
    {
        id: "conjunto-05",
        titulo: "Conjunto 05",
        imagen: "./img/conjuntos/05.png",
        categoria: {
            nombre: "Conjuntos",
            id: "conjuntos"
        },
        precio: 12900
    },

    {
        id: "remera-01",
        titulo: "Remera 01",
        imagen: "./img/remeras/01.png",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 5900
    },
    {
        id: "remera-02",
        titulo: "Remera 02",
        imagen: "./img/remeras/02.png",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 5900
    },
    {
        id: "remera-03",
        titulo: "Remera 03",
        imagen: "./img/remeras/03.png",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 5100
    },
    {
        id: "remera-04",
        titulo: "Remera 04",
        imagen: "./img/remeras/04.png",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 6500
    },
    {
        id: "remera-05",
        titulo: "Remera 05",
        imagen: "./img/remeras/05.png",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 5900
    },
    {
        id: "remera-06",
        titulo: "Remera 06",
        imagen: "./img/remeras/06.png",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 6500
    },
    {
        id: "remera-07",
        titulo: "Remera 07",
        imagen: "./img/remeras/07.png",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 6500
    },
    {
        id: "remera-08",
        titulo: "Remera 08",
        imagen: "./img/remeras/08.png",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 6500
    },
   
    {
        id: "jogging-01",
        titulo: "Jogging 01",
        imagen: "./img/joggings/01.png",
        categoria: {
            nombre: "Joggings",
            id: "joggings"
        },
        precio: 13500
    },
    {
        id: "jogging-02",
        titulo: "Jogging 02",
        imagen: "./img/joggings/02.png",
        categoria: {
            nombre: "Joggings",
            id: "joggings"
        },
        precio: 7300
    },
    {
        id: "jogging-03",
        titulo: "Jogging 03",
        imagen: "./img/joggings/03.png",
        categoria: {
            nombre: "Joggings",
            id: "joggings"
        },
        precio: 7900
    },
    {
        id: "jogging-04",
        titulo: "Jogging 04",
        imagen: "./img/joggings/04.png",
        categoria: {
            nombre: "Joggings",
            id: "joggings"
        },
        precio: 7900
    },
    {
        id: "jogging-05",
        titulo: "Jogging 05",
        imagen: "./img/joggings/05.png",
        categoria: {
            nombre: "Joggings",
            id: "joggings"
        },
        precio: 7900
    }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}