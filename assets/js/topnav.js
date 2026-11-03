document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggleMenuButton");
    const mobileMenu = document.getElementById("mobileNav");

    if (!toggleBtn || !mobileMenu) return;

    const openMenu = () => {
        mobileMenu.classList.add("open");
        toggleBtn.classList.add("open");
        mobileMenu.setAttribute("aria-hidden", "false");
        toggleBtn.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
        mobileMenu.classList.remove("open");
        toggleBtn.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden", "true");
        toggleBtn.setAttribute("aria-expanded", "false");
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