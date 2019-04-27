export const DOT_TO_COMMA_FILTER = function dotToCommaFilter(input, params) {
  if (input === null) {
    return '-';
  } else {
    return `${input.toFixed(params[0]).replace('.', ',')}${params[1] || ''}`;
  }
};