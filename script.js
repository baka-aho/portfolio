const musicFiles = ["src/music/shout_baby.mp3", "src/music/daydream.mp3"]; // Your music files
const audioPlayer = document.getElementById("audioPlayer");
const slider = document.getElementById("sound-slider");
const volumeDisplay = document.getElementById("volume");
const loadingScreen = document.getElementById("loadingScreen");
const progressBar = document.getElementById("progress-bar");

let currentSongIndex = -1; // Initialize current song index

function getRandomMusicFile() {
  const randomIndex = Math.floor(Math.random() * musicFiles.length);
  return randomIndex; // Return the random index instead of the file
}

// Function to play music
function playMusic() {
  currentSongIndex = getRandomMusicFile(); // Get a random song index
  audioPlayer.src = musicFiles[currentSongIndex]; // Set the audio source
  audioPlayer.volume = slider.value / 100; // Set initial volume from the slider (0-100)
  audioPlayer.play().catch((error) => {
    console.error("Error playing music:", error);
  });
}

// Function to handle loading overlay click
loadingScreen.addEventListener("click", () => {
  loadingScreen.style.opacity = "0"; // Start fade out
  document.body.style.overflow = "hidden"; // Prevent background scrolling
  setTimeout(() => {
    loadingScreen.style.display = "none"; // Hide after fade out
    document.body.style.overflow = ""; // Re-enable scrolling
  }, 1000); // Match this duration with the CSS transition duration
  playMusic(); // Play music after user clicks
});
// Function to handle volume changes
function handleVolumeChange() {
  const volumeValue = slider.value;
  audioPlayer.volume = volumeValue / 100; // Convert to a 0-1 range
  volumeDisplay.innerHTML = volumeValue; // Update the displayed volume
  updateAnimation(volumeValue); // Update animation based on volume
}

// Function to update animation based on volume
function updateAnimation(volumeValue) {
  const percentage = (volumeValue / slider.max) * 100;
  document
    .getElementById("sound-slider__container")
    .style.setProperty("--percentage", `${percentage}%`);
}

// Set up event listener for the sound slider
slider.addEventListener("input", handleVolumeChange);

// Initialize the volume display
handleVolumeChange(); // Set initial display value

// Event listener for when the song ends
audioPlayer.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % musicFiles.length; // Loop back to 0 if at the end
  audioPlayer.src = musicFiles[currentSongIndex]; // Set the next song
  audioPlayer.play().catch((error) => {
    console.error("Error playing next music:", error);
  });
});

// Update progress bar as the song plays
audioPlayer.addEventListener("timeupdate", () => {
  const progressPercentage =
    (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progressPercentage}%`; // Update the width of the progress bar
});
