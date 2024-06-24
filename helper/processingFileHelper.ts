import { imageProcessing } from "./actions/imageProcessing";
import { audioProcessing } from "./actions/audioProcessing";
import { OutputFileType } from "@/type/outputfileType";
import { videoProcessing } from "./actions/videoProcessing";

interface ProcessingFileProps {
  file: File;
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
  let processedFile: any = null;
  let details: OutputFileType = {
    file: file,
    name: "",
    size: 0,
    type: "",
  };

  if (!file) {
    return alert("No file selected");
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
  } else if (file.type.includes("video")) {
    processedFile = await videoProcessing(file);
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
