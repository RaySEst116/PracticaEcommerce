const openMenu = document.querySelector("#openMenu");
const closeMenu = document.querySelector("#closeMenu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside_visible");
});

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside_visible");
});

botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside_visible");
}));