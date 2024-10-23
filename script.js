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
  kaze_ni_naru: {
    src: "src/music/kaze_ni_naru.mp3",
    song: {
      name: "風になる",
      url: "https://open.spotify.com/track/1BMYkyKXS6UfnJteWN7nSD",
    },
    author: {
      name: "Tsuji Ayano",
      url: "https://open.spotify.com/artist/73kAoAaI4yjMeHuLwpsL4i",
    },
    image: "https://i.scdn.co/image/ab67616d00001e029385cab000124c1c28004e1d",
  },
  luna_say_maybe: {
    src: "src/music/luna_say_maybe.mp3",
    song: {
      name: "Luna Say Maybe",
      url: "https://open.spotify.com/track/3KWXtICkXcWYxGCtoEWRnn",
    },
    author: {
      name: "初星学園",
      url: "https://open.spotify.com/artist/4C9binD0PqNg8nLD93FQpr",
    },
    image: "https://i.scdn.co/image/ab67616d00001e02edb05625dc040ccef179728a",
  },
  about_you: {
    src: "src/music/about_you.mp3",
    song: {
      name: "About You",
      url: "https://open.spotify.com/track/05T6kBhvKlT8wihugMB6qZ",
    },
    author: {
      name: "ロクデナシ",
      url: "https://open.spotify.com/artist/4kpQdAU7yPjqtiJsFcBTBb",
    },
    image: "https://i.scdn.co/image/ab67616d00001e0230e170348c2f874483863662",
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

const songItemsContainer = document.getElementById("songItems");
const songListContainer = document.querySelector(".song-list");
const iconContainer = document.querySelector(".icon-container");

function createSongList() {
  musicKeys.forEach((key) => {
    const song = musicData[key];
    const songItem = document.createElement("div");
    songItem.className = "song-item";
    songItem.innerHTML = `
      <img src="${song.image}" alt="${song.song.name} cover" class="song-image">
      <p>${song.song.name} - ${song.author.name}</p>
    `;

    // Add click event to play the song
    songItem.addEventListener("click", () => {
      currentSongIndex = musicKeys.indexOf(key); // Set the current song index
      playMusic(); // Play the selected song
    });

    songItemsContainer.appendChild(songItem);
  });
}

// Call the function to create the song list
createSongList();

// Event listeners for showing/hiding the icon and loading song items
songListContainer.addEventListener("mouseenter", () => {
  iconContainer.style.display = "none"; // Hide icon when expanded
  // Load song items after a slight delay
  setTimeout(() => {
    songItemsContainer.style.opacity = "1"; // Fade in song items
  }, 300); // Adjust the delay as needed
});

songListContainer.addEventListener("mouseleave", () => {
  songItemsContainer.style.opacity = "0"; // Fade out song items
  setTimeout(() => {
    iconContainer.style.display = "block"; // Show icon when contracted
  }, 400); // Adjust the delay as needed
});

const songItems = document.querySelectorAll(".song-item");

// Add hover event listeners to each song item
songItems.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    // Scale down the previous item if it exists
    if (index > 0) {
      songItems[index - 1].classList.add("scale-down");
    }
    // Scale down the next item if it exists
    if (index < songItems.length - 1) {
      songItems[index + 1].classList.add("scale-down");
    }
  });

  item.addEventListener("mouseleave", () => {
    // Remove the scale-down class from the previous item
    if (index > 0) {
      songItems[index - 1].classList.remove("scale-down");
    }
    // Remove the scale-down class from the next item
    if (index < songItems.length - 1) {
      songItems[index + 1].classList.remove("scale-down");
    }
  });
});
