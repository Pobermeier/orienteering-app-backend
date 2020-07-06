const mymap = L.map('map').setView([48.2082, 16.3738], 13);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicG9iZXI4NyIsImEiOiJja2NhOXlvbjYxcW5yMnRxcDBkMDNrYXIwIn0.UaUjxYt6cPkzxNOzwIgIYw',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1IjoicG9iZXI4NyIsImEiOiJja2NhOXlvbjYxcW5yMnRxcDBkMDNrYXIwIn0.UaUjxYt6cPkzxNOzwIgIYw',
  },
).addTo(mymap);
