/**
 *
 * @param {Date} date
 * @returns formatted date in MM-DD-YYYY
 */
export const formatDate = (date) => {
  let newDate = new Date(date);
  return `${
    newDate.getMonth() + 1
  }-${newDate.getDate()}-${newDate.getFullYear()}`;
};

/**
 *
 * @param {string} hash
 * @returns formatted string with length of 7
 */
export const formatCommitHash = (hash) => {
  return hash.substring(0, 7);
};
