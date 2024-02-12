
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let gif = document.getElementById('gif');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songBottomName = document.getElementById("bottom-song-name");
let timestamp = document.getElementsByClassName('timestamp');
let logout = document.getElementsByClassName('logout');
let songs = [
    { songName: "Let Me Down Slowly ", filePath: "./songs/1.mp3", coverPath: "./images/let me down slowly.jpg" },
    { songName: "Can You hear the Night ", filePath: "./songs/2.mp3", coverPath: "./images/can you hear the night.jpg" },
    { songName: "Ed Sheeran perfect", filePath: "./songs/3.mp3", coverPath: "./images/perfect.jpg" },
    { songName: "I wanna be yours", filePath: "./songs/4.mp3", coverPath: "./images/i wanna be yours.png" },
    { songName: "Interstellar Theme", filePath: "./songs/5.mp3", coverPath: "./images/interstellar.jpg" },
    { songName: "Rosa Linn - Snap", filePath: "./songs/6.mp3", coverPath: "./images/snap.jpg" },
    { songName: "Sia-Snowman", filePath: ".songs/7.mp3", coverPath: "./images/snowman.jpg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

});




//music play or pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;
    }
})



//update seekbar
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})


//change music value with seekbar value
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})




const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        if (audioElement.paused || audioElement.currentTime <= 0) {
            songIndex = parseInt(e.target.id);
            audioElement.src = `./songs/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            songBottomName.innerText = songs[songIndex - 1].songName;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            e.target.classList.add('fa-circle-play');
            e.target.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            gif.style.opacity = 0;
        }
    })
})


// change to next song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `./songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    songBottomName.innerText = songs[songIndex - 1].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})


//return to previous song
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 7;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `./songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    songBottomName.innerText = songs[songIndex - 1].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

