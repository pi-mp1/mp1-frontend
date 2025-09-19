/**
 * A collection of reusable SVG icons for the application.
 *
 * Each property is a string containing inline SVG markup,
 * which can be directly inserted into the DOM (e.g., via innerHTML).
 *
 * @namespace Icons
 * @property {string} edit - Pencil/edit icon SVG.
 * @property {string} delete - Trash/delete icon SVG.
 *
 * @example
 * // Insert edit icon into a button
 * const button = document.createElement("button");
 * button.innerHTML = Icons.edit;
 * document.body.appendChild(button);
 */
export const Icons = {
  edit: `
    <svg xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 24 24" 
         width="18" height="18" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 
               9.94l-3.75-3.75L3 17.25zM20.71 
               7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 
               1.003 0 0 0-1.42 0l-1.83 1.83 
               3.75 3.75 1.84-1.82z"/>
    </svg>
  `,

  delete: `
    <svg xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 24 24" 
         width="18" height="18" fill="currentColor">
      <path d="M6 19c0 1.1.9 2 2 
               2h8c1.1 0 2-.9 2-2V7H6v12zM19 
               4h-3.5l-1-1h-5l-1 
               1H5v2h14V4z"/>
    </svg>
  `,

  info: `
    <svg xmlns="http://www.w3.org/2000/svg" 
         fill="none" viewBox="0 0 24 24" 
         stroke-width="1.5" stroke="currentColor" 
         width="18" height="18">
      <path stroke-linecap="round" stroke-linejoin="round" 
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  `,
};