const defaultAvatars = [
  {
    shape: "circle",
    color: "blue",
    smiling: false,
    glasses: false,
    bodyColor: "red",
  },
  {
    shape: "triangle",
    color: "green",
    smiling: false,
    glasses: false,
    bodyColor: "yellow",
  },
  {
    shape: "square",
    color: "red",
    smiling: false,
    glasses: false,
    bodyColor: "green",
  },
  {
    shape: "circle",
    color: "yellow",
    smiling: true,
    glasses: false,
    bodyColor: "green",
  },
  {
    shape: "hexagon",
    color: "lightblue",
    smiling: false,
    glasses: false,
    bodyColor: "green",
  },
  {
    shape: "circle",
    color: "orange",
    smiling: false,
    glasses: false,
    bodyColor: "blue",
  },
  {
    shape: "triangle",
    color: "red",
    smiling: false,
    glasses: false,
    bodyColor: "orange",
  },
  {
    shape: "circle",
    color: "yellow",
    smiling: false,
    glasses: false,
    bodyColor: "black",
  },
  {
    shape: "square",
    color: "green",
    smiling: false,
    glasses: false,
    bodyColor: "red",
  },
  {
    shape: "circle",
    color: "orange",
    smiling: true,
    glasses: false,
    bodyColor: "green",
  },
  {
    shape: "hexagon",
    color: "yellow",
    smiling: false,
    glasses: false,
    bodyColor: "green",
  },
  {
    shape: "circle",
    color: "black",
    smiling: false,
    glasses: true,
    bodyColor: "red",
  },
  {
    shape: "square",
    color: "blue",
    smiling: false,
    glasses: false,
    bodyColor: "blue",
  },
  {
    shape: "circle",
    color: "red",
    smiling: false,
    glasses: false,
    bodyColor: "teal",
  },
  {
    shape: "triangle",
    color: "green",
    smiling: false,
    glasses: false,
    bodyColor: "red",
  },
  {
    shape: "circle",
    color: "lightblue",
    smiling: false,
    glasses: true,
    bodyColor: "yellow",
  },
  {
    shape: "hexagon",
    color: "red",
    smiling: false,
    glasses: false,
    bodyColor: "black",
  },
  {
    shape: "circle",
    color: "yellow",
    smiling: true,
    glasses: false,
    bodyColor: "orange",
  },
  {
    shape: "square",
    color: "yellow",
    smiling: false,
    glasses: false,
    bodyColor: "red",
  },
  {
    shape: "circle",
    color: "green",
    smiling: false,
    glasses: false,
    bodyColor: "green",
  },
  {
    shape: "triangle",
    color: "blue",
    smiling: false,
    glasses: false,
    bodyColor: "yellow",
  },
  {
    shape: "circle",
    color: "red",
    smiling: true,
    glasses: false,
    bodyColor: "blue",
  },
  {
    shape: "square",
    color: "blue",
    smiling: false,
    glasses: false,
    bodyColor: "orange",
  },
  {
    shape: "circle",
    color: "teal",
    smiling: false,
    glasses: false,
    bodyColor: "black",
  },
  {
    shape: "triangle",
    color: "black",
    smiling: false,
    glasses: false,
    bodyColor: "yellow",
  },
  {
    shape: "circle",
    color: "green",
    smiling: true,
    glasses: false,
    bodyColor: "teal",
  },
  {
    shape: "hexagon",
    color: "red",
    smiling: false,
    glasses: false,
    bodyColor: "yellow",
  },
  {
    shape: "square",
    color: "yellow",
    smiling: false,
    glasses: false,
    bodyColor: "blue",
  },
  {
    shape: "circle",
    color: "orange",
    smiling: false,
    glasses: false,
    bodyColor: "red",
  },
  {
    shape: "triangle",
    color: "yellow",
    smiling: false,
    glasses: false,
    bodyColor: "green",
  },
  {
    shape: "circle",
    color: "blue",
    smiling: true,
    glasses: false,
    bodyColor: "black",
  },
  {
    shape: "hexagon",
    color: "green",
    smiling: false,
    glasses: true,
    bodyColor: "orange",
  },
  {
    shape: "square",
    color: "red",
    smiling: true,
    glasses: false,
    bodyColor: "teal",
  },
  {
    shape: "triangle",
    color: "lightblue",
    smiling: false,
    glasses: false,
    bodyColor: "black",
  },
  {
    shape: "circle",
    color: "black",
    smiling: true,
    glasses: false,
    bodyColor: "yellow",
  },
  {
    shape: "hexagon",
    color: "orange",
    smiling: false,
    glasses: false,
    bodyColor: "blue",
  },
];

