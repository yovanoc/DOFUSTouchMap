const { writeFileSync, readFileSync, existsSync, mkdirSync } = require('fs');

function update() {
    const dir = __dirname + '/ids';
    if (!existsSync(dir)) mkdirSync(dir);
    const versionFile = dir + '/assetsVersion.json';
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
                writeFileSync(`${dir}/Monsters.json`, JSON.stringify(monstersArr));
                clearInterval(intervalMonsters);
            }
        }, 2000);
    
        const intervalItems = setInterval(() => {
            if (unknownsArr.length !== 0) {
                writeFileSync(`${dir}/Items.json`, JSON.stringify(unknownsArr));
                writeFileSync(`${dir}/Consumables.json`, JSON.stringify(consumablesArr));
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
            resourcesIds = readFileSync(`${dir}/Resources.json`, 'utf8'); // Resources is never downloaded
            monstersIds = monstersArr;
            itemsIds = unknownsArr;
            consumablesIds = consumablesArr;
            mainMenu();
        } else {
            monstersIds = readFileSync(`${dir}/Monsters.json`, 'utf8');
            itemsIds = readFileSync(`${dir}/Items.json`, 'utf8');
            consumablesIds = readFileSync(`${dir}/Consumables.json`, 'utf8');
            resourcesIds = readFileSync(`${dir}/Resources.json`, 'utf8');
            mainMenu();
        }
    });
}
