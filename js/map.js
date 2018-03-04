
function map() {
    const minZoom = 1;
    const maxZoom = 1; // maxZoom = minZoom, because it's kinda buggy somehow
    // create the map
    const map = L.map('map', {
        minZoom: minZoom,
        maxZoom: maxZoom,
        zoom: 1,
        crs: L.CRS.Simple,
    });

    const cellheight = 4096 / 161; // 4096 = 2x2048 (lat of the map's center). 161 = Number of map between left and right
    const cellwidth = 5120 / 144; // 5120 = 2x2560 (lng of the map's center). 144 = Number of map between the top and the bottom
    let dofus = [];
    dofus['lat'] = -cellheight * 100;
    dofus['lng'] = cellwidth * 94 - cellwidth / 4.5;

    const bounds = new L.LatLngBounds(map.unproject([0, 8192], maxZoom), map.unproject([10240, 0], maxZoom));

    map.fitBounds(bounds);

    L.tileLayer('./maps/1/{x}/{y}.jpg', {
        minZoom: minZoom,
        maxZoom: maxZoom,
        zoom: 1,
        noWrap: false,
        bounds: bounds,
    }).addTo(map);

    let xy = [];
    let storeXY = xy;
    let storeClick = xy;
    let mapXY = xy;
    let marker = {};
    let focused = false;
    //let mapArray = []; // Array<{latlng:['lat': number,'lng':number], actions:{fight:boolean, gather:boolean}}>
    let array;

    const rectangle = L.divIcon({
        iconSize: [2 * cellwidth, 2 * cellheight]
    });

    map.on('mousemove', (mouseEvent) => {
        xy = mapXYtoDofusXY(mouseEvent.latlng);
        if (((xy['lng'] !== storeXY['lng']) || (xy['lat'] !== storeXY['lat'])) && !focused) {
            storeXY = xy;
            storeClick = []; // reset storeClick
            mapXY = DofusXYtomapXY(xy);
            if (marker.isActive) {
                map.removeLayer(marker);
            }
            marker = L.marker([mapXY['lat'], mapXY['lng']], { icon: rectangle }).addTo(map);  
            marker.isActive = true;
            document.getElementById('coords').innerText = `[${xy['lng'].toString()},${xy['lat'].toString()}]`;
        }
    });

    map.on('click', (mouseEvent) => {
        xy = mapXYtoDofusXY(mouseEvent.latlng);
        if ((xy['lng'] !== storeClick['lng']) || (xy['lat'] !== storeClick['lat'])) {
            storeClick = xy;
            focused = true;
            mapXY = DofusXYtomapXY(xy);
            if (marker.isActive) {
                map.removeLayer(marker);
            }
            marker = L.marker([mapXY['lat'], mapXY['lng']], { icon: rectangle }).addTo(map);  
            marker.isActive = true;
            document.getElementById('coords').innerText = `[${xy['lng'].toString()},${xy['lat'].toString()}]`;
        } else {
            focused = false; // disable focus on click on a focused map
        }
    });

    function mapXYtoDofusXY(latlng) {
        array = [];
        array['lng'] = Math.round((latlng.lng - dofus['lng']) / cellwidth);
        array['lat'] = Math.round((-latlng.lat + dofus['lat']) / cellheight);
        return array;
    }

    function DofusXYtomapXY(xy) {
        array = [];
        array['lng'] = Math.round(xy['lng'] * cellwidth + dofus['lng']);
        array['lat'] = Math.round(-(xy['lat'] * cellheight - dofus['lat']));
        return array;
    }
}
