function punkyPolygons() {
  const collection = new Set();

  for (let i = 0; i <= 25; i++) collection.add(`${rando()}% ${rando()}%`);

  return Array.from(collection.values()).join(",");
}

function rando() {
  return (Math.random() * 100).toFixed();
}

var style = document.createElement("style");
style.type = "text/css";

var keyFrames = `\
  @keyframes glitch {\
    13% {\
      clip-path: polygon(DYNAMIC_VALUE_1);\
    }\
    
    53% {\
      clip-path: polygon(DYNAMIC_VALUE_2);\
    }\

    37% {\
      clip-path: polygon(DYNAMIC_VALUE_3);\
    }\
 
    62% {\
      clip-path: polygon(DYNAMIC_VALUE_4);\
    }\
    
    78% {\
      clip-path: polygon(DYNAMIC_VALUE_5);\
    }
    
    14%, 39%, 56%, 64%, 79%{\
      clip-path: none;\
    }\
  }`;

function generateNewPolygons() {
  let kf = keyFrames;

  for (let i = 1; i <= 5; i++) {
    kf = kf.replace("DYNAMIC_VALUE_" + i, punkyPolygons());
  }

  style.innerHTML = kf;

  document.getElementsByTagName("head")[0].appendChild(style);
}

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader-container");
  const cyberpunk = document.getElementById("cyberpunk");
  const body = document.body;
  const loadingNumber = document.querySelector(".loading-number");

  cyberpunk.style.opacity = 0;
  let animationsCompleted = 0;
  const totalAnimations = 2;
  const checkIfAllAnimationsComplete = () => {
    animationsCompleted += 1;
    if (animationsCompleted === totalAnimations) {
      loader.style.transition = "opacity 1s ease-out";
      loader.style.opacity = 0;
      setTimeout(() => {
        loader.classList.add("hidden");
        body.style.display = "grid";
        body.style.placeContent = "center";
        body.style.placeItems = "center";
      }, 1000);

      setTimeout(() => {
        cyberpunk.style.transition = "opacity 1s ease-in-out";
        cyberpunk.style.opacity = 1;
      }, 1000);

      setTimeout(() => {
        cyberpunk.style.transition = "opacity 1s ease-in";
        cyberpunk.style.opacity = 0;
      }, 10000);
    }
  };

  loadingNumber.addEventListener("animationend", () => {
    // Checking the loading number after animation
    if (loadingNumber.textContent === "100%") {
      checkIfAllAnimationsComplete();
    }
  });

  // Listen for the animation end of the other loader animations (e.g., bar filling, etc.)
  loader.addEventListener("animationend", (e) => {
    // You can add additional conditions here if you have multiple animations to track
    checkIfAllAnimationsComplete();
  });
});
