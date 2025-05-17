// copy-email.js

export function setupCopyEmail() {
    const emailButton = document.getElementById('copyEmailButton'); // Asumiendo que el botón tiene este ID
    if (emailButton) {
      emailButton.addEventListener('click', copyEmail);
    }
  
    function copyEmail(event) {
      event.preventDefault();
  
      const email = "francoveradrms@gmail.com";
  
      navigator.clipboard.writeText(email).then(() => {
        showModal(event);
      }).catch(err => {
        console.error('Error al copiar el correo: ', err);
      });
    }
  
    function showModal(event) {
      const button = event.target.closest('a');
      const buttonRect = button.getBoundingClientRect();
      const modal = document.getElementById("emailModal");
  
      modal.style.display = "block";
      modal.style.left = `${buttonRect.left + window.scrollX}px`;
      modal.style.top = `${buttonRect.bottom + window.scrollY - 100}px`;
  
      setTimeout(() => {
        modal.style.opacity = 1;
        modal.style.transform = "translateY(0)";
      }, 10);
  
      setTimeout(closeModal, 5000);
    }
  
    function closeModal() {
      const modal = document.getElementById("emailModal");
      modal.style.opacity = 0;
      modal.style.transform = "translateY(30px)";
      setTimeout(() => {
        modal.style.display = "none";
      }, 600);
    }
  }
  