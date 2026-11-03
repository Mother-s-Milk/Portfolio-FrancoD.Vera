// copy-email.js
document.addEventListener('DOMContentLoaded', () => {
    const emailButton = document.getElementById('copy-email');
    const toast = document.getElementById('copy-toast');
    let toastTimeout;

    if (!emailButton || !toast) return;

    emailButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText('francoveradrms@email.com');
            showToast();
        } catch (err) {
            console.error('No se pudo copiar el email:', err);
        }
    });

    function showToast(duration = 2500) {
        clearTimeout(toastTimeout);
        toast.classList.add('is-visible');
        toastTimeout = setTimeout(() => {
            toast.classList.remove('is-visible');
        }, duration);
    }
});