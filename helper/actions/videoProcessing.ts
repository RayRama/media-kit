import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export async function videoProcessing(file: File) {
  try {
    // Initialize FFmpeg
    const ffmpeg = new FFmpeg();

    ffmpeg.on("progress", ({ progress, time }) => {
      // insert to paragpraph element that have class name "loading-text"
      const loadingText = document.querySelector(".loading-text");
      console.log(loadingText);
      if (loadingText) {
        loadingText.innerHTML = `Processing... ${Math.floor(
          progress * 100
        )}% - ${(time / 1000000).toFixed(1)} seconds`;
      }
    });

    await ffmpeg.load();

    // Fetch the video file
    const videoFile = await fetchFile(file);

    // Write the video file to FFmpeg filesystem
    await ffmpeg.writeFile("input.mp4", videoFile);

    // Execute FFmpeg command to compress video
    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-vcodec",
      "libx264",
      "-crf",
      "32",
      "-preset",
      "medium",
      "-maxrate",
      "500k",
      "-bufsize",
      "400k",
      "-acodec",
      "aac",
      "-b:a",
      "128k",
      "output.mp4",
    ]);

    // Read the output video file
    const data = await ffmpeg.readFile("output.mp4");

    return new Blob([data.buffer], { type: "video/mp4" });
  } catch (error) {
    console.error("videoProcessing error", error);
    return null;
  }
}
