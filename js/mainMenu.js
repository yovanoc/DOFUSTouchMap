function mainMenu() {
    navbar();
    const container = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    container.setAttribute('id', 'mainMenu');
    const title = container.appendChild(document.createElement('title'));
    title.setAttribute('class', 'mainTitle');
    title.innerText = 'CookieTouch Script Creator';
    createImg(container, 'img/cookie.png', '', '', 'position:relative;width:22%;height:22%;left:39%;margin-top:2.5%;');
    createButton(container, 'Load script...', 'button button-outline-success mainButton', 'showEditScript()');
    createButton(container, 'Create script', 'button button-outline-warning mainButton secondMainButton', 'showCreateScript()');
    createButton(container, 'View script documentation', 'button button-outline-danger mainButton docButton', 'location.href="https://ehstrali.gitbooks.io/cookietouch/content/"');
    createImg(container, 'img/GitHub-Mark.png', '36', 'location.href="https://github.com/yovanoc/cookietouch"', 'position:absolute;bottom:6px;right:7px;cursor:pointer');
    createImg(container, 'img/Discord-Logo-Black.png', '36', 'location.href="https://discord.gg/qgd3qDQ"', 'position:absolute;bottom:6px;right:47px;cursor:pointer');
}

function showCreateScript() {
    let element = document.getElementsByTagName('body')[0];
    element.removeChild(document.getElementById('mainMenu'));
    element = element.appendChild(document.createElement('div'));
    element.setAttribute('id', 'scriptTools');
    config();
}

function showEditScript() {
    const element = document.getElementsByTagName('body')[0];
    element.removeChild(document.getElementById('mainMenu'));
    // TODO
}