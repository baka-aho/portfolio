const musicData = {
  rust: {
    src: "src/music/rust.mp3",
    song: {
      name: "Rust",
      url: "https://open.spotify.com/track/7n6YSbstaBD94SQn03tb8N",
    },
    author: {
      name: "Evan Call",
      url: "https://open.spotify.com/artist/0nMGbTpPx4b3h5fMG9CpWJ",
    },
    image: "https://i.scdn.co/image/ab67616d00001e021cd127473c1065dceecb92d1",
  },
  ncb: {
    src: "src/music/never_coming_back.mp3",
    song: {
      name: "Never Coming Back",
      url: "https://open.spotify.com/track/3WvPn9OHnjQzwyN8Zd1xLJ",
    },
    author: {
      name: "Evan Call",
      url: "https://open.spotify.com/artist/0nMGbTpPx4b3h5fMG9CpWJ",
    },
    image: "https://i.scdn.co/image/ab67616d00001e021cd127473c1065dceecb92d1",
  },
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

currentSongIndex = -1;
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

// Example usage in the playMusic function
function playMusic() {
  const musicKey = musicKeys[currentSongIndex];
  const currentMusic = musicData[musicKey];

  console.log(
    "Playing",
    currentMusic.song.name,
    "by",
    currentMusic.author.name
  );

  showPopup(currentMusic.song.name, currentMusic.author.name);

  audioPlayer.src = currentMusic.src;
  audioPlayer.volume = 1;

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
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    loadingScreen.classList.add("hidden");
  }, 500);
  setTimeout(() => {
    content.classList.remove("hidden");
    header.classList.remove("hidden");
    homeContent.classList.remove("hidden");
  }, 500);

  currentSongIndex = Math.floor(Math.random() * 2);
  playMusic();
});

function showPopup(songName, authorName) {
  const popup = document.getElementById("popup");
  const songTitle = document.getElementById("songTitle");
  const authorNameElement = document.getElementById("authorName");

  // Set the song title and author name
  songTitle.textContent = songName;
  authorNameElement.textContent = authorName;

  // Show the popup with animation

  popup.classList.remove("hidden");
  setTimeout(() => {
    popup.classList.add("show"); // Trigger the show animation
  }, 1000); // Small timeout for triggering CSS transition

  setTimeout(() => {
    popup.classList.remove("show");

    setTimeout(() => {
      popup.classList.add("hidden");
    }, 1000); // Small timeout for triggering CSS transition
  }, 10000); // 3000ms = 3 seconds
}

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
const hidden = [];
const count = 35;
const pinned = [21, 12, 4];
const mp4 = [12, 20, 21, 22, 23, 24, 25, 26, 30, 31, 32, 33, 34, 35]; // Array of indexes for video items
const gallery = document.querySelector(`#galleryBox`);

const createElement = (i, isVideo) => {
  const src = isVideo ? `gallery/item${i}.mp4` : `gallery/item${i}.png`;
  const element = isVideo
    ? document.createElement("video")
    : document.createElement("img");
  element.src = src;
  element.alt = (isVideo ? "video" : "image") + i;
  element.classList.add("gallery-image");
  element.style.border = "2px solid white";
  element.loading = "lazy";

  // Wrapper div for each image/video
  const wrapper = document.createElement("div");
  wrapper.classList.add("gallery-image-wrapper");

  // Pin icon (added for pinned items only)
  if (pinned.includes(i)) {
    const pinIcon = document.createElement("div");
    pinIcon.classList.add("pin-icon");
    pinIcon.innerHTML = "📌"; // You can replace this with an image or SVG if needed

    // Add title for the hover tooltip
    pinIcon.title = isVideo
      ? "User pinned this video"
      : "User pinned this image";

    wrapper.appendChild(pinIcon); // Add pin icon to wrapper
  }

  // Append the image/video element to the wrapper
  wrapper.appendChild(element);

  if (isVideo) {
    const timestamp = document.createElement("div");
    timestamp.classList.add("gallery-video-timestamp");
    element.addEventListener("loadedmetadata", () => {
      const duration = element.duration;
      timestamp.textContent = `${Math.floor(duration / 60)}:${String(
        Math.floor(duration % 60)
      ).padStart(2, "0")}`;
    });
    wrapper.appendChild(timestamp); // Append timestamp for video items
  }

  wrapper.addEventListener("click", () => openLightbox(src));
  return wrapper;
};

// Add pinned items
pinned.forEach((i) => {
  if (!hidden.includes(i)) {
    gallery.appendChild(createElement(i, mp4.includes(i)));
  }
});

// Add other items
for (let i = 1; i <= count; i++) {
  if (!pinned.includes(i) && !hidden.includes(i)) {
    gallery.appendChild(createElement(i, mp4.includes(i)));
  }
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

// Game
const games = {
  wuwa: {
    name: "Wuthering Waves",
    src: "src/images/wuwa.jpg",
    alt: "wuwa",
  },
};

const gameGallery = document.getElementById("gameGallery");
const gameItems = document.querySelectorAll(".game-item");

const wuwaContent = document.getElementById("wuwa");
const valoContent = document.getElementById("valo");

gameItems.forEach((gameItem) => {
  gameItem.addEventListener("click", () => {
    const gameCover = gameItem.querySelector(".game-cover");
    const gameAlt = gameCover.alt;

    showContent(gameAlt);
  });
});

function showContent(name) {
  gameGallery.classList.add("hidden");
  if (name === "wuwa") {
    wuwaContent.classList.remove("hidden");
    valoContent.classList.add("hidden");
  } else if (name === "valo") {
    valoContent.classList.remove("hidden");
    wuwaContent.classList.add("hidden");
  }
}

function closeGameContent() {
  gameGallery.classList.remove("hidden");
  wuwaContent.classList.add("hidden");
  valoContent.classList.add("hidden");
}
