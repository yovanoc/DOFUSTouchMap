function mainMenu() {
    let element = document.getElementsByTagName('body')[0];
    element = element.appendChild(document.createElement('div'));
    element.setAttribute('id', 'mainMenu');
    element.setAttribute('style', 'overflow:hidden');
    const title = element.appendChild(document.createElement('title'));
    title.setAttribute('class', 'mainTitle');
    title.innerText = 'CookieTouch Script Creator';
    const cookie = element.appendChild(document.createElement('img'));
    cookie.setAttribute('src', 'img/cookie.png');
    cookie.setAttribute('style', 'position:relative;width:20%;height:20%;left:40%;margin-top:2.5%;');
    const loadScript = element.appendChild(document.createElement('div'));
    loadScript.setAttribute('class', 'button button-outline-success mainButton');
    loadScript.setAttribute('onclick', 'showEditScript()');
    loadScript.innerText = 'Load script...';
    const createScript = element.appendChild(document.createElement('div'));
    createScript.setAttribute('class', 'button button-outline-warning mainButton secondMainButton');
    createScript.setAttribute('onclick', 'showCreateScript()');
    createScript.innerText = 'Create script';
    const documentation = element.appendChild(document.createElement('div'));
    documentation.setAttribute('class', 'button button-outline-danger mainButton docButton');
    documentation.setAttribute('onclick', 'location.href="https://ehstrali.gitbooks.io/cookietouch/content/"');
    documentation.innerText = 'View script documentation';
    const github = element.appendChild(document.createElement('img'));
    github.setAttribute('src', 'img/GitHub-Mark.png');
    github.setAttribute('onclick', 'location.href="https://github.com/yovanoc/cookietouch"');
    github.setAttribute('width', '40');
    github.setAttribute('height', '40');
    github.setAttribute('style', 'position:absolute;bottom:3px;right:3px;cursor:pointer');
    const discord = element.appendChild(document.createElement('img'));
    discord.setAttribute('src', 'img/Discord-Logo-Black.png');
    discord.setAttribute('onclick', 'location.href="https://discord.gg/qgd3qDQ"');
    discord.setAttribute('width', '40');
    discord.setAttribute('height', '40');
    discord.setAttribute('style', 'position:absolute;bottom:3px;right:45px;cursor:pointer');
}

function showCreateScript() {
    let element = document.getElementsByTagName('body')[0];
    element.removeChild(document.getElementById('mainMenu'));
    element = element.appendChild(document.createElement('div'));
    element.setAttribute('id', 'scriptTools');
    /*
    const p = element.appendChild(document.createElement('p'));
    p.setAttribute('align', 'center');
    p.setAttribute('id', 'coords');
    p.innerText = '[0,0]'; */
    config();
    // TODO create a menu for config.
}

function showEditScript() {
    let element = document.getElementsByTagName('body')[0];
    element.removeChild(document.getElementById('mainMenu'));
    // TODO
}