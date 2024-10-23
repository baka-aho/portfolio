const musicData = {
  shout_baby: {
    src: "src/music/shout_baby.mp3",
    song: {
      name: "Shout Baby",
      url: "https://open.spotify.com/track/5K1m4aaPCxwnm9SKlWW1vh",
    },
    author: {
      name: "Ryokuoushoku Shakai",
      url: "https://open.spotify.com/artist/4SJ7qRgJYNXB9Yttzs4aSa",
    },
    image: "https://i.scdn.co/image/ab67616d00001e02323b6ecc2a6e0f2410a1956a",
  },
  daydream: {
    src: "src/music/daydream.mp3",
    song: {
      name: "蝶々結び",
      url: "https://open.spotify.com/track/3HxJaKzob7tdcr4qmqfR1d",
    },
    author: {
      name: "Aimer",
      url: "https://open.spotify.com/artist/0bAsR2unSRpn6BQPEnNlZm",
    },
    image: "https://i.scdn.co/image/ab67616d00001e02b56ada0ba61d7787fb213f72",
  },
};

const musicKeys = Object.keys(musicData);
const audioPlayer = document.getElementById("audioPlayer");
const slider = document.getElementById("sound-slider");
const volumeDisplay = document.getElementById("volume");
const loadingScreen = document.getElementById("loadingScreen");
const progressBar = document.getElementById("progress-bar");
const songImageElement = document.getElementById("song-image");
const songTitleElement = document.getElementById("song-title");
const artistNameElement = document.getElementById("artist-name");
const songLinkElement = document.getElementById("song-link");
const artistLinkElement = document.getElementById("artist-link");
const playPauseButton = document.getElementById("playPauseButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

let currentSongIndex = -1;
let isPlaying = false;

function getRandomMusicFile() {
  return Math.floor(Math.random() * musicKeys.length);
}

function updateMusicBox(musicKey) {
  const currentMusic = musicData[musicKey];
  songImageElement.src = currentMusic.image;
  songTitleElement.textContent = currentMusic.song.name;
  songLinkElement.href = currentMusic.song.url;
  artistNameElement.textContent = currentMusic.author.name;
  artistLinkElement.href = currentMusic.author.url;
}

function playMusic() {
  const musicKey = musicKeys[currentSongIndex];
  const currentMusic = musicData[musicKey];
  audioPlayer.src = currentMusic.src;
  audioPlayer.volume = slider.value / 100;
  updateMusicBox(musicKey);
  audioPlayer.play().catch((error) => {
    console.error("Error playing music:", error);
  });
  isPlaying = true;
  updatePlayPauseButton();
}

function togglePlayPause() {
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play().catch((error) => {
      console.error("Error playing music:", error);
    });
  }
  isPlaying = !isPlaying;
  updatePlayPauseButton();
}

function updatePlayPauseButton() {
  playPauseButton.innerHTML = isPlaying ? "&#10074;&#10074;" : "&#9654;"; // Pause or Play icon
}

loadingScreen.addEventListener("click", () => {
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
    const mainContent = document.getElementById("mainContent");
    mainContent.classList.add("visible");
    currentSongIndex = getRandomMusicFile();
    playMusic();
  }, 500);
});

function handleVolumeChange() {
  const volumeValue = slider.value;
  audioPlayer.volume = volumeValue / 100;
  volumeDisplay.innerHTML = volumeValue;
  updateAnimation(volumeValue);
}

function updateAnimation(volumeValue) {
  const percentage = (volumeValue / slider.max) * 100;
  document
    .getElementById("sound-slider__container")
    .style.setProperty("--percentage", `${percentage}%`);
}

slider.addEventListener("input", handleVolumeChange);

handleVolumeChange();

audioPlayer.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % musicKeys.length;
  playMusic();
});

audioPlayer.addEventListener("timeupdate", () => {
  const progressPercentage =
    (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progressPercentage}%`;
});

playPauseButton.addEventListener("click", togglePlayPause);

previousButton.addEventListener("click", () => {
  currentSongIndex =
    (currentSongIndex - 1 + musicKeys.length) % musicKeys.length;
  playMusic();
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % musicKeys.length;
  playMusic();
});
