export let assets = {}; // Export the assets object

async function loadAssets() {
  try {
    const response = await fetch("./assets.json"); // Fetch from the root directory
    if (!response.ok) {
      throw new Error(`Failed to load assets: ${response.statusText}`);
    }
    assets = await response.json(); // Parse the JSON
    console.log("Assets loaded successfully:", assets);
  } catch (error) {
    console.error("Error loading assets:", error);
  }
}

export async function preloadAssets(level) {
  // Ensure assets are loaded before proceeding
  if (Object.keys(assets).length === 0) {
    await loadAssets();
  }

  const levelAssets = assets[level];
  const globalAssets = assets.global;

  if (!levelAssets || !globalAssets) {
    console.error(`Invalid level or missing global assets: ${level}`);
    return;
  }

  // Ensure images is a flat array of individual paths
  const levelImages = Object.values(levelAssets.images);
  const globalImages = Object.values(globalAssets.images);

  // Flatten the arrays if they contain nested arrays
  const flattenArray = (arr) => {
    return arr.flatMap((item) => (Array.isArray(item) ? item : [item]));
  };

  const allAssets = {
    audio: [
      ...Object.values(levelAssets.audio),
      ...Object.values(globalAssets.audio),
    ],
    images: [...flattenArray(levelImages), ...flattenArray(globalImages)],
  };

  console.log("Images to preload:", allAssets.images); // Debugging: Log the image paths

  const promises = [];

  // Preload audio
  allAssets.audio.forEach((audioPath) => {
    const audio = new Audio();
    audio.src = audioPath;
    promises.push(
      new Promise((resolve) => {
        audio.addEventListener("canplaythrough", resolve, { once: true });
        audio.addEventListener("error", (error) => {
          console.error(`Failed to load audio: ${audioPath}`, error);
          resolve(); // Resolve even if there's an error to avoid blocking the game
        });
      })
    );
  });

  // Preload images
  allAssets.images.forEach((imagePath) => {
    const img = new Image();
    img.src = imagePath;
    promises.push(
      new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", (error) => {
          console.error(`Failed to load image: ${imagePath}`, error);
          resolve(); // Resolve even if there's an error to avoid blocking the game
        });
      })
    );
  });

  await Promise.all(promises);
  console.log("All assets preloaded");
}
