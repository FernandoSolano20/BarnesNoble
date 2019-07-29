function initMap(haightAshbury, zoom) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: haightAshbury
    });
}

function addMarker(position, message) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
    attachSecretMessage(marker, message);
}

function attachSecretMessage(marker, message) {
    var infowindow = new google.maps.InfoWindow({
        content: message
    });

    marker.addListener('click', function () {
        infowindow.open(marker.get('map'), marker);
    });
}