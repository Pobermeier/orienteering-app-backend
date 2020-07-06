// https://orientierung.herokuapp.com

(function () {
  // Global App State
  const state = {
    initialMapCoords: [48.2082, 16.3738],
    initialMapZoomLevel: 13,
    currentMapCoords: null,
    groups: null,
  };

  window.addEventListener('load', () => {
    // Init Leaflet map and get current position
    navigator.geolocation.getCurrentPosition((position) => {
      const currentPosition = [
        position.coords.latitude,
        position.coords.longitude,
      ];

      state.currentMapCoords = currentPosition
        ? currentPosition
        : state.initialMapCoords;

      // Init leaflet map once when "Manage Locations" tab is clicked
      document.getElementById('locations-tab').addEventListener(
        'click',
        () => {
          setTimeout(() => {
            // Init Leaflet Map
            const mymap = L.map('map').setView(
              state.currentMapCoords,
              state.initialMapZoomLevel,
            );

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mymap);
          }, 500);
        },
        { once: true },
      );
    });
  });
})();
