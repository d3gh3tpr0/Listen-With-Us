console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.querySelector('#masterPlay');
let myProgressBar = document.querySelector('#myProgressBar');
let gif = document.querySelector('#gif');
let masterSongName = document.querySelector('#masterSongName');
let songItems = document.querySelector('.songItemContainer');
let searchBar = document.querySelector('#searchBar');
let volumeIcon = document.querySelector('.volumeIcon');
let volumeControl = document.querySelector('#volumeControl');
let random = document.querySelector('#random');
let repeat = document.querySelector('#repeat');
let navBar = document.querySelector('.nav-bar');
let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

const displayMusicTag = (songs) =>{
    const htmlString = songs.map((song, index)=>{
        return `
        <div class="songItem">
            <img alt="1" src="${song.coverPath}">
            <span class="songName">${song.songName}</span>
            <span class="songlistplay"><span class="timestamp"><i id=${index} class="far songItemPlay fa-play-circle"></i> </span></span>
        </div>
    `;
    })
    .join('');
    songItems.innerHTML = htmlString;
}; 
displayMusicTag(songs);

searchBar.addEventListener('keyup', (e) =>{
    const searchString = e.target.value.toLowerCase();
    const filterMusicTags = songs.filter((song)=>{
        return (
            
            song.songName.toLowerCase().includes(searchString)
        )
    })
    displayMusicTag(filterMusicTags);
});

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        
        if (e.target.classList.contains('fa-play-circle')){
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            
            let bSrc = `http://127.0.0.1:5500/Nhom%209/test/songs/${songIndex + 1}.mp3`;
            if (audioElement.src != bSrc){
                audioElement.src = bSrc;
            }
            masterSongName.innerText = songs[songIndex].songName;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else if (e.target.classList.contains('fa-pause-circle')){
            makeAllPlays();
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
        
        
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
})

volumeControl.addEventListener('change', ()=> {
    audioElement.volume = volumeControl.value/100; 
})
let checkVol = true;
let vol = 0;
volumeIcon.addEventListener('click', ()=>{
    if(checkVol){
        checkVol = false;
        volumeIcon.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        vol = volumeControl.value/100;
        audioElement.volume = 0;
        volumeControl.value = 0;
    }
    else {
        checkVol = true;
        volumeIcon.innerHTML = `<i class="fa-solid fa-volume-high" ></i>`;
        audioElement.volume = vol;
        volumeControl.value = vol*100;
    }
})


repeat.addEventListener('click', ()=>{
    if(!audioElement.loop){
        audioElement.loop = true;
        repeat.classList.toggle('style-repeat');
    }
    else{
        audioElement.loop = false;
        repeat.classList.toggle('style-repeat')
    }
})

let checkRandom = false;
let indexRandom = 0;
random.addEventListener('click', ()=>{
    if(!checkRandom){
        checkRandom = true;
        do {
            indexRandom = Math.floor(Math.random()*songs.length);
        }while(indexRandom===songIndex)
        songIndex = indexRandom;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        random.classList.toggle('style-repeat');
    }
    else{
        checkRandom = false;
        random.classList.toggle('style-repeat');
    }
})

