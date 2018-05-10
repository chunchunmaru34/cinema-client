/* eslint-disable import/prefer-default-export */

export function filter(params) {
  const result = { ...params };
  Object.keys(result).forEach((key) => {
    if (!result[key]) {
      delete result[key];
    }
  });
  return result;
}
