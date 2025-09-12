// src/components/modal.js
export function openModal(innerHtml) {
    const root = document.getElementById('modal-root');
    root.innerHTML = `
      <div class="modal-backdrop" data-close="true"></div>
      <div class="modal-dialog" role="dialog" aria-modal="true">
        ${innerHtml}
      </div>
    `;
    root.classList.add('is-open');
  
    // Cerrar al click en backdrop
    const backdrop = root.querySelector('.modal-backdrop');
    backdrop.addEventListener('click', closeModal);

    
    // Evitar que clicks dentro del dialog cierren el modal
    const dialog = root.querySelector('.modal-dialog');
    dialog.addEventListener('click', (e) => e.stopPropagation());
  
        // Cerrar con Escape
    const onKey = (e) => {
        if (e.key === 'Escape') {
        closeModal();
        window.removeEventListener('keydown', onKey);
        }
    };
    window.addEventListener('keydown', onKey);
  }
  
  export function closeModal() {
    const root = document.getElementById('modal-root');
    if (!root) return;
    root.classList.remove('is-open');
    root.innerHTML = '';
  }