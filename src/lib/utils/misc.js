export const isNativeObject = (object) =>
  Object.prototype.toString.call(object) === '[object Object]';
