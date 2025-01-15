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
    alt: {
      song: "Rust",
      author: "Evan Call",
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
    alt: {
      song: "Never Coming Back",
      author: "Evan Call",
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
    alt: {
      song: "Shout Baby",
      author: "Ryokuoushoku Shakai",
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

    alt: {
      song: "Scream",
      author: "P Maru-sama",
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

    alt: {
      song: "Guitar, Solitude, and the Blue Planet",
      author: "kessoku band",
    },
    image: "https://i.scdn.co/image/ab67616d00001e02255ca949e450cb675edf715d",
  },
  bokurawa: {
    src: "src/music/bokurawa.mp3",
    song: {
      name: "Bokura wa Kyou mo Kuruma no Naka",
      url: "https://open.spotify.com/track/6Y8Fs0a5ugGQXHYpULj6DG",
    },
    author: {
      name: "Hump Back",
      url: "https://open.spotify.com/artist/0zgpYPDY3hFaK1DqbWgCjI",
    },
    alt: {
      song: "Bokura wa Kyou mo Kuruma no Naka",
      author: "Hump Back",
    },
    image: "https://i.scdn.co/image/ab67616d00001e02a1757f611ad4de77292cb1c9",
  },
};

const musicKeys = Object.keys(musicData);

currentSongIndex = -1;
let isPlaying = false;
let isPaused = false;

const audioPlayer = document.getElementById("audioPlayer");
const loadingScreen = document.getElementById("loadingScreen");
const content = document.getElementById("content");
const header = document.getElementById("header");
const homeContent = document.getElementById("homeContent");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxVid = document.getElementById("lightboxVid");
const lightboxT = document.getElementById("lightboxT");

const lyricsContent = document.querySelector("#lyricsTab .lyrics");
const musicImage = document.querySelector(".musicImage");
const infoContainer = document.querySelector(".infoContainer");
const floatingWindow = document.getElementById("floatingWindow");

function getRandomMusicFile() {
  return Math.floor(Math.random() * musicKeys.length);
}

let isShuffleEnabled = false;
let playedSongs = [];

function toggleShuffle() {
  isShuffleEnabled = !isShuffleEnabled;
  playedSongs = [];
  console.log("Shuffle mode:", isShuffleEnabled ? "Enabled" : "Disabled");
}

function getRandomUnplayedSongIndex() {
  if (playedSongs.length === musicKeys.length) {
    playedSongs = [];
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * musicKeys.length);
  } while (playedSongs.includes(randomIndex));

  playedSongs.push(randomIndex);
  return randomIndex;
}

function playMusic() {
  if (isShuffleEnabled) {
    currentSongIndex = getRandomUnplayedSongIndex();
  }
  const musicKey = musicKeys[currentSongIndex];
  const currentMusic = musicData[musicKey];

  console.log(
    "Playing",
    currentMusic.song.name,
    "by",
    currentMusic.author.name
  );

  showPopup(currentMusic.song.name, currentMusic.author.name);

  // Fetch the lyrics using the musicKey
  const lyricsFilePath = `src/lyrics/romaji/${musicKey}.txt`;

  fetch(lyricsFilePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((lyrics) => {
      const formattedLyrics = lyrics.replace(/\n/g, "<br>");
      lyricsContent.innerHTML = formattedLyrics; //
    })
    .catch((error) => {
      lyricsContent.textContent = "No lyrics available";
    });

  musicImage.src = currentMusic.image;
  musicImage.title = `${currentMusic.song.name} by ${currentMusic.author.name}`;

  const paragraphs = infoContainer.querySelectorAll("p");
  paragraphs[0].innerHTML = `<a href="${currentMusic.song.url}" target="_blank" title="${currentMusic.alt.song}" class="song-link">${currentMusic.song.name}</a>`;

  // Update author paragraph with a hyperlink
  paragraphs[1].innerHTML = `<a href="${currentMusic.author.url}" target="_blank" title="${currentMusic.alt.author}" class="author-link">${currentMusic.author.name}</a>`;

  audioPlayer.src = currentMusic.src;
  audioPlayer.volume = 0.15;

  const songImages = document.querySelectorAll(
    `img[alt="${currentMusic.song.name}"]`
  );

  songImages.forEach((image) => {
    image.classList.add("rotating");
  });

  audioPlayer.play().catch((error) => {
    console.error("Error playing music:", error);
  });
  isPlaying = true;
}

audioPlayer.addEventListener("ended", () => {
  const songImages = document.querySelectorAll(
    `img[alt="${musicData[musicKeys[currentSongIndex]].song.name}"]`
  );

  songImages.forEach((image) => {
    image.classList.remove("rotating");
  });

  currentSongIndex = (currentSongIndex + 1) % musicKeys.length;
  playMusic();
});

function pauseMusic() {
  audioPlayer.pause();
  isPlaying = false;
  isPaused = true;
}

function resumeMusic() {
  audioPlayer.play().catch((error) => {
    console.error("Error playing music:", error);
  });
  isPlaying = true;
  isPaused = false;
}

function nextMusic() {
  currentSongIndex = (currentSongIndex + 1) % musicKeys.length;
  playMusic();
}

function previousMusic() {
  currentSongIndex = (currentSongIndex - 1) % musicKeys.length;
  playMusic();
}

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

  currentSongIndex = Math.floor(Math.random() * musicKeys.length);
  playMusic();
});

