// Coordinates for Oslo (lat, lon)
const oslo = [59.9139, 10.7522];

// Create the map and zoom to Oslo
const map = L.map("map").setView(oslo, 6);

// Load OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Add click listener to show popup with coordinates
map.on("click", async (e) => {
  const url = new URL("/waves", window.location.origin);
  const params = url.searchParams;
  params.append("lat", e.latlng.wrap().lat);
  params.append("lon", e.latlng.wrap().lng);

  let content = "";
  const response = await fetch(new Request(url));
  try {
    const result = await response.json();
    content = `Max wave height here on 2019-01-01: ${result}`;
  } catch {
    content = "Could not fetch data for this point";
  }

  L.popup().setLatLng(e.latlng).setContent(content).openOn(map);
});
