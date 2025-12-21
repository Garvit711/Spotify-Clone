
let CurrIndex = 1;
let audioElement = new Audio('Songs/Song1.mp3');
let master = document.getElementById('master');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('SongItem'));
let songs = [
    {songname: "Faded - Alan Walker", filePath: "Songs/Song1.mp3", coverPath: "covers/Cover1.jpg"},
    {songname: "On & On - Cartoon ", filePath: "Songs/Song2.mp3", coverPath: "covers/Cover2.jpg"},
    {songname: "Fearless Pt-2", filePath: "Songs/Song3.mp3", coverPath: "covers/Cover3.jpg"},
    {songname: "Heroes Tonight", filePath: "Songs/Song4.mp3", coverPath: "covers/Cover4.jpg"},
    {songname: "Fearless Phonk", filePath: "Songs/Song5.mp3", coverPath: "covers/Cover5.jpg"},
]
songItems.forEach(function(element, i){
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerHTML = songs[i].songname;
})

master.addEventListener('click', function(){
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        master.classList.remove('fa-play');
        master.classList.add('fa-pause');
        checkId();
    }
    else{
        audioElement.pause();
        master.classList.remove('fa-pause');
        master.classList.add('fa-play');
        makeplays();

    }
})
audioElement.addEventListener('timeupdate', function(){
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});
myProgressBar.addEventListener('change', function(){
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

let playsongs = Array.from(document.getElementsByClassName('songitemplay'));
const makeplays = function(){
    playsongs.forEach(function(element){
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
const checkId = function(){
   playsongs.forEach(function(element){
     if(element.id == CurrIndex){
        element.classList.remove('fa-play');
        element.classList.add('fa-pause');
     }
   })
}
playsongs.forEach(function(element){
  element.addEventListener('click', function(e){
    makeplays();
   let index = parseInt(e.target.id);
   CurrIndex = index;
    e.target.classList.remove('fa-play');
    e.target.classList.add('fa-pause');
    audioElement.src = `Songs/Song${CurrIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
     master.classList.remove('fa-play');
    master.classList.add('fa-pause');

  })
});

let prev = document.getElementById("previous");
prev.addEventListener('click', function(){
  if(CurrIndex === 1){
    CurrIndex = 5;
  }
  else{
    CurrIndex --;
  }
    makeplays();
    checkId();
    audioElement.src = `Songs/Song${CurrIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
     master.classList.remove('fa-play');
     master.classList.add('fa-pause');
})

let forw = document.getElementById("forward");
forw.addEventListener('click', function(){
  if(CurrIndex === 5){
    CurrIndex = 1;
  }
  else{
    CurrIndex ++;
  }
    makeplays();
    checkId();
    audioElement.src = `Songs/Song${CurrIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
     master.classList.remove('fa-play');
     master.classList.add('fa-pause');
})