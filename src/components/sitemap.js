/**
 * Fetches the /sitemap.xml file, parses its URLs, and renders them
 * as a clickable list inside the element with ID sitemap-list.
 *
 * @function renderSitemap
 * @returns {void} This function does not return a value; it updates the DOM.
 *
 * @example
 * // Call this function after the DOM is ready
 * document.addEventListener("DOMContentLoaded", () => {
 *   renderSitemap();
 * });
 *
 * @description
 * Steps performed:
 * 1. Fetches the /sitemap.xml file from the server.
 * 2. Parses the XML using DOMParser.
 * 3. Extracts all <loc> elements within <url> nodes.
 * 4. Creates a list item (<li>) for each URL:
 *    - Uses the portion after # as link text (if available).
 *    - Wraps it in an anchor (<a>) with target="_blank".
 * 5. Appends the list items to the #sitemap-list element.
 * 6. If an error occurs, logs it to the console and updates
 *    #sitemap-list with an error message in red.
 */

export function renderSitemap() {
  fetch("/sitemap.xml")
    .then((res) => res.text())
    .then((xmlStr) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlStr, "application/xml");
      const urls = [...xml.querySelectorAll("url loc")];

      const list = document.getElementById("sitemap-list");
      list.innerHTML = "";

      urls.forEach((loc) => {
        const li = document.createElement("li");
        const linkText = loc.textContent.split("#")[1];
        li.innerHTML = `<a href="${loc.textContent}" target="_blank">${linkText}</a>`;
        list.appendChild(li);
      });
    })
    .catch((err) => {
      console.error("Error cargando sitemap:", err);
      document.getElementById("sitemap-list").innerHTML =
        "<li style='color:red'>Error al cargar el sitemap</li>";
    });
}
