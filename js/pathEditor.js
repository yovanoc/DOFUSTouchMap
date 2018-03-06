function path(fileName, content) {
    document.getElementsByTagName('body')[0].appendChild(document.createElement('div')).setAttribute('id', 'container');
    patheditor();
    buttons(fileName, content);
}

function buttons(fileName, content) {
    const buttonscontainer = document.getElementById('container').appendChild(document.createElement('div'));
    buttonscontainer.setAttribute('id', 'buttonscontainer');
    const save = buttonscontainer.appendChild(document.createElement('div'));
    save.setAttribute('class', 'button button-success');
    save.setAttribute('onclick', `saveScript(${fileName}, ${content})`);
    save.innerText = 'Save script...';
}

function patheditor() {
    const pathcontainer = document.getElementById('container').appendChild(document.createElement('div'));
    pathcontainer.setAttribute('id', 'pathcontainer');
    // add navigation bar with general, map, phenix, bank
}

function saveScript(fileName, content) {
    // add paths and open save dialog.
}
