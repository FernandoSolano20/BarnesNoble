let map;
let markers = [];

function initMap() {
    let haightAshbury = { lat: 9.9281, lng: -84.0907 };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: haightAshbury,
    });
    map.addListener('click', function (event) {
        addMarker(event.latLng);
    });
}
function addMarker(location) {
    if (markers.length === 0) {
        let marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    }
}
function clearMarkers() {
    setMapOnAll(null);
}
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}