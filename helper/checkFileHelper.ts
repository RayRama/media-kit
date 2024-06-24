export function CheckFileHelper(file: File) {
  const MAX_FILE_SIZE = 5 * 1000000; // 5MB

  if (!file) {
    return {
      errorMessage: "Please select a file",
      isValid: false,
    };
  }

  if (file.size && file.size > MAX_FILE_SIZE) {
    return {
      errorMessage: `File size must be less than ${MAX_FILE_SIZE / 1000000} MB`,
      isValid: false,
    };
  }

  // check file type (only images and audio files are allowed)
  const fileType = file.type;
  if (
    fileType &&
    !fileType.includes("image") &&
    !fileType.includes("audio") &&
    !fileType.includes("video")
  ) {
    return {
      errorMessage: "Only images and audio files are allowed",
      isValid: false,
    };
  }

  return { errorMessage: "", isValid: true };
}
