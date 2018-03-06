function mainMenu() {
    navbar()
    const container = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    container.setAttribute('id', 'mainMenu');
    const title = container.appendChild(document.createElement('title'));
    title.setAttribute('class', 'mainTitle');
    title.innerText = 'CookieTouch Script Creator';
    const cookie = container.appendChild(document.createElement('img'));
    cookie.setAttribute('src', 'img/cookie.png');
    cookie.setAttribute('style', 'position:relative;width:22%;height:22%;left:39%;margin-top:2.5%;');
    const loadScript = container.appendChild(document.createElement('div'));
    loadScript.setAttribute('class', 'button button-outline-success mainButton');
    loadScript.setAttribute('onclick', 'showEditScript()');
    loadScript.innerText = 'Load script...';
    const createScript = container.appendChild(document.createElement('div'));
    createScript.setAttribute('class', 'button button-outline-warning mainButton secondMainButton');
    createScript.setAttribute('onclick', 'showCreateScript()');
    createScript.innerText = 'Create script';
    const documentation = container.appendChild(document.createElement('div'));
    documentation.setAttribute('class', 'button button-outline-danger mainButton docButton');
    documentation.setAttribute('onclick', 'location.href="https://ehstrali.gitbooks.io/cookietouch/content/"');
    documentation.innerText = 'View script documentation';
    const github = container.appendChild(document.createElement('img'));
    github.setAttribute('src', 'img/GitHub-Mark.png');
    github.setAttribute('onclick', 'location.href="https://github.com/yovanoc/cookietouch"');
    github.setAttribute('width', '36');
    github.setAttribute('height', '36');
    github.setAttribute('style', 'position:absolute;bottom:6px;right:7px;cursor:pointer');
    const discord = container.appendChild(document.createElement('img'));
    discord.setAttribute('src', 'img/Discord-Logo-Black.png');
    discord.setAttribute('onclick', 'location.href="https://discord.gg/qgd3qDQ"');
    discord.setAttribute('width', '36');
    discord.setAttribute('height', '36');
    discord.setAttribute('style', 'position:absolute;bottom:6px;right:47px;cursor:pointer');
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