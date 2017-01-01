/**
 * Triggers the custom event on the given dom.
 * @param {HTMLElement} dom The element
 * @param {string} type The type of event
 * @param {Object} params The detail option
 */
const trigger = (dom, type, params, bubbles = true) => {
  $(dom)[0].dispatchEvent(new CustomEvent(type, {
    detail: params || {},
    bubbles
  }))
}

module.exports = trigger
