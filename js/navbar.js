function navbar() {
    const container = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    container.setAttribute('id', 'navbar');
    const title = container.appendChild(document.createElement('div'));
    title.innerText = 'CookieTouch';
    title.setAttribute('style', 'position:absolute;width:17.5%;text-align:center;font-size:150%;margin-top:1.375%;height:2%;');
    const icon = container.appendChild(document.createElement('img'));
    icon.setAttribute('src', 'img/cookie.png');
    icon.setAttribute('style', 'cursor:pointer;position:absolute;left:47.5%;width:4%;margin:0.25%;');
    icon.setAttribute('onclick', 'location.href="index.html"');
    const backArrow = container.appendChild(document.createElement('p'));
    backArrow.setAttribute('id', 'backArrow');
    backArrow.innerText = '<';
    const forwardArrow = container.appendChild(document.createElement('p'));
    forwardArrow.setAttribute('id', 'forwardArrow');
    forwardArrow.innerText = '>';
}

function forwardArrow(menuId, content) {
    const backArrow = document.getElementById('backArrow');
    const forwardArrow = document.getElementById('forwardArrow');
    if (forwardArrow.hasAttribute('style')) forwardArrow.removeAttribute('style');
    if (!backArrow.hasAttribute('style')) backArrow.setAttribute('style', 'color:#007bff');
    // save current menu
    
    if (menuId === 'mainMenu'); // show mainMenu
    if (menuId === 'map'); // show map with content
    if (menuId === 'config'); // show config with content
}

function backArrow(menuId, content) {
    const backArrow = document.getElementById('backArrow');
    const forwardArrow = document.getElementById('forwardArrow');
    if (backArrow.hasAttribute('style')) backArrow.removeAttribute('style');
    if (!forwardArrow.hasAttribute('style')) forwardArrow.setAttribute('style', 'color:#007bff');
    // save current menu

    if (menuId === 'mainMenu'); // show mainMenu
    if (menuId === 'map'); // show map with content
    if (menuId === 'config'); // show config with content
}
