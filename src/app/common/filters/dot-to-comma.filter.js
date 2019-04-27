export const DOT_2_COMMA_FILTER = function dot2CommaFilter(input, params) {
  if (input === null) {
    return '-';
  } else {
    return `${input.toFixed(params[0]).replace('.', ',')}${params[1] || ''}`;
  }
};