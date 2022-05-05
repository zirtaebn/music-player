let tittle = document.getElementById('tittle');
let artist = document.getElementById('artist');
let song = document.getElementById('song');
let bar = document.getElementById('bar');
let song_progress = document.getElementById('song_progress');
let song_end = document.getElementById('end');
let random_bttn = document.getElementById('random');
let back = document.getElementById('back');
let play_pause = document.getElementById('play_pause');
let next = document.getElementById('next');
let repeat = document.getElementById('repeat');
let volume = document.getElementById('volume');
let volume_icon = document.getElementById('volume_icon');
let tracks = [0];
let track = JSON.parse(localStorage.getItem('track'));
let variable_index = 2;
let random = false;
let play = false;
let loop = false;
let muted = false;
let songs = [{

    tittle: 'Bum Bum Tam Tam',
    artist: 'Mc Fioti',
    song: './songs/bumbum.mp3',
},
{
    tittle: 'Meu Mundo',
    artist: 'Giulia Boderone',
    song: './songs/meumundo.mp3',
},
{
    tittle: 'Motive x Promiscuous',
    artist: 'Ariana Grande x Nelly Furtado',
    song: './songs/motive.mp3',
},
{
    tittle: 'No Filter',
    artist: 'Fifth Harmony',
    song: './songs/nofilter.mp3',
},
{
    tittle: 'One in a million',
    artist: 'Aaliyah',
    song: './songs/one.mp3',
},
{
    tittle: 'Para se Encontrar',
    artist: 'Giulia Boderone',
    song: './songs/paraseencontrar.wav',
},
]

document.addEventListener('DOMContentLoaded', () => {

    bar.addEventListener('click', setSongProgress);
    song.addEventListener('timeupdate', songProgress);
    random_bttn.addEventListener('click', randomSong);
    back.addEventListener('click', resetSong);
    back.addEventListener('dblclick', goBack);
    play_pause.addEventListener('click', playPauseSong);
    next.addEventListener('click', goNext);
    repeat.addEventListener('click', repeatSong);
    volume.addEventListener('mousemove', setVolume);
    volume_icon.addEventListener('click', muteUnmuteSong);   

    loadTrack(track);
})

function loadTrack(track){

    tittle.innerHTML = songs[track].tittle;
    artist.innerHTML = songs[track].artist;
    song.src = songs[track].song;  
    song.addEventListener('loadedmetadata', () => {
        song_end.innerHTML = secondsToMinutes(Math.floor(song.duration));
    });
}

function loadPlay(){

    song.autoplay = true;
    play = false;
    playPauseSong();
}


function songProgress(){

    song_progress.style.width = Math.floor((song.currentTime / song.duration) * 100) + '%';

    let song_start = document.getElementById('start');
    song_start.innerHTML = secondsToMinutes(Math.floor(song.currentTime));

    if(random){

        if(song.currentTime == song.duration){

            goNextRandom();
        }
    }else{

        if(song.currentTime == song.duration){

            goNext();
        }
    }
}


function secondsToMinutes(seconds){

    let minutes_part = Math.floor(seconds / 60); 
    let seconds_part = seconds % 60;

    if(seconds_part < 10){

        seconds_part = '0' + seconds_part;
    }

    return minutes_part + ':' + seconds_part;
}


function setSongProgress(event){

    song.currentTime = ((event.offsetX / bar.offsetWidth) * song.duration);
}


function randomSong(){

    if(random == false){

        random = true;
        random_bttn.src = './images/randomon.png';

        back.removeEventListener('dblclick', goBack);
        back.addEventListener('dblclick', goBackRandom);

        next.removeEventListener('click', goNext);
        next.addEventListener('click', goNextRandom);
    }else{

        random = false;
        random_bttn.src = './images/randomoff.png';


        back.removeEventListener('dblclick', goBackRandom);
        back.addEventListener('dblclick', goBack);


        next.removeEventListener('click', goNextRandom);
        next.addEventListener('click', goNext); 
    } 
}


function goBackRandom(){
   
    let lastIndex = tracks.length - variable_index;

    if(lastIndex >= 0){

        loadTrack(tracks[lastIndex]);
        loadPlay();
        variable_index++;
    }

    saveTrack();
}


function goNextRandom(){

    let currentIndex = tracks.length - 1;

    track = Math.floor(Math.random() * songs.length);

    if(tracks[currentIndex] !== track){

        loadTrack(track);
        loadPlay();
        tracks.push(track);
    }else{

        return;
    }

    saveTrack();
}


function resetSong(){
    song.currentTime = 0;
}


function goBack(){

    if(track !== 0){

        track--;
        loadTrack(track);
        loadPlay();
        tracks.push(track);
    }else{

        return;
    }

    saveTrack();
}


function playPauseSong(){

    if(play == false){

        play = true;
        play_pause.src = './images/pause.png';
        song.play();
    }else{

        play = false;
        play_pause.src = './images/play.png';
        song.pause();
    }
}


function goNext(){

    if(track < songs.length - 1){
        
        track++;
    }else{

        track = 0;   
    }

    loadTrack(track);
    loadPlay();
    tracks.push(track);

    saveTrack();
}


function repeatSong(){

    if(loop == false){

        loop = true;
        repeat.src = './images/repeaton.png'
        song.loop = true;  
    }else{

        loop = false;
        repeat.src = './images/repeatoff.png'
        song.loop= false;
    }
}


function setVolume(){

    song.volume = volume.value / 100;

    if(volume.value == 0){

        volume_icon.src = './images/muted.png';
    }else{

        volume_icon.src = './images/unmuted.png';
    }
}


function muteUnmuteSong(){

    if(muted == false){
        
        song.muted = true;
        volume.value = 0;
        volume_icon.src = './images/muted.png';
        muted = true;
    }else{
        
        song.muted = false;
        volume.value = 20;
        volume_icon.src = './images/unmuted.png';
        muted = false;
    }
}

function saveTrack(){

    localStorage.setItem('track', JSON.stringify(track));
    localStorage.setItem('random', JSON.stringify(random));
}





