let productosEnCarrito = localStorage.getItem("productos_en_carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito_vacio");
const contenedorCarritoProductos = document.querySelector("#carrito_productos");
const contenedorCarritoAcciones = document.querySelector("#carrito_acciones");
const contenedorCarritoComprado = document.querySelector("#carrito_comprado");
const botonVaciar = document.querySelector(".carrito_acciones_vaciar");
const contenedorTotal = document.querySelector("#total");
let botonComprar = document.querySelectorAll(".carrito_acciones_comprar");
let botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");

function cargarProdutosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos,innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito_producto");
            div.innerHTML = `
                <img class="carrito_producto_imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito_producto_titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito_producto_cantidad">
                    <small>Cntidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito_producto_precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito_producto_subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.eliminar}</p>
                </div>
                <button class="carrito_producto_eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
            `
    
            contenedorCarritoProductos.append(div);
        });
    }
    else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    
    actualizarBotonesEliminar();
}

cargarProdutosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito_porducto_eliminar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", aeliminarDelCarrito);
    });
}

function eliminarDelCarrito() {
    Toastify({
        text: "Producto eliminado",
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
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProdutosCarrito();

    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    Swal.fire({
        title: "Seguro?",
        icon: "question",
        html: `
            Se borrarán ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos del carrito
        `,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
            Sí
        `,
        cancelButtonText: `
            No
        `,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
            cargarProdutosCarrito();
        }
    });
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCalculado.innerText = `$${totalCalculado}`
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remoe("disabled");
    contenedorCarritoComprado.classList.add("disabled");
}