audioElement.onended = ()=>{
    if(!audioElement.loop && checkRandom == true){
        do {
            indexRandom = Math.floor(Math.random()*songs.length);
        }while(indexRandom===songIndex)
        songIndex = indexRandom;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else if(!audioElement.loop && checkRandom != true){
        if(songIndex>=9){
            songIndex = 0
        }
        else{
            songIndex += 1;
        }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
}



let register_button = document.querySelector('.register-button');
let modal = document.querySelector('.modal');

register_button.addEventListener('click', ()=>{
    modal.classList.toggle('active');
    modal.innerHTML = `<div class="modal__overlay"></div>
    <div class="modal__body">
        <div class="modal__inner">
            <div class="auth-form">
                <div class="auth-form__logo">
                    <img src="logo.png" alt="logo" class="auth-form__logo logo">
                </div>
                
                <div class="auth-form__header">
                    <h3 class="auth-form__heading">Register</h3>
                    <span class="auth-form__switch-btn" style="cursor: pointer">Login</span>
                </div>

                <div class="auth-form__form">
                    <div class="auth-form_group">
                        <input type="text" class="auth-form__input" placeholder="Enter your email">
                    </div>
                    <div class="auth-form__group">
                        <input type="password" class="auth-form__input" placeholder="Enter your password">
                    </div>
                    <div class="auth-form__group">
                        <input type="password" class="auth-form__input" placeholder="Enter your password again">
                    </div>
                </div>
                <div class="auth-form__aside">
                    <p class="auth-form__policy-text">
                        By registering, you agree with us about our
                        <a href="" class="auth-form__policy-link">terms of service</a> &
                        <a href="" class="auth-form__policy-link">privacy policy</a>
                    </p>
                </div>
                <div class="auth-form__control">
                    <button class="btn">Back</button>
                    <button class="btn btn--primary">Register</button>
                </div>
                <div class="auth-form__socials">
                    <a href="https://www.facebook.com" class="btn btn--with-icon">
                        Connect with Facebook
                        <i class="fa-brands fa-facebook"></i>
                    </a>
                    <a href="https://www.google.com" class="btn btn--with-icon">
                        Connect with Google
                        <i class="fa-brands fa-google-plus"></i>
                    </a>
                </div>
            </div>
        </div>
                        </div> `;
    let click_overlay = document.querySelector('.modal__overlay');
    click_overlay.addEventListener('click', () => {
        modal.classList.toggle('active');
    });
});

let login_button = document.querySelector('.login-button');
login_button.addEventListener('click', () => {
    modal.classList.toggle('active');
    modal.innerHTML = `<div class="modal__overlay"></div>
    <div class="modal__body">
        <div class="modal__inner">
            <div class="auth-form">
                <div class="auth-form__logo">
                    <img src="logo.png" alt="logo" class="auth-form__logo logo">
                </div>
                
                <div class="auth-form__header">
                    <h3 class="auth-form__heading">Login</h3>
                    <span class="auth-form__switch-btn" style="cursor: pointer">Register</span>
                </div>

                <div class="auth-form__form">
                    <div class="auth-form_group">
                        <input type="text" class="auth-form__input" placeholder="Enter your email" id="username">
                    </div>
                    <div class="auth-form__group">
                        <input type="password" class="auth-form__input" placeholder="Enter your password" id="password">
                    </div>
            
                </div>
                <div class="auth-form__aside">
                    <p class="auth-form__policy-text">
                        By logging, you agree with us about our
                        <a href="" class="auth-form__policy-link">terms of service</a> &
                        <a href="" class="auth-form__policy-link">privacy policy</a>
                    </p>
                </div>
                <div class="auth-form__control">
                    <button class="btn">Back</button>
                    <button class="btn btn--primary">Login</button>
                </div>
                <div class="auth-form__socials">
                    <a href="https://www.facebook.com" class="btn btn--with-icon">
                        Connect with Facebook
                        <i class="fa-brands fa-facebook"></i>
                    </a>
                    <a href="https://www.google.com" class="btn btn--with-icon">
                        Connect with Google
                        <i class="fa-brands fa-google-plus"></i>
                    </a>
                </div>
            </div>
        </div>
                        </div>`;
    let click_overlay = document.querySelector('.modal__overlay');
    click_overlay.addEventListener('click', () => {
        modal.classList.toggle('active');
    });

    let click_login = document.querySelector('.btn--primary');
    
    click_login.addEventListener('click', () => {
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
        if (username == "admin" && password=="admin"){
            modal.classList.toggle('active');
            let login_board = document.querySelector('.login');
            login_board.classList.toggle('active');
            let user = document.querySelector('.user-info');
            user.classList.toggle('active');
        }
    });

});

let logout_btn = document.querySelector('.logout-button');
if (logout_btn!=null) {
    logout_btn.addEventListener('click', () =>{
        let login_board = document.querySelector('.login');
        login_board.classList.toggle('active');
        let user = document.querySelector('.user-info');
        user.classList.toggle('active');
        check_login = false;
    });

}



/*
async function getText(file) {
  let myObject = await fetch(file);
  let a = await myObject.json();
  console.log(a.data[0].name);
}

getText('data.json');
*/
    


/*
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/


