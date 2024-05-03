import imageCompression from "browser-image-compression"; // image processing library

interface ImageProcessingProps {
  file: File;
  maxWidth?: number;
  maxHeight?: number;
  isCompression?: boolean;
}

export async function imageProcessing({
  file,
  maxWidth,
  maxHeight,
  isCompression,
}: ImageProcessingProps) {
  // processing image
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  if (maxWidth !== 0 && maxHeight !== 0) {
    return await imageResize(file, maxHeight, maxWidth);
  }

  if (isCompression) {
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("imageCompression error", error);
      return null;
    }
  }

  return null;
}

function imageResize(file: File, maxHeight: number = 0, maxWidth: number = 0) {
  const image = new Image();
  image.src = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject("Canvas not supported");
        return;
      }

      canvas.width = maxWidth || image.width;
      canvas.height = maxHeight || image.height;

      ctx.drawImage(image, 0, 0, maxWidth, maxHeight);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject("Canvas to blob failed");
            return;
          }

          resolve(blob);
        },
        "image/jpeg",
        0.95
      );
    };
  });
}
