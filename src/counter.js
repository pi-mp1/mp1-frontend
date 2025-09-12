/**
 * Attach a simple click counter to an HTML element.
 *
 * This function:
 *  - Initializes a counter starting at 0.
 *  - Updates the element's text with the current count.
 *  - Increments the counter each time the element is clicked.
 *
 * @function
 * @param {HTMLElement} element - The DOM element that will display and update the counter.
 * @returns {void} Does not return a value. Updates the DOM element directly.
 *
 * @example
 * const btn = document.getElementById("counterBtn");
 * setupCounter(btn);
 * // Clicking the button will update its text:
 * // "count is 1", "count is 2", etc.
 */
export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}