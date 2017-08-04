
export function selectTextContentEditable(input) {
  let range = document.createRange();
  range.selectNodeContents(input);
  let sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

export function cursorEndContentEditable(input) {
  let range = document.createRange();
  range.selectNodeContents(input);
  range.setStart(input.childNodes[0], input.textContent.length);
  let sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}