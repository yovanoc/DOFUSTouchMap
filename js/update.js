const { writeFileSync, readFileSync, existsSync } = require('fs');

function update() {
    const versionFile = __dirname + '/ids/assetsVersion.json';
    let consumablesArr = [];
    let unknownsArr = [];
    let monstersArr = [];

    function downloadIds(version) {
        let itemObj;
        let obj;
        axios.post('https://proxyconnection.touch.dofus.com/data/map',  {
            v: version,
            lang: 'fr', // TODO add a config in app
            class: 'Monsters',
            ids: [],
        }).then(response => {
            Object.keys(response.data).forEach((value, index) => {
                itemObj = response.data[index];
                if (itemObj !== undefined && itemObj._type !== undefined && itemObj._type !== 'Weapon') {
                    obj = {};
                    obj.name = itemObj.nameId;
                    obj.id = itemObj.id;
                    monstersArr.push(obj);
                }
            });
        });
        axios.post('https://proxyconnection.touch.dofus.com/data/map',  {
            v: version,
            lang: 'fr', // TODO add a config in app
            class: 'Items',
            ids: [],
        }).then(response => {
            Object.keys(response.data).forEach((value, index) => {
                itemObj = response.data[index];
                if (itemObj !== undefined && itemObj._type !== undefined && itemObj._type !== 'Weapon') {
                    obj = {};
                    if (itemObj.usable) { // consumable
                        obj.name = itemObj.nameId;
                        obj.id = itemObj.id;
                        consumablesArr.push(obj);
                        unknownsArr.push(obj);
                    } else { // unknown
                        obj.name = itemObj.nameId;
                        obj.id = itemObj.id;
                        unknownsArr.push(obj);
                    }
                }
            });
        });
        const intervalMonsters = setInterval(() => {
            if (monstersArr.length !== 0) {
                writeFileSync(`${__dirname}/ids/Monsters.json`, JSON.stringify(monstersArr));
                clearInterval(intervalMonsters);
            }
        }, 2000);
    
        const intervalItems = setInterval(() => {
            if (unknownsArr.length !== 0) {
                writeFileSync(`${__dirname}/ids/Items.json`, JSON.stringify(unknownsArr));
                writeFileSync(`${__dirname}/ids/Consumables.json`, JSON.stringify(consumablesArr));
                clearInterval(intervalItems);
            }
        }, 3000);
    }
    
    axios.get('https://proxyconnection.touch.dofus.com/assetsVersions.json').then(response => {
        const assetsVersion = response.data.assetsVersion;
        let oldVersion;
        existsSync(versionFile) ? oldVersion = readFileSync(versionFile, 'utf8') : oldVersion = '';
        if (oldVersion !== assetsVersion) {
            writeFileSync(versionFile, assetsVersion, 'utf8');
            downloadIds(assetsVersion);
            resourcesIds = readFileSync(`${__dirname}/ids/Resources.json`, 'utf8'); // Resources is never downloaded
            monstersIds = monstersArr;
            itemsIds = unknownsArr;
            consumablesIds = consumablesArr;
            mainMenu();
        } else {
            monstersIds = readFileSync(`${__dirname}/ids/Monsters.json`, 'utf8');
            itemsIds = readFileSync(`${__dirname}/ids/Items.json`, 'utf8');
            consumablesIds = readFileSync(`${__dirname}/ids/Consumables.json`, 'utf8');
            resourcesIds = readFileSync(`${__dirname}/ids/Resources.json`, 'utf8');
            mainMenu();
        }
    });
}
