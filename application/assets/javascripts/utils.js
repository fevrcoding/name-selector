/**
 * Utility Functions
 *
 * @author Marco Solazzi
 * @copyright (c) Marco Solazzi
 * @module utils
 */

export const toTitleCase = (str) => str.toLowerCase().replace(/(?:\b)\S(?!')/g, (a) => a.toUpperCase());

export const noop = () => {};