/**
 * Triggers the custom event on the given dom.
 * @param {HTMLElement} dom The element
 * @param {string} type The type of event
 * @param {Object} params The detail option
 */
const trigger = (dom, type, params) => {
  $(dom)[0].dispatchEvent(new CustomEvent(type, { detail: params || {} }))
}

module.exports = trigger
