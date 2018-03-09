function createInput(container, name, type, value, containerStyle, inputStyle, min, max) {
  let element = container.appendChild(document.createElement('label'));
  element.innerText = name;
  element.setAttribute('style', containerStyle);
  element = element.appendChild(document.createElement('input'));
  element.setAttribute('type', type);
  element.setAttribute('style', inputStyle);
  element.setAttribute('value', value);
  element.setAttribute('id', name);
  if (min) element.setAttribute('min', min);
  if (max) element.setAttribute('max', max);
}

function getInput(id) {
  const input = document.getElementById(id);
  if (input && (input.value !== input.defaultValue && (input.value || input.value >= 0))) { // TODO check type
    return input.value;
  }
}
