function createNavLink(container, innerText, clas, onclick, style, id) {
  const navlink = container.appendChild(document.createElement('div'));
  navlink.innerText = innerText;
  navlink.setAttribute('class', clas);
  navlink.setAttribute('onclick', onclick);
  if (style) navlink.setAttribute('style', style);
  if (id) navlink.setAttribute('id', id);
  return navlink;
}
