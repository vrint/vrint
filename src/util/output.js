export function checkWithWarn (value, msg) {
  return value || warn(msg);
}

function warn (msg) {
  return `[Vrint warn]: ${msg}`
}