function showPopup(songName, authorName) {
  const popup = document.getElementById("popup");
  const songTitle = document.getElementById("songTitle");
  const authorNameElement = document.getElementById("authorName");

  songTitle.textContent = songName;
  authorNameElement.textContent = authorName;

  popup.classList.remove("hidden");
  setTimeout(() => {
    popup.classList.add("show");
  }, 1000);

  setTimeout(() => {
    popup.classList.remove("show");

    setTimeout(() => {
      popup.classList.add("hidden");
    }, 1000);
  }, 10000);
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
    }, 100);
  };

  const removeInterval = setInterval(removeText, 60);

  const menuItems = document.querySelectorAll(".menu");
  menuItems.forEach((item) => item.classList.remove("selected"));
  element.classList.add("selected");

  const contents = document.querySelectorAll(".content2");
  contents.forEach((item) => item.classList.add("hidden"));
  document.querySelector(`#${element.id}Content`).classList.remove("hidden");

  if (element.id == "music") {
    floatingWindow.classList.add("hidden");
  } else {
    floatingWindow.classList.remove("hidden");
  }
}

//Gallery Code
const hidden = [];
const count = 35;
const pinned = [21, 12, 4];
const mp4 = [12, 20, 21, 22, 23, 24, 25, 26, 30, 31, 32, 33, 34, 35];
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

  const wrapper = document.createElement("div");
  wrapper.classList.add("gallery-image-wrapper");

  // Pin icon (added for pinned items only)
  if (pinned.includes(i)) {
    const pinIcon = document.createElement("div");
    pinIcon.classList.add("pin-icon");
    pinIcon.innerHTML = "📌";

    pinIcon.title = isVideo
      ? "User pinned this video"
      : "User pinned this image";

    wrapper.appendChild(pinIcon);
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
    wrapper.appendChild(timestamp);
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

const slider = document.getElementById("opacitySlider");
const overlay = document.querySelector(".overlay");

overlay.style.opacity = 0;

slider.addEventListener("input", (event) => {
  overlay.style.opacity = 1 - event.target.value;
});

// Function to populate the song list
function populateSongList() {
  const songsListDiv = document.querySelector("#musicContent .songsList");

  musicKeys.forEach((key) => {
    const currentMusic = musicData[key];

    const songItem = document.createElement("div");
    songItem.classList.add("songItem");

    const songImage = document.createElement("img");
    songImage.src = currentMusic.image;
    songImage.alt = currentMusic.song.name;
    songImage.classList.add("songImage");
    songItem.appendChild(songImage);

    const textContainer = document.createElement("div");
    textContainer.classList.add("textContainer");

    const songTitle = document.createElement("p");
    songTitle.textContent = currentMusic.song.name;
    songTitle.title = currentMusic.alt.song;
    songTitle.classList.add("songTitle");
    textContainer.appendChild(songTitle);

    const authorName = document.createElement("p");
    authorName.textContent = currentMusic.author.name;
    authorName.title = currentMusic.alt.author;
    authorName.classList.add("authorName");
    textContainer.appendChild(authorName);

    songItem.appendChild(textContainer);

    songsListDiv.appendChild(songItem);

    songItem.addEventListener("click", () => {
      const songImages = document.querySelectorAll(
        `img[alt="${musicData[musicKeys[currentSongIndex]].song.name}"]`
      );

      songImages.forEach((image) => {
        image.classList.remove("rotating");
      });
      currentSongIndex = musicKeys.indexOf(key);
      playMusic();
    });
  });
}

populateSongList();

// const shuffleCheckbox = document.getElementById("shuffleCheckbox");

// shuffleCheckbox.addEventListener("change", (event) => {
//   shuffleEnabled = event.target.checked;
//   playedSongs = [];
// });

const lyricsTab = document.getElementById("lyricsTab");

lyricsTab.addEventListener("click", function () {
  lyricsTab.classList.toggle("expanded");
});

let isDragging = false;
let offsetX, offsetY;

floatingWindow.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});

window.addEventListener("mousemove", (e) => {
  if (isDragging) {
    floatingWindow.style.left = `${e.clientX - offsetX}px`;
    floatingWindow.style.top = `${e.clientY - offsetY}px`;
  }
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});
