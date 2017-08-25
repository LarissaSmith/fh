
export function tab(e) {
  return e.key === 'Tab' && !e.shiftKey;
}

export function shift_tab(e) {
  return e.key === 'Tab' && e.shiftKey;
}

export function enter(e) {
  return e.key === 'Enter';
}

export function escape(e) {
  return e.key === 'Escape';
}

export function command_i(e) {
  return e.key === 'i' && !e.shiftKey && (e.ctrlKey || e.metaKey);
}

export function command_b(e) {
  return e.key === 'b' && !e.shiftKey && (e.ctrlKey || e.metaKey);
}

export function shift_b(e) {
  return e.key === 'B' && e.shiftKey && (e.ctrlKey || e.metaKey);
}

export function command_u(e) {
  return e.key === 'u' && !e.shiftKey && (e.ctrlKey || e.metaKey);
}

export function shift_u(e) {
  return e.key === 'U' && e.shiftKey && (e.ctrlKey || e.metaKey);
}

export function backspace(e) {
  return e.key === 'Backspace' && !e.shiftKey &&  !(e.ctrlKey || e.metaKey);
}

export function command_arrowUp(e) {
  return e.key === 'ArrowUp' && !e.shiftKey && (e.ctrlKey || e.metaKey);
}

export function command_arrowDown(e) {
  return e.key === 'ArrowDown' && !e.shiftKey && (e.ctrlKey || e.metaKey);
}

export function command_arrowLeft(e) {
  return e.key === 'ArrowLeft' && !e.shiftKey && (e.ctrlKey || e.metaKey);
}

export function command_arrowRight(e) {
  return e.key === 'ArrowRight' && !e.shiftKey && (e.ctrlKey || e.metaKey);
}

export function command_shift_arrowLeft(e) {
  return e.key === 'ArrowLeft' && e.shiftKey && (e.ctrlKey || e.metaKey);
}

export function command_shift_arrowRight(e) {
  return e.key === 'ArrowRight' && e.shiftKey && (e.ctrlKey || e.metaKey);
}

export function arrowDown(e) {
  return e.key === 'ArrowDown' && !e.shiftKey && !(e.ctrlKey || e.metaKey);
}

export function arrowUp(e) {
  return e.key === 'ArrowUp' && !e.shiftKey && !(e.ctrlKey || e.metaKey);
}

export function command_shift_backspace(e) {
  return e.key === 'Backspace' && e.shiftKey &&  (e.ctrlKey || e.metaKey);
}
