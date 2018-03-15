function mainMenu() {
    window.addEventListener('contextmenu', event => {
        event.preventDefault();
        if (event.path[0].getAttribute('onclick') === 'window.open("https://ehstrali.gitbooks.io/cookietouch/content/")') {
            location.href = 'https://ehstrali.gitbooks.io/cookietouch/content/';
        }
        if (event.path[0].getAttribute('onclick') === 'window.open("https://github.com/yovanoc/cookietouch")') {
            location.href = 'https://github.com/yovanoc/cookietouch';
        }
        if (event.path[0].getAttribute('onclick') === 'window.open("https://discordapp.com/invite/qgd3qDQ")') {
            location.href = "https://discordapp.com/invite/qgd3qDQ";
        }
    }, false);
    navbar();
    const container = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    container.setAttribute('id', 'mainMenu');
    const title = container.appendChild(document.createElement('p'));
    title.setAttribute('align', 'center');
    title.setAttribute('class', 'mainTitle');
    title.innerText = 'CookieTouch Script Creator';
    createImg(container, 'img/cookie.png', '', '', 'position:relative;width:22%;height:22%;left:39%;margin-top:2.5%;');
    createButton(container, 'Load script...', 'button button-outline-success mainButton', 'showEditScript()');
    createButton(container, 'Create script', 'button button-outline-warning mainButton secondMainButton', 'showCreateScript()');
    createButton(container, 'View script documentation', 'button button-outline-danger mainButton docButton', 'window.open("https://ehstrali.gitbooks.io/cookietouch/content/")');
    createImg(container, 'img/GitHub-Mark.png', '', 'window.open("https://github.com/yovanoc/cookietouch")', 'width:3.5%;position:absolute;bottom:6px;right:.50%;cursor:pointer');
    createImg(container, 'img/Discord-Logo-Black.png', '', 'window.open("https://discordapp.com/invite/qgd3qDQ")', 'width:3.5%;position:absolute;bottom:6px;right:4%;cursor:pointer');
}

function showCreateScript() {
    window.removeEventListener('contextmenu', () => {});
    let element = document.getElementsByTagName('body')[0];
    element.removeChild(document.getElementById('mainMenu'));
    element = element.appendChild(document.createElement('div'));
    element.setAttribute('id', 'scriptTools');
    config();
}

function showEditScript() {
    const { dialog } = require('electron').remote;
    const file = dialog.showOpenDialog({ filters: [{ name: 'Scripts', extensions: ['js'] }] });
    if (typeof file[0] === 'string') {
        window.removeEventListener('contextmenu', () => {});
        const { readFileSync } = require('fs');
        const { basename } = require('path');
        const content = readFileSync(file[0], 'utf8');
        const configuration = eval(`${content};config`);

        let element = document.getElementsByTagName('body')[0];
        element.removeChild(document.getElementById('mainMenu'));
        element = element.appendChild(document.createElement('div'));
        element.setAttribute('id', 'scriptTools');

        config(content);

        Object.values(configuration).forEach(value => {
            element = document.getElementById(elementsIds[value]);
            if (element.type === 'checkbox') {
                element.checked = configuration[value];
            } else if (element.getAttribute('class') === 'table') {
                element.value = configuration[value];
                configuration[value].forEach(val => {
                    addTableElement(element.id, [undefined, val]);
                });
            } else {
                element.value = configuration[value];
            }
        });

        const contentSplit = content.split(/\n/gm);
        contentSplit.forEach((line, index) => {
            if (index <= 5 && line !== '') {
                Object.values(headers).forEach(id => {
                    if (line.toUpperCase().search(id) > -1) {
                        const value = line.split(':')[1];
                        if (value.startsWith(' ')) {
                            document.getElementById(id).value = value.slice(1);
                        }
                    }
                });
            }
        });
    }
}
