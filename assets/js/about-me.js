document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.about-list > li');

    function open(item) {
        item.classList.add('active');
        item.querySelector('.about-button').setAttribute('aria-expanded', 'true');
    }

    function close(item) {
        item.classList.remove('active');
        item.querySelector('.about-button').setAttribute('aria-expanded', 'false');
    }

    items.forEach(item => {
        const button = item.querySelector('.about-button');
        button.setAttribute('aria-expanded', 'false');

        button.addEventListener('click', () => {
            const wasOpen = item.classList.contains('active'); // 1. ¿el que toqué ya estaba abierto?

            items.forEach(close);                              // 2. cierro todos

            if (!wasOpen) open(item);                          // 3. abro el mío (si estaba abierto, queda cerrado)
        });
    });
});