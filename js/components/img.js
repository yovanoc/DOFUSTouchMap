function createImg(container, src, width, onclick, style) {
  const img = container.appendChild(document.createElement('img'));
  img.setAttribute('src', src);
  img.setAttribute('onclick', onclick);
  if (width !== '') {
    img.setAttribute('width', width);
    img.setAttribute('height', width);
  }
  img.setAttribute('style', style);
}
