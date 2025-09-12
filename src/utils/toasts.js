// src/utils/toasts.js
export function showToast(message, type = 'info') {
    // Crear el toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Estilos básicos
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      transition: all 0.3s ease;
    `;
    
    // Colores según tipo
    if (type === 'success') {
      toast.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
      toast.style.backgroundColor = '#ef4444';
    } else {
      toast.style.backgroundColor = '#3b82f6';
    }
    
    // Añadir al DOM
    document.body.appendChild(toast);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }