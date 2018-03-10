function createPopup(style) {
    let popup = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    popup.setAttribute('class', 'popup');
    popup.setAttribute('id', 'popup');
    popup = popup.appendChild(document.createElement('div'));
    popup.setAttribute('class', 'popup-content');
    popup.setAttribute('style', style);
    return popup;
}
