let productos = [];
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProdutos(productos);
    })

const contenedorProductos = document.querySelector("#contenedor_productos");
const botonesCategorias = document.querySelectorAll("#boton_categoria");
const tituloPrincipal = document.querySelector("#titulo_principal");
let botonesAgregar = document.querySelectorAll(".producto_gregar");
const numerito = document.querySelector("#numerito");

function cargarProdutos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <div class="producto">
                <img class="producto_imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto_detalles">
                    <h3 class="titulo">${producto.titulo}</h3>
                    <p class="producto_precio">${producto.precio}</p>
                    <button class="producto_agregar" id="${producto.id}">Agregar</button>
                </div>
            </div>
        `;

        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProdutos(productosBoton);
        }
        else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProdutos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".porducto_agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos_en_carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
    productosEnCarrito = productosEnCarritoLS;
}
else {
    productosEnCarrito = [];
}

function agregarAlCarrito() {
    Toastify({
        text: "Agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: '1rem',
        },
        offset: {
            x: '2rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        productosEnCarrito.findIndex(producto =>producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }
    else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((ecc, producto) => acc +producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}