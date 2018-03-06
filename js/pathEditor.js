function path(fileName, content) {
    const container = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    container.setAttribute('class', 'containerPath');
    const patheditor = container.appendChild(document.createElement('div'));
    patheditor.setAttribute('id', 'patheditor');
    const buttons = container.appendChild(document.createElement('div'));
    buttons.setAttribute('class', 'buttons');
}