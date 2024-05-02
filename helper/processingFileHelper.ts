import { imageProcessing } from "./actions/imageProcessing";
import { audioProcessing } from "./actions/audioProcessing";
import { OutputFileType } from "@/type/outputfileType";

interface ProcessingFileProps {
  file: File | null;
  maxWidth?: number;
  maxHeight?: number;
  isCompression?: boolean;
}

export async function ProcessingFileHelper({
  file,
  maxWidth,
  maxHeight,
  isCompression,
}: ProcessingFileProps) {
  let processedFile = null;
  let details: OutputFileType = null;

  if (!file) {
    return;
  }

  if (file.type.includes("image")) {
    processedFile = await imageProcessing({
      file,
      maxWidth,
      maxHeight,
      isCompression,
    });
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
