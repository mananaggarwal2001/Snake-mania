const music = new Audio('../music/music.mp3');
music.play();
let localstoragescore = localStorage.getItem('hiScore');
let playlinkclass = document.getElementById('highscoreidentity');
if (localstoragescore === null) {
    playlinkclass.innerHTML = 0;
} else {
    playlinkclass.innerHTML = localstoragescore;
}