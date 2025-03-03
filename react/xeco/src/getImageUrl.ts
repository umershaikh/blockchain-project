// src/getImageUrl.ts
const BACKEND_URL = "http://127.0.0.1:8000"; // Your Django server URL

export const getImageUrl = (imgPath: string): string => {
  // If the path is already a full URL or starts with "http"
  // (just in case your backend returns absolute URLs)
  if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
    return imgPath;
  }

  // If it starts with "/", we assume it's something like "/media/nfts/NFT-1.webp"
  if (imgPath.startsWith("/")) {
    return `${BACKEND_URL}${imgPath}`;
  }

  // Otherwise if it's a relative path like "nfts/NFT-1.webp",
  // prepend "/media/" and then prefix with BACKEND_URL
  return `${BACKEND_URL}/media/${imgPath}`;
};
