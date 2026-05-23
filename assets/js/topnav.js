document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".topnav__toggle-button");
    const mobileMenu = document.querySelector(".topnav__mobile");

    if (!toggleBtn || !mobileMenu) return;

    const openMenu = () => {
        mobileMenu.classList.add("open");
        toggleBtn.classList.add("open");
    };

    const closeMenu = () => {
        mobileMenu.classList.remove("open");
        toggleBtn.classList.remove("open");
    };

    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.contains("open");
        isOpen ? closeMenu() : openMenu();
    };

    // Abrir / cerrar con el botón hamburguesa
    toggleBtn.addEventListener("click", toggleMenu);

    // Cerrar al hacer click en un enlace
    mobileMenu.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            closeMenu();
        }
    });
});