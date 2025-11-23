// Coordinates for Oslo (lat, lon)
const oslo = [59.9139, 10.7522];

// Create the map and zoom to Oslo
const map = L.map('map').setView(oslo, 6);

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add click listener to show popup with coordinates
map.on('click', function(e) {
    const lat = e.latlng.lat.toFixed(6);
    const lng = e.latlng.lng.toFixed(6);

    L.popup()
        .setLatLng(e.latlng)
        .setContent(`Latitude: ${lat}<br>Longitude: ${lng}`)
        .openOn(map);
});
