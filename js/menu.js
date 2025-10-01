const openMenu = document.querySelector("#open_menu");
const closeMenu = document.querySelector("#close_menu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside_visible");
})

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside_visible");
})