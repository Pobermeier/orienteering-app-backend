(function () {
  // Global App State
  const state = {
    initialMapCoords: [48.2082, 16.3738],
    initialMapZoomLevel: 13,
    currentMapCoords: null,
    groups: null,
  };

  // Server base url
  const serverBaseURI = 'https://orientierung.herokuapp.com';

  // UI references
  const addGroupForm = document.querySelector('#add-group-form');
  const groupName = document.querySelector('#name');
  const groupList = document.querySelector('#group-list');

  window.addEventListener('load', async () => {
    // Get initial data
    state.groups = await getAllGroups();
    console.log(state.groups);
    updateUI(state.groups);

    // Add Group functionality
    addGroupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await createGroup(groupName.value);
      groupName.value = '';
      state.groups = await getAllGroups();
      updateUI(state.groups);
    });

    // Delete Group Functionality
    groupList.addEventListener('click', async (e) => {
      if (e.target.classList.contains('btn')) {
        await deleteGroup(e.target.dataset.id);
        state.groups = await getAllGroups();
        updateUI(state.groups);
      }
    });

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

  async function getAllGroups() {
    const groups = (await axios(`${serverBaseURI}/group`)).data.groups;
    return groups;
  }

  async function createGroup(groupName) {
    try {
      await axios({
        method: 'post',
        url: `${serverBaseURI}/group`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { name: groupName },
      });
      console.log('Group successfully created!');
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteGroup(id) {
    try {
      await axios.delete(`${serverBaseURI}/group/${id}`);
      console.log('Group successfully deleted!');
    } catch (error) {
      console.error(error.message);
    }
  }

  function updateUI(groupData) {
    groupList.innerHTML = `
    <table class="table table-striped table-dark mt-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Group ID</th>
          <th scope="col">Group Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${groupData
          .map((group, index) => {
            return `
            <tr>
              <th scope="row">${index}</th>
              <td>${group.id}</td>
              <td>${group.name}</td>
              <td><button data-id="${group.id}" class="btn btn-danger">Delete</button></td>
            </tr>
          `;
          })
          .join('')}
      </tbody>
    </table>
    `;
  }
})();
