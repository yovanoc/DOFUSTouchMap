function createButton(container, innerText, clas, onclick, style) {
  const button = container.appendChild(document.createElement('div'));
  button.innerText = innerText;
  button.setAttribute('class', clas);
  button.setAttribute('onclick', onclick);
  if (style) button.setAttribute('style', style);
}
