import * as lame from "@breezystack/lamejs"; // audio processing library

declare global {
  interface Window {
    AudioContext: any;
    webkitAudioContext: any;
  }
}

export function audioProcessing(file: File) {
  // processing audio
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result;
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      if (audioBuffer.numberOfChannels !== 2) {
        reject("Only stereo audio is supported or audio already compressed.");

        return alert(
          "Only stereo audio is supported or audio already compressed."
        );
      }

      const mp3encoder = new lame.Mp3Encoder(1, audioBuffer.sampleRate, 32);
      const [left, right] = [
        audioBuffer.getChannelData(0),
        audioBuffer.getChannelData(1),
      ];
      const sampleBlockSize = 1152;
      const mp3Data = [];

      const l = new Int16Array(left.length);
      const r = new Int16Array(right.length);

      for (let i = 0; i < left.length; i++) {
        l[i] = left[i] * 32767.0;
        r[i] = right[i] * 32767.0;
      }

      for (let i = 0; i < l.length; i += sampleBlockSize) {
        const leftChunk: Int16Array = l.subarray(i, i + sampleBlockSize);
        const rightChunk: Int16Array = r.subarray(i, i + sampleBlockSize);
        const mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }
      }

      const mp3buf = mp3encoder.flush();
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }

      const mergedMp3Array = new Int8Array(
        mp3Data.reduce((acc, curr) => acc + curr.length, 0)
      );
      let offset = 0;
      mp3Data.forEach((val) => {
        mergedMp3Array.set(val, offset);
        offset += val.length;
      });

      const blob = new Blob([mergedMp3Array], { type: "audio/mp3" });
      resolve(blob);
    };
  });
}
