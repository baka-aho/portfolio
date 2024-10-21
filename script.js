const musicFiles = ["src/music/shout_baby.mp3"]; // Your music file
const audioPlayer = document.getElementById("audioPlayer");
const slider = document.getElementById("sound-slider");
const volumeDisplay = document.getElementById("volume");
const loadingScreen = document.getElementById("loadingScreen");

// Function to play music
function playMusic() {
  audioPlayer.src = musicFiles[0]; // Set the audio source
  audioPlayer.volume = slider.value / 100; // Set initial volume from the slider (0-100)
  audioPlayer.play().catch((error) => {
    console.error("Error playing music:", error);
  });
}

// Function to handle loading overlay click
loadingScreen.addEventListener("click", () => {
  loadingScreen.style.opacity = "0"; // Start fade out
  setTimeout(() => {
    loadingScreen.style.display = "none"; // Hide after fade out
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
