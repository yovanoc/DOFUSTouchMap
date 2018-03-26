function pathContainer(fileName, config, content) {
    const container = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    container.setAttribute('id', 'container');
    container.setAttribute('style', 'overflow:hidden;');
    pathEditorOnLoad();
    const buttoncontainer = container.appendChild(document.createElement('div'));
    buttoncontainer.setAttribute('id', 'buttonscontainer');
    createButton(buttoncontainer, 'Save script...', 'button button-success', `saveScript("${fileName}", "${content}")`, 'margin-top:5%;margin-bottom:6%;');
    createButton(buttoncontainer, 'Quit', 'button button-danger', `quitApp()`, 'margin-bottom:6%;');
    createButton(buttoncontainer, 'Show Ids', 'button button-outline-info', `showIds()`, 'top:36%;');
    createButton(buttoncontainer, 'Show Documentation', 'button button-outline-success', `window.open("https://ehstrali.gitbooks.io/cookietouch/content/")`, 'top:38%;');
}

function pathEditorOnLoad() {
    const pathcontainer = document.getElementById('container').appendChild(document.createElement('div'));
    pathcontainer.setAttribute('id', 'pathcontainer');
    const title = pathcontainer.appendChild(document.createElement('p'))
    title.innerText = 'Select a path:';
    title.setAttribute('align', 'center');
    title.setAttribute('style', 'font-size:130%;margin:.3rem;');
    createButton(pathcontainer, 'map', 'button button-primary', 'pathEditorStart("map")', 'height:10%;width:25%;display:flex;justify-content:center;align-content:center;flex-direction:column;left:35%;margin-top:2.5%;');
    createButton(pathcontainer, 'phenix', 'button button-success', 'pathEditorStart("phenix")', 'height:10%;width:25%;display:flex;justify-content:center;align-content:center;flex-direction:column;left:35%;margin-top:2.5%;');
    createButton(pathcontainer, 'bank', 'button button-info', 'pathEditorStart("bank")', 'height:10%;width:25%;display:flex;justify-content:center;align-content:center;flex-direction:column;left:35%;margin-top:2.5%;');
}

function pathEditorStart(pathType) {
    const pathcontainer = document.getElementById('pathcontainer');
    while (pathcontainer.lastChild) { // Reset pathcontainer
        pathcontainer.removeChild(pathcontainer.lastChild);
    }
    const navbar = pathcontainer.appendChild(document.createElement('div'));
    navbar.setAttribute('id', 'nav');
    navbar.setAttribute('style', 'height:10%;overflow-x:scroll;background-color:#EEEEEE;border-bottom:1px solid #BDBDBD;white-space:nowrap;');
    createNavLink(navbar, 'mapList', 'navlink', `clickNavLink("mapList", "showMapList()")`, 'border-left:0', 'mapList');
    clickNavLink("mapList", "showMapList()"); // init
    const content = pathcontainer.appendChild(document.createElement('div'));
    content.setAttribute('style', 'height:90%;');
}

function clickNavLink(id, fn) {
    const navbar = document.getElementById('nav');
    const navElement = document.getElementById(id);
    const arrayNavLinks = Array.from(navbar.children);
    if (arrayNavLinks.length === 1 && navElement.getAttribute('class') !== 'navlink navlink-active' ) {
        eval(fn);
    } else {
        arrayNavLinks.forEach(element => {
            if (element.getAttribute('class') === 'navlink navlink-active' && element !== navElement) {
                element.setAttribute('class', 'navlink');
                eval(fn);
            }
        });
    }
    navElement.setAttribute('class', 'navlink navlink-active');
}

function showMapList() {
    console.log('showMapList');
    // show map list
}

function showMapActions(coordonates) {
    console.log('showMapActions', coordonates);
    // show map actions
}

function pathEditorMapSelected(coordonates) {
    const pathcontainer = document.getElementById('pathcontainer');
}

function saveScript(fileName, content) {
    // TODO finish content editing
    const { dialog } = require('electron').remote;
    const file = dialog.showSaveDialog({ filters: [{ name: 'Scripts', extensions: ['js'] }] });
}

function showIds() {
    
}

function quitApp() {
    const popup = createPopup('top:40%;left:35%;width:30%;height:20%;');
    const title = popup.appendChild(document.createElement('p'));
    title.innerText = 'DO YOU REALLY WANT TO QUIT ?';
    title.setAttribute('align', 'center');
    title.setAttribute('style', 'font-size:130%;padding:.3rem;');
    createButton(popup, 'YES', 'button button-danger', 'window.close()');
    createButton(popup, 'NO', 'button button-success', 'document.getElementsByTagName("body")[0].removeChild(document.getElementById("popup"));');
    //window.close();
}
