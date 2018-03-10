function createCheckbox(container, name) {
  const element = container.appendChild(document.createElement('div'));
  element.setAttribute('class', 'checkbox checkbox-ripple');
  const checkboxContainer = element.appendChild(document.createElement('div'));
  checkboxContainer.setAttribute('style', 'display:flex;position:relative;justify-content:center;');
  let label = checkboxContainer.appendChild(document.createElement('label'));
  label.setAttribute('for', name);
  label.innerText = name;
  label = checkboxContainer.appendChild(document.createElement('label'));
  label.setAttribute('class', 'input-checkbox');
  const input = label.appendChild(document.createElement('input'));
  input.setAttribute('type', 'checkbox');
  input.setAttribute('id', name);
  const span = label.appendChild(document.createElement('span'));
  span.setAttribute('class', 'checkbox-span');
}

function getCheckbox(id) {
  if (document.getElementById(id).checked !== null) {
    return document.getElementById(id).checked;
  }
}
