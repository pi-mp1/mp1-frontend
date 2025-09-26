/**
 * Checks if a user is currently authenticated by verifying
 * the presence of userId in localStorage.
 *
 * @async
 * @function isAuthenticated
 * @returns {Promise<boolean>} Resolves to true if a userId
 *          exists in localStorage, otherwise false.
 *
 * @example
 * const loggedIn = await isAuthenticated();
 * if (loggedIn) {
 *   console.log("User is authenticated");
 * } else {
 *   console.log("User is not authenticated");
 * }
 *
 * @description
 * - Attempts to read the userId key from localStorage.
 * - Returns true if found, false otherwise.
 * - Catches and safely handles errors (e.g., localStorage
 *   unavailable in some environments).
 */

export async function isAuthenticated() {
  try {
    const userId = localStorage.getItem("userId");
    return !!userId;
  } catch (error) {
    return false;
  }
}