/**
 * Handle keyboard accessibility for:
 *  - onClick functions with the `Enter` or `Space` keys
 *  - Closing a menu with the `Escape` key
 *
 * @public
 * @param {Event} keyEvent - The keyboard event object
 * @param {function} func - The function to be executed with its arguments
 */
export const onKeyAccess = (keyEvent, func) => {
  if (keyEvent.key === "Enter" || keyEvent.key === " ") {
    func();
  }
};

/**
 * Handle accessibility for <a> elements that represent links to other pages.
 * Opens the link when the user presses the `Enter` or `Space` key.
 *
 * @public
 * @param {Event} keyEvent - The keyboard event object
 */
export const onLinkAccess = (keyEvent) => {
  const { key } = keyEvent;
  const { href, target } = keyEvent.currentTarget;

  if (key === "Enter" || key === " ") {
    window.open(href, target);
  }
};