let mySecretIndex = null;
let isLocked = false;
let eliminatedSet = new Set();
let currentAvatarData = [];

function getDefaultAvatars(tileCount) {
  return defaultAvatars.slice(0, tileCount);
}

function loadGuessWhoComponent() {
  const container = document.getElementById("componentDisplay");
  container.innerHTML = "";

  const setupDiv = document.createElement("div");
  setupDiv.id = "guessWhoSetupControls";

  const tileCountLabel = document.createElement("label");
  tileCountLabel.textContent = "Tile count: ";
  const tileSelect = document.createElement("select");
  tileSelect.id = "tileCountSelect";

  [16, 25, 36].forEach((count) => {
    const option = document.createElement("option");
    option.value = count;
    option.textContent = `${count} tiles`;
    tileSelect.appendChild(option);
  });

  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.multiple = true;
  imageInput.accept = "image/*";
  imageInput.id = "customImages";
  imageInput.style.display = "none";

  const imageUploadLabel = document.createElement("label");
  imageUploadLabel.id = "file-upload-button";
  imageUploadLabel.textContent = "Upload Custom Images";
  imageUploadLabel.setAttribute("for", "customImages");

  const startBtn = document.createElement("button");
  startBtn.textContent = "Start Game";
  startBtn.style.display = "block";
  startBtn.style.margin = "10px auto 0 auto";

  startBtn.addEventListener("click", () => {
    const tileCount = parseInt(tileSelect.value);
    const uploadedImages = Array.from(imageInput.files);
    currentAvatarData =
      uploadedImages.length > 0
        ? uploadedImages.map((file) => ({ image: file }))
        : getDefaultAvatars(tileCount);
    initializeGuessWhoBoard(tileCount, currentAvatarData);
  });

  setupDiv.appendChild(tileCountLabel);
  setupDiv.appendChild(tileSelect);
  setupDiv.appendChild(document.createElement("br"));
  setupDiv.appendChild(imageUploadLabel);
  setupDiv.appendChild(imageInput);
  setupDiv.appendChild(startBtn);
  container.appendChild(setupDiv);
}

function initializeGuessWhoBoard(tileCount, avatarData) {
  mySecretIndex = null;
  isLocked = false;
  eliminatedSet.clear();

  const container = document.getElementById("componentDisplay");
  container.innerHTML = "";

  const gridSize = Math.sqrt(tileCount);
  const board = document.createElement("div");
  board.id = "guessWhoBoard";
  board.style.gridTemplateColumns = `repeat(${gridSize}, minmax(0, 1fr))`;
  board.style.gap = "8px";

  const instruction = document.createElement("p");
  instruction.id = "guessWhoInstruction";
  instruction.textContent = "Select your card identity, then lock it.";

  const lockBtn = document.createElement("button");
  lockBtn.textContent = "Lock Identity";

  const revealBtn = document.createElement("button");
  revealBtn.textContent = "Reveal Identity";
  revealBtn.className = "reveal-btn";
  revealBtn.style.display = "none";

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset Game";
  resetBtn.className = "reset-btn";
  resetBtn.addEventListener("click", () => loadGuessWhoComponent());

  function handleTileClick(e) {
    const index = parseInt(e.currentTarget.dataset.index);

    if (!isLocked) {
      board.querySelectorAll(".guessWhoTile").forEach(t => t.classList.remove("selected-tile"));
      mySecretIndex = index;
      e.currentTarget.classList.add("selected-tile");
    } else {
      if (eliminatedSet.has(index)) {
        eliminatedSet.delete(index);
        e.currentTarget.classList.remove("eliminated");
      } else {
        eliminatedSet.add(index);
        e.currentTarget.classList.add("eliminated");
      }
    }
  }

  for (let i = 0; i < tileCount; i++) {
    const tile = document.createElement("div");
    tile.className = "guessWhoTile";
    tile.dataset.index = i;

    const data = avatarData[i];
    if (data.image) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(data.image);
      img.className = "tileImage";
      tile.appendChild(img);
    } else {
      renderAvatar(tile, data);
    }

    tile.addEventListener("click", handleTileClick);
    board.appendChild(tile);
  }

  lockBtn.addEventListener("click", () => {
    if (mySecretIndex === null) {
      instruction.textContent = "Choose your identity before locking!";
      return;
    }
    isLocked = true;
    lockBtn.style.display = "none";
    revealBtn.style.display = "inline-block";
    instruction.textContent =
      "Identity Locked! Talk out loud to your partner and tap cards to eliminate.";

    board.querySelectorAll(".guessWhoTile").forEach((tile) => {
      tile.classList.remove("selected-tile");
    });
  });

  revealBtn.addEventListener("click", () => {
    board.querySelectorAll(".guessWhoTile").forEach((tile) => {
      const idx = parseInt(tile.dataset.index);
      if (idx === mySecretIndex) {
        tile.classList.add("final-tile");
      }
    });
    instruction.textContent = "Showing your secret identity target directly on your grid!";
  });

  const controlBar = document.createElement("div");
  controlBar.id = "guessWhoSetupControls";

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group";
  buttonGroup.appendChild(lockBtn);
  buttonGroup.appendChild(revealBtn);
  buttonGroup.appendChild(resetBtn);

  controlBar.appendChild(instruction);
  controlBar.appendChild(buttonGroup);

  container.appendChild(controlBar);
  container.appendChild(board);
}

