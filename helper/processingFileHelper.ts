import { imageProcessing } from "./actions/imageProcessing";
import { audioProcessing } from "./actions/audioProcessing";

interface fileDetails {
  file: File;
  name: string;
  size: number;
  type: string;
}

export async function ProcessingFileHelper(file) {
  let processedFile = null;
  let details: fileDetails = null;

  if (!file) {
    return;
  }

  if (file.type.includes("image")) {
    processedFile = await imageProcessing(file);
  } else if (file.type.includes("audio")) {
    processedFile = await audioProcessing(file);
  }

  if (processedFile) {
    details = {
      file: processedFile,
      name: file.name,
      size: processedFile.size,
      type: processedFile.type,
    };
  }

  return details;
}
