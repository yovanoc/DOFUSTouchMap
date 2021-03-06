function config(content) {
    function createDropdownTable(name, type, ids) {
        let element = document.getElementById('scriptTools');
        element = element.appendChild(document.createElement('div'));
        element.setAttribute('class', 'item');
        element.setAttribute('style', 'cursor:pointer;');
        element.setAttribute('onclick', `showDropdown('${name}')`);
        element.setAttribute('id', `item-${name}`);
        let title = element.appendChild(document.createElement('div'));
        title.setAttribute('id', `title-${name}`);
        title.innerText = name;
        element = element.appendChild(document.createElement('div'));
        element.setAttribute('class', 'content');
        element.setAttribute('style', 'display: none;');
        element.setAttribute('id', `tableContainer-${name}`);
        createButton(element, `Add ${type}`, 'button button-primary', `openPopup('${type}', 'table-tableContainer-${name}', ${`${ids}`})`);
        createTable(element, `table-tableContainer-${name}`, [type, 'id'], ['width:80%;', 'width:20%;']);
    }

    const container = document.getElementById('scriptTools');
    const title = container.appendChild(document.createElement('p'));
    title.setAttribute('align', 'center');
    title.setAttribute('class', 'mainTitle');
    title.innerText = 'Configuration';

    const configOpt = {
        container: document.getElementById('scriptTools'),
        input: {
            inputStyle: 'width:75%;',
            containerStyle: 'position:relative;left:12.5%'
        }
    };

    createInput(configOpt.container, 'TITLE', 'string', '', configOpt.input.containerStyle, configOpt.input.inputStyle);
    createInput(configOpt.container, 'VERSION', 'string', '', configOpt.input.containerStyle, configOpt.input.inputStyle);
    createInput(configOpt.container, 'TYPE', 'string', '', configOpt.input.containerStyle, configOpt.input.inputStyle);
    createInput(configOpt.container, 'TAGS', 'string', '', configOpt.input.containerStyle, configOpt.input.inputStyle);
    createInput(configOpt.container, 'DESCRIPTION', 'string', '', configOpt.input.containerStyle, configOpt.input.inputStyle);
    createInput(configOpt.container, 'MAX_PODS', 'number', 90, configOpt.input.containerStyle, configOpt.input.inputStyle, 0, 100);
    createInput(configOpt.container, 'MIN_MONSTERS', 'number', 1, configOpt.input.containerStyle, configOpt.input.inputStyle, 0, 8);
    createInput(configOpt.container, 'MAX_MONSTERS', 'number', 8, configOpt.input.containerStyle, configOpt.input.inputStyle, 0, 8);
    createInput(configOpt.container, 'MIN_MONSTERS_LEVEL', 'number', 1, configOpt.input.containerStyle, configOpt.input.inputStyle, 0);
    createInput(configOpt.container, 'MAX_MONSTERS_LEVEL', 'number', 1000, configOpt.input.containerStyle, configOpt.input.inputStyle, 0);
    createInput(configOpt.container, 'MAX_FIGHTS_PER_MAP', 'number', '', configOpt.input.containerStyle, configOpt.input.inputStyle, 0);
    createInput(configOpt.container, 'BANK_PUT_KAMAS', 'number', '', configOpt.input.containerStyle, configOpt.input.inputStyle, 0);
    createInput(configOpt.container, 'BANK_GET_KAMAS', 'number', '', configOpt.input.containerStyle, configOpt.input.inputStyle, 0);
    createCheckbox(configOpt.container, 'OPEN_BAGS');
    createCheckbox(configOpt.container, 'DISPLAY_GATHER_COUNT');
    createCheckbox(configOpt.container, 'DISPLAY_FIGHT_COUNT');
    createDropdownTable('FORBIDDEN_MONSTERS', 'Monsters', monstersIds);
    createDropdownTable('MANDATORY_MONSTERS', 'Monsters', monstersIds);
    createDropdownTable('ELEMENTS_TO_GATHER', 'Resources', resourcesIds);
    createDropdownTable('BANK_PUT_ITEMS', 'Items', itemsIds);
    createDropdownTable('BANK_GET_ITEMS', 'Items', itemsIds);
    createDropdownTable('AUTO_REGEN', 'Consumables', consumablesIds);
    createDropdownTable('AUTO_DELETE', 'Items', itemsIds);
    createButton(container, 'Save', 'button button-success', `saveConfig(${content})`, 'position:relative;width:73%;left:11.5%;padding:2%;');
}

