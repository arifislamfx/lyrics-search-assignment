
const searchSongs = () => {
    const inputText = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/${inputText}`;
   
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displaySongs(data.data.slice(0, 10))
    })
    .catch(err => {
        {err.message}
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong !'
          })
    })
    document.getElementById("search-field").value = '';

}

// create div to display song
const displaySongs = (songs) => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';

    songs.forEach(song => {
        const singleSongDiv = document.createElement('div');
        singleSongDiv.className = 'single-result row align-items-center my-3 p-3';
        singleSongDiv.innerHTML = 
         `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success"> Get Lyrics </button>
        </div>
        `
        songContainer.appendChild(singleSongDiv);
    })
}

    // get lyrics
    const getLyric = async(artist, title) => {

        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw Error();
            }
            const data = await res.json();
            displayLyrics(data.lyrics);
        } 
        catch (error) {  
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This song lyric currently not available!'
            })
        }

    }

    const displayLyrics = lyrics => {
        const lyricsDiv = document.getElementById('song-lyrics');
        lyricsDiv.innerText = lyrics;
    }

