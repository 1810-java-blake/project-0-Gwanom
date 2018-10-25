/* this code allows the window to function as a spotify player.. may not be needed?
window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQCTp8nzBITpVsdYNUakPxfxveB7JYgGRS8Tp1c3Uq4trYCIuHgk6CgUFAd-otN7Ievk2oRLkvfpJAjOiKK1gz0gunrJ1ZUmeEKvJoKEUvqS1zxIfuiZW23hjzbS1DZ_1t1xOh6aXcqMuNIpHbus0uHdp98xuVdfnioxEbv1r9Q';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();
  };*/

const baseURI = 'https://api.spotify.com/v1/';

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

app.get('/login', function(req, res) {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + my_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
    });

document.addEventListener("DOMContentLoaded", () => {
    let searchBtn = document.getElementById("searchButton");


    searchBtn.addEventListener("click", () => {
        let query = document.getElementById("searchText").value;
        let type = document.getElementById("typeSelect").value;

        fetch(`${baseURI}search?q=${query}&type=${type}`)
        .then((resp) => resp.json())
        .then(function(data) {
            let results = data.items;
            console.log(results);

        })
        .catch(function(error) {
            console.log(error);
        });
    });
});