function saveConfig(content) {
    function getQuantity(id) {
        return 1; // TODO add quantity
    }

    const input = {
        MAX_PODS: getInput('MAX_PODS'),
        MIN_MONSTERS: getInput('MIN_MONSTERS'),
        MAX_MONSTERS: getInput('MAX_MONSTERS'),
        MIN_MONSTERS_LEVEL: getInput('MIN_MONSTERS_LEVEL'),
        MAX_MONSTERS_LEVEL: getInput('MAX_MONSTERS_LEVEL'),
        MAX_FIGHTS_PER_MAP: getInput('MAX_FIGHTS_PER_MAP'),
        BANK_PUT_KAMAS: getInput('BANK_PUT_KAMAS'),
        BANK_GET_KAMAS: getInput('BANK_GET_KAMAS')
    }

    const checkbox = {
        OPEN_BAGS: getCheckbox('OPEN_BAGS'),
        DISPLAY_GATHER_COUNT: getCheckbox('DISPLAY_GATHER_COUNT'),
        DISPLAY_FIGHT_COUNT: getCheckbox('DISPLAY_FIGHT_COUNT')
    }

    const table =  {
        FORBIDDEN_MONSTERS: getTable('FORBIDDEN_MONSTERS'),
        MANDATORY_MONSTERS: getTable('MANDATORY_MONSTERS'),
        ELEMENTS_TO_GATHER: getTable('ELEMENTS_TO_GATHER'),
        BANK_PUT_ITEMS: { value: getTable('BANK_PUT_ITEMS'), quantity: getQuantity('BANK_PUT_ITEMS') },
        BANK_GET_ITEMS: { value: getTable('BANK_GET_ITEMS'), quantity: getQuantity('BANK_GET_ITEMS') }
    }

    let config = `//Title: ${headers.TITLE}
//Version: ${headers.VERSION}
//Type: ${headers.TYPE}
//Tags: ${headers.TAGS}
//Description: ${headers.DESCRIPTION}
`;

config += `const config = {
    `;

    Object.values(input).forEach(element => {
        if (input[element]) config += `
        ${element}: ${input[element]},`;
    });

    Object.values(checkbox).forEach(element => {
        if (checkbox[element]) config += `
        ${element}: ${checkbox[element]},`;
    });

    Object.values(table).forEach(element => {
        if (table[element] && (element !== 'BANK_PUT_ITEMS' || element !== 'BANK_GET_ITEMS')) {
            config += `
            ${element}: ${table[element]},`;
        } else if (element === 'BANK_PUT_ITEMS' || element === 'BANK_GET_ITEMS') {
            config += `
            ${element}: [`;
            table[element].value.forEach(id => {
                config += `
                { item: ${id}, quantity: ${getQuantity(id)} },`;
            });
            config += `
        ],
`;
        }
    });

    config += `}`;

    updateHeadersValues();
    if (headers.TITLE && headers.DESCRIPTION && headers.TAGS && headers.TYPE && headers.VERSION) {
        let element = document.getElementsByTagName('body')[0];
        element.removeChild(document.getElementById('scriptTools'));
        element = element.appendChild(document.createElement('div'));
        element.setAttribute('id', 'map');
        map();
        if (content !== undefined) {
            pathContainer(headers.TITLE, config, content);
        } else {
            pathContainer(headers.TITLE, config);
        }
    } else {
        const popup = createPopup('height:20%; top:40%;');
        const title = popup.appendChild(document.createElement('p'));
        title.innerText = 'MISSING INFORMATIONS';
        title.setAttribute('align', 'center');
        title.setAttribute('style', 'font-size:130%;margin:.3rem;');
        if (!headers.TITLE) popup.appendChild(document.createElement('div')).innerText = 'Missing TITLE';
        if (!headers.VERSION) popup.appendChild(document.createElement('div')).innerText = 'Missing VERSION';
        if (!headers.TYPE) popup.appendChild(document.createElement('div')).innerText = 'Missing TYPE';
        if (!headers.TAGS) popup.appendChild(document.createElement('div')).innerText = 'Missing TAGS';
        if (!headers.DESCRIPTION) popup.appendChild(document.createElement('div')).innerText = 'Missing DESCRIPTION';
        createButton(popup, 'OK', 'button button-success', 'document.getElementsByTagName("body")[0].removeChild(document.getElementById("popup"))', 'bottom:0;position:absolute;right:0;');
    }
}

