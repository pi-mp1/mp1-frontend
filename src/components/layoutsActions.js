import { openTaskNewModal } from "../routes/routes";

/**
 * Initializes UI layout actions such as button click handlers
 * and navigation menu toggling.
 *
 * @function layoutsActions
 * @returns {void} This function does not return a value; it only attaches event listeners.
 *
 * @example
 * // Call this function after the DOM is fully loaded
 * document.addEventListener("DOMContentLoaded", () => {
 *   layoutsActions();
 * });
 *
 * @description
 * This function performs the following:
 * 1. Attaches a click listener to the *New Task button* (#btn-new-task) 
 *    that opens the "New Task" modal.
 * 2. Attaches a click listener to the *Header link* (a.btn-new-task) 
 *    that also opens the "New Task" modal.
 * 3. Handles the *mobile menu toggle*:
 *    - When #menu-toggle is clicked, it toggles the active class on #nav-menu.
 */

export function layoutsActions() {
  // Button inside the task list view
  const btn = document.getElementById("btn-new-task");
  if (btn)
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openTaskNewModal();
    });

  // Header link "+ New Task"
  const headerBtn = document.querySelector("a.btn-new-task");
  if (headerBtn)
    headerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openTaskNewModal();
    });

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
}
