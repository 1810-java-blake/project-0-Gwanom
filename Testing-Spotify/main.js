// window.onSpotifyWebPlaybackSDKReady = () => {
//     const token = 'BQCTp8nzBITpVsdYNUakPxfxveB7JYgGRS8Tp1c3Uq4trYCIuHgk6CgUFAd-otN7Ievk2oRLkvfpJAjOiKK1gz0gunrJ1ZUmeEKvJoKEUvqS1zxIfuiZW23hjzbS1DZ_1t1xOh6aXcqMuNIpHbus0uHdp98xuVdfnioxEbv1r9Q';
//     const player = new Spotify.Player({
//       name: 'Web Playback SDK Quick Start Player',
//       getOAuthToken: cb => { cb(token); },
//       volume: 0.5
//     });

//     // Error handling
//     player.addListener('initialization_error', ({ message }) => { console.error(message); });
//     player.addListener('authentication_error', ({ message }) => { console.error(message); });
//     player.addListener('account_error', ({ message }) => { console.error(message); });
//     player.addListener('playback_error', ({ message }) => { console.error(message); });

//     // Playback status updates
//     player.addListener('player_state_changed', state => { console.log(state); });

//     // Ready
//     player.addListener('ready', ({ device_id }) => {
//       console.log('Ready with Device ID', device_id);
//     });

//     // Not Ready
//     player.addListener('not_ready', ({ device_id }) => {
//       console.log('Device ID has gone offline', device_id);
//     });

//     // Connect to the player!
//     player.connect();
//   };

function ajax(url, method, success, failure) {
    let xhr = new XMLHttpRequest();
    //the ready state tells you the progress of
    //receiving the response
    xhr.onreadystatechange = () => {
        //handle the response
        console.log(xhr.readyState);
        //TODO: handle the response
        if (xhr.readyState === 4) {
            //we've received the full response
            let resJSON = xhr.response;
            if (xhr.status === 200) {//success
                let resObj = JSON.parse(resJSON);
                //use our callbacks
                success(resObj);
            } else {
                failure(resJSON, xhr.status);
            }
        }
    };

    //describing the request to be made
    xhr.open(method, url);

    //construct and send the request
    xhr.send();
    //the next thing that will happen is
    //readystatechange will fire a bunch of times
    console.log("end of ajax function");
}

document.addEventListener("DOMContentLoaded", () => {
    let x = document.getElementById("searchButton");
    x.addEventListener("click", event => {
        //params: url, success, failure
        ajax(
            "https://api.spotify.com/v1/search?q=estelle&type=track&market=US&limit=2",
            'GET',
            obj => {
                console.log(obj);
                joke.innerHTML = obj.value.joke;
            },
            (res, status) => {
                console.log(`Failure, status: ${status}`);
            }
        );
    });
});