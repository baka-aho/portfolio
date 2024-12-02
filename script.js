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
  scream: {
    src: "src/music/scream.mp3",
    song: {
      name: "すくりぃむ！",
      url: "https://open.spotify.com/track/7HkNdAaxSeDBxibDxJID0Q",
    },
    author: {
      name: "P丸様｡",
      url: "https://open.spotify.com/artist/4hUWwJ0fRLx9rYtUvT26Ii",
    },
    image: "https://i.scdn.co/image/ab67616d00004851fdb65c78f71172b6bfab977f",
  },
  glbp: {
    src: "src/music/glbp.mp3",
    song: {
      name: "ギターと孤独と蒼い惑星",
      url: "https://open.spotify.com/track/17rhDgnYYryQU4uS71ZxFu",
    },
    author: {
      name: "kessoku band",
      url: "https://open.spotify.com/artist/2nvl0N9GwyX69RRBMEZ4OD",
    },
    image: "https://i.scdn.co/image/ab67616d00001e02255ca949e450cb675edf715d",
  },
};

const musicKeys = Object.keys(musicData);
const audioPlayer = document.getElementById("audioPlayer");
const lyricsContentElement = document.getElementById("lyrics-content");
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

function loadLyrics(musicKey) {
  fetch(`src/lyrics/romaji/${musicKey}.txt`) // Ensure the file name matches the music key
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // Read the response as text
    })
    .then((data) => {
      // Replace newline characters with <br> for HTML rendering
      const formattedLyrics = data.replace(/\n/g, "<br>");
      lyricsContentElement.innerHTML = formattedLyrics; // Update the span with the formatted lyrics
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

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
  loadLyrics(musicKey);
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

const audioVisualizer = document.getElementById("audioVisualizer");
const canvasContext = audioVisualizer.getContext("2d");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audioPlayer);
source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 512; // Increase the FFT size for more bars
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Function to draw a rounded rectangle with only the top corners rounded
function drawRoundedRectTop(x, y, width, height) {
  canvasContext.beginPath();
  canvasContext.moveTo(x, y); // Move to the top-left corner
  canvasContext.lineTo(x + width, y); // Top edge
  canvasContext.quadraticCurveTo(x + width, y, x + width, y); // Top-right corner
  canvasContext.lineTo(x + width, y + height); // Right edge
  canvasContext.lineTo(x, y + height); // Bottom edge
  canvasContext.lineTo(x, y); // Left edge
  canvasContext.quadraticCurveTo(x, y, x, y); // Top-left corner
  canvasContext.closePath();
  canvasContext.fill();
}

function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);
  analyser.getByteFrequencyData(dataArray);

  // Clear the canvas with a transparent background
  canvasContext.clearRect(0, 0, audioVisualizer.width, audioVisualizer.height);

  const barWidth = (audioVisualizer.width / bufferLength) * 1.7; // Adjusted width for more bars
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    // Scale the bar height based on the frequency data
    barHeight = (dataArray[i] / 255) * (audioVisualizer.height - 20); // Scale to fit the canvas

    // Create a linear gradient for the bar
    const gradient = canvasContext.createLinearGradient(
      x,
      audioVisualizer.height - barHeight,
      x,
      audioVisualizer.height
    );

    const color1 = "#ffffff"; // Start color
    const color2 = "#ffffff"; // End color

    // Calculate the color stop positions
    const r = parseInt(color1.slice(1, 3), 16);
    const g = parseInt(color1.slice(3, 5), 16);
    const b = parseInt(color1.slice(5, 7), 16);

    // Calculate the opacity based on a sine wave for smooth blending
    const lowOpacity = 0.2; // Low opacity
    const highOpacity = 0.8; // High opacity

    // Calculate the normalized position of the bar
    const normalizedIndex = i / (bufferLength - 1); // Normalize to [0, 1]

    // Use a sine function to create a smooth transition
    const opacity =
      lowOpacity +
      (highOpacity - lowOpacity) *
        Math.abs(Math.sin(normalizedIndex * Math.PI)); // Smooth transition

    // Set the gradient colors
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity - 0.3})`); // Color at the bottom
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${opacity - 0.3})`); // Color at the top

    // Set the fill style to the gradient
    canvasContext.fillStyle = gradient;

    drawRoundedRectTop(
      x,
      audioVisualizer.height - barHeight,
      barWidth,
      barHeight
    );

    x += barWidth + 1; // Move to the next bar
  }
}

// Start the visualizer when the music starts playing
audioPlayer.addEventListener("play", () => {
  audioContext.resume().then(() => {
    drawVisualizer();
  });
});

// Resize the canvas to fit the window
window.addEventListener("resize", () => {
  audioVisualizer.width = window.innerWidth;
  audioVisualizer.height = window.innerHeight;
});
