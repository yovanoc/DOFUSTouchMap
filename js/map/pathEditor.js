function pathContainer(fileName, config, content) {
    document.getElementsByTagName('body')[0].appendChild(document.createElement('div')).setAttribute('id', 'container');
    patheditor();
    const buttoncontainer = document.getElementById('container').appendChild(document.createElement('div'));
    buttoncontainer.setAttribute('id', 'buttonscontainer');
    createButton(buttoncontainer, 'Save script...', 'button button-success', `saveScript(${fileName}, ${content})`);
}

function patheditor() {
    const pathcontainer = document.getElementById('container').appendChild(document.createElement('div'));
    pathcontainer.setAttribute('id', 'pathcontainer');
    // add navigation bar with general, map, phenix, bank
}

function saveScript(fileName, content) {
    // add paths and open save dialog.
}
