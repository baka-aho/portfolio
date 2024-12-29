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
  bokurawa: {
    src: "src/music/bokurawa.mp3",
    song: {
      name: "ギターと孤独と蒼い惑星",
      url: "https://open.spotify.com/track/6Y8Fs0a5ugGQXHYpULj6DG",
    },
    author: {
      name: "kessoku band",
      url: "https://open.spotify.com/artist/2nvl0N9GwyX69RRBMEZ4OD",
    },
    image: "https://i.scdn.co/image/ab67616d00001e02255ca949e450cb675edf715d",
  },
};

const musicKeys = Object.keys(musicData);

let currentSongIndex = -1;
let isPlaying = false;

const audioPlayer = document.getElementById("audioPlayer");
const loadingScreen = document.getElementById("loadingScreen");
const content = document.getElementById("content");
const header = document.getElementById("header");
const homeContent = document.getElementById("homeContent");
const lightbox = document.getElementById("lightbox"); // Declare lightbox here
const lightboxImage = document.getElementById("lightboxImage");
const lightboxVid = document.getElementById("lightboxVid");
const lightboxT = document.getElementById("lightboxT");

function getRandomMusicFile() {
  return Math.floor(Math.random() * musicKeys.length);
}

// Dynamic Music Playing Function
function playMusic() {
  const musicKey = musicKeys[currentSongIndex];
  const currentMusic = musicData[musicKey];
  audioPlayer.src = currentMusic.src;
  audioPlayer.volume = 0.15; // Set volume to 15%

  // Play the audio when ready
  audioPlayer.play().catch((error) => {
    console.error("Error playing music:", error);
  });
  isPlaying = true;
}

audioPlayer.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % musicKeys.length;
  playMusic();
});

// Handle Loading Screen Click
loadingScreen.addEventListener("click", () => {
  currentSongIndex = getRandomMusicFile(); // Get a random music
  playMusic();

  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    loadingScreen.classList.add("hidden");
  }, 500);
  setTimeout(() => {
    content.classList.remove("hidden");
    header.classList.remove("hidden");
    homeContent.classList.remove("hidden");
  }, 500);
});

// Change Content Dynamically
function changeContent(headerText, element) {
  const h1 = header.querySelector("h1");
  const oldText = h1.innerHTML;
  let currentText = oldText;
  let index = oldText.length;

  // Function to remove text
  const removeText = () => {
    if (index > 0) {
      currentText = currentText.slice(0, -1);
      h1.innerHTML = currentText;
      index--;
    } else {
      clearInterval(removeInterval);
      typeNewText();
    }
  };

  // Function to type new text
  const typeNewText = () => {
    let newIndex = 0;
    const typeInterval = setInterval(() => {
      if (newIndex < headerText.length) {
        currentText += headerText[newIndex];
        h1.innerHTML = currentText;
        newIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100); // Adjust typing speed here
  };

  const removeInterval = setInterval(removeText, 60);

  // Update menu items to reflect the current selection
  const menuItems = document.querySelectorAll(".menu");
  menuItems.forEach((item) => item.classList.remove("selected"));
  element.classList.add("selected");

  const contents = document.querySelectorAll(".content2");
  contents.forEach((item) => item.classList.add("hidden"));
  document.querySelector(`#${element.id}Content`).classList.remove("hidden");
}

//Gallery Code
count = 26;
mp4 = [12, 20, 21, 22, 23, 24, 25, 26]; // Array of indexes for video items (mp4 files)

const gallery = document.querySelector(`#galleryBox`);

let loadedImagesCount = 0; // Counter for loaded images

for (let i = 1; i <= count; i++) {
  if (!mp4.includes(i)) {
    // Check if it's not a video (not in the mp4 array)
    const imageSrc = `gallery/item${i}.png`;

    const imgElement = document.createElement("img");
    imgElement.alt = "image" + String(i);
    imgElement.classList.add("gallery-image");
    imgElement.style.border = "2px solid white";
    imgElement.loading = "Lazy";
    imgElement.src = imageSrc;

    imgElement.addEventListener("click", () => {
      openLightbox(imageSrc); // Open image in lightbox
    });

    gallery.appendChild(imgElement);
  } else {
    const videoSrc = `gallery/item${i}.mp4`;

    const vidElement = document.createElement("video");

    vidElement.src = videoSrc;
    vidElement.alt = "video" + String(i);
    vidElement.classList.add("gallery-video");
    vidElement.loading = "Lazy";
    vidElement.style.border = "2px solid white";

    const timestamp = document.createElement("div");
    timestamp.classList.add("gallery-video-timestamp");

    vidElement.addEventListener("loadedmetadata", () => {
      const duration = vidElement.duration;
      const totalMinutes = Math.floor(duration / 60);
      const totalSeconds = Math.floor(duration % 60);

      timestamp.textContent = `${totalMinutes}:${
        totalSeconds < 10 ? "0" + totalSeconds : totalSeconds
      }`;
    });

    const videoWrapper = document.createElement("div");
    videoWrapper.classList.add("gallery-image-wrapper");
    videoWrapper.appendChild(vidElement);
    videoWrapper.appendChild(timestamp);
    videoWrapper.addEventListener("click", () => {
      openLightbox(videoSrc);
    });

    gallery.appendChild(videoWrapper);
  }
}

const need = 6 - (count % 6);
console.log(need);
for (i = 0; i < need + 1; i++) {
  var lastImg = document.createElement("img");
  lastImg.src = "gallery/imagen.png";
  lastImg.classList.add("gallery-image");
  lastImg.style.height = "15px";
  gallery.appendChild(lastImg);
}

function openLightbox(src) {
  if (src.endsWith(".png")) {
    lightboxImage.src = src;
    lightboxImage.classList.remove("hidden");
    lightboxVid.classList.add("hidden");
    lightboxT.classList.add("hidden");
  } else {
    lightboxVid.src = src;
    lightboxVid.classList.remove("hidden");
    lightboxT.classList.remove("hidden");
    lightboxImage.classList.add("hidden");

    lightboxVid.play();
    audioPlayer.pause();

    if (!lightboxVid.hasEventListener) {
      lightboxVid.addEventListener("timeupdate", () => {
        const currentTime = lightboxVid.currentTime;
        const duration = lightboxVid.duration;

        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);

        lightboxT.textContent = `${minutes}:${
          seconds < 10 ? "0" + seconds : seconds
        } / ${totalMinutes}:${
          totalSeconds < 10 ? "0" + totalSeconds : totalSeconds
        }`;
      });
    }
  }

  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  if (lightboxVid.paused || !lightboxVid.paused || lightboxVid.ended) {
    lightboxVid.pause();
    audioPlayer.play();
  }

  lightbox.classList.add("hidden");
}

document.getElementById("lightbox").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeLightbox();
  }
});

document.getElementById("lightboxVid").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    if (lightboxVid.paused) {
      lightboxVid.play();
    } else {
      lightboxVid.pause();
    }
  }
});
