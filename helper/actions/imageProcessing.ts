import imageCompression from "browser-image-compression"; // image processing library

export async function imageProcessing(file) {
  // processing image
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("imageCompression error", error);
    return null;
  }
  return null;
}
