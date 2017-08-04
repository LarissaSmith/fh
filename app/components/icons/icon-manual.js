
export const iconManual = function(name) {
  return `<svg class="icon"
     x="0px" y="0px"
     xmlns="http://www.w3.org/2000/svg"
     width="24px"
     height="24px"
     preserveAspectRatio="xMidYMin"
     viewBox="0 0 24 24">
  <use href="${document.location.href}#${name}" />
</svg>`;
};