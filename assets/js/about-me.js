document.addEventListener('DOMContentLoaded', () => {
    /*********/
    /* ABOUT */
    /*********/
    const aboutButtons = document.querySelectorAll(".about-button");
    const aboutIcons = document.querySelectorAll(".about-button-icon");

    aboutButtons.forEach(button => {
        button.addEventListener("click", () => {
            const listItem = button.closest("li");
            const submenu = listItem.querySelector(".about-submenu");
            const icon = button.querySelector(".about-button-icon");

            button.classList.toggle("active");
            icon.classList.toggle("active");
            submenu.classList.toggle("active");
        });
    });
});