function renderAvatar(container, traits) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 100 100");

  const body = document.createElementNS(svgNS, "ellipse");
  body.setAttribute("cx", "50");
  body.setAttribute("cy", "80");
  body.setAttribute("rx", "30");
  body.setAttribute("ry", "15");
  body.setAttribute("fill", traits.bodyColor);
  svg.appendChild(body);

  let head;
  switch (traits.shape) {
    case "circle":
      head = document.createElementNS(svgNS, "circle");
      head.setAttribute("cx", "50");
      head.setAttribute("cy", "40");
      head.setAttribute("r", "20");
      break;
    case "square":
      head = document.createElementNS(svgNS, "rect");
      head.setAttribute("x", "30");
      head.setAttribute("y", "20");
      head.setAttribute("width", "40");
      head.setAttribute("height", "40");
      break;
    case "triangle":
      head = document.createElementNS(svgNS, "polygon");
      head.setAttribute("points", "50,20 70,60 30,60");
      break;
    case "hexagon":
      head = document.createElementNS(svgNS, "polygon");
      head.setAttribute("points", "50,20 65,30 65,50 50,60 35,50 35,30");
      break;
  }
  head.setAttribute("fill", traits.color);
  svg.appendChild(head);

  if (traits.smiling) {
    const smile = document.createElementNS(svgNS, "path");
    smile.setAttribute("d", "M40 45 Q50 55 60 45");
    smile.setAttribute("stroke", "black");
    smile.setAttribute("fill", "none");
    svg.appendChild(smile);
  }

  if (traits.glasses) {
    const leftLens = document.createElementNS(svgNS, "circle");
    leftLens.setAttribute("cx", "40");
    leftLens.setAttribute("cy", "40");
    leftLens.setAttribute("r", "6");
    leftLens.setAttribute("stroke", "black");
    leftLens.setAttribute("fill", "none");

    const rightLens = document.createElementNS(svgNS, "circle");
    rightLens.setAttribute("cx", "60");
    rightLens.setAttribute("cy", "40");
    rightLens.setAttribute("r", "6");
    rightLens.setAttribute("stroke", "black");
    rightLens.setAttribute("fill", "none");

    const bridge = document.createElementNS(svgNS, "line");
    bridge.setAttribute("x1", "46");
    bridge.setAttribute("y1", "40");
    bridge.setAttribute("x2", "54");
    bridge.setAttribute("y2", "40");
    bridge.setAttribute("stroke", "black");

    svg.appendChild(leftLens);
    svg.appendChild(rightLens);
    svg.appendChild(bridge);
  }
  container.appendChild(svg);
}

// PWA Offline Initialization Engine
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .catch((err) => console.log("SW registration failed: ", err));
  });
}

loadGuessWhoComponent();