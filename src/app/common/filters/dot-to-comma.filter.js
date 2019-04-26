export const DOT_TO_COMMA_FILTER = function dotToCommaFilter(input) {
  return `${input.toFixed(4).replace('.', ',')}`;
};