function showDropdown(id) {
    const item = document.getElementById(`item-${id}`);
    item.removeAttribute('onclick');
    item.setAttribute('style', 'color:initial;');
    const title = document.getElementById(`title-${id}`);
    title.setAttribute('onclick', `hideDropdown('${id}')`);
    title.setAttribute('class', 'title');
    document.getElementById(`tableContainer-${id}`).setAttribute('style', 'display:initial; cursor:initial;');
}

function hideDropdown(id) {
    const item = document.getElementById(`item-${id}`);
    item.setAttribute('onclick', `fixBugHide('${id}')`);
    item.setAttribute('style', 'cursor:pointer;');
    const title = document.getElementById(`title-${id}`);
    title.removeAttribute('onclick');
    document.getElementById(`tableContainer-${id}`).setAttribute('style', 'display:none;');
}

function fixBugHide(id) { // hideDropdown calls directly showDropdown, so the dropdown never hide.
    document.getElementById(`item-${id}`).setAttribute('onclick', `showDropdown('${id}')`);
}

function openPopup(type, id, ids) {
    let popup = createPopup('');
    const title = popup.appendChild(document.createElement('p'));
    title.innerText = type;
    title.setAttribute('align', 'center');
    title.setAttribute('class', 'search-title');
    const searchBar = popup.appendChild(document.createElement('input'));
    searchBar.setAttribute('type', 'search');
    searchBar.setAttribute('class', 'search-bar');
    searchBar.setAttribute('placeholder', `Search for ${type}...`);
    searchBar.setAttribute('id', 'searchid');
    const tableContainer = popup.appendChild(document.createElement('div'));
    tableContainer.setAttribute('class', 'tableContainer');
    const table = createTable(tableContainer, 'tableid', [type, 'id'], ['width:80%;', 'width:20%;']);
    searchBar.addEventListener('input', (InputEvent) => {
        const tr = document.getElementById('tableid').getElementsByTagName('tr');
        ids.forEach((obj, index) => {
            if (obj.name.toUpperCase().indexOf(searchBar.value.toUpperCase()) > -1) {
                tr[index + 1].removeAttribute('style');
            } else {
                tr[index + 1].setAttribute('style', 'display:none;');
            }
        });
    }, true);
    createButton(popup, 'Quit', 'button button-danger search-button-quit', `document.getElementsByTagName('body')[0].removeChild(document.getElementById('popup')); document.getElementsByTagName('body')[0].removeAttribute('style');`);
    createButton(popup, 'Save', 'button button-success search-button-save', `saveAndClose('${id}')`);
    ids.forEach((obj, index) => {
        const tr = table.appendChild(document.createElement('tr'));
        tr.setAttribute('id', `${obj.name}-${obj.id}`);
        tr.setAttribute('onclick', `select("${obj.name}-${obj.id}")`);
        const stcolumn = tr.appendChild(document.createElement('th'));
        stcolumn.innerText = obj.name;
        const ndcolumn = tr.appendChild(document.createElement('th'));
        ndcolumn.innerText = obj.id;
        if (index > 2000) { // Don't render after 2000 rows => performance issues
            tr.setAttribute('style', 'display:none;');
        }
    });
}

function select(id) {
    const element = document.getElementById(id);
    element.setAttribute('class', 'selected');
    element.setAttribute('onclick', `unselect("${id}")`);
}

function unselect(id) {
    const element = document.getElementById(id);
    element.removeAttribute('class');
    element.setAttribute('onclick', `select("${id}")`);
}

function saveAndClose(id) {
    Array.from(document.getElementsByClassName('selected')).forEach(element => {
        addTableElement(id, [element.children[0].innerText, element.children[1].innerText]);
    });
    const body = document.getElementsByTagName('body')[0];
    body.removeChild(document.getElementById('popup'));
    body.removeAttribute('style');
}