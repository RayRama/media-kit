import styled from "@emotion/styled";
import Image from "next/image";
import { FormatFileSize } from "@/helper/formatFileSizeHelper";

const OutputProcessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // gap: 1rem;
`;

const ImageResult = styled(Image)`
  width: 200px;
  height: 200px;

  border-radius: 5px;
  border: 1px solid #ccc;
  object-fit: cover;
`;

interface OutputProcessProps {
  outputFile: File | null;
  selectedFileSize: number;
}

const OutputProcess: React.FC<OutputProcessProps> = ({
  outputFile,
  selectedFileSize,
}) => {
  return (
    <OutputProcessContainer>
      {outputFile && (
        <>
          <p>Original File Size: {FormatFileSize(selectedFileSize)}</p>
          <p>
            Output File Size: {FormatFileSize(outputFile.size)} (Decreased by{" "}
            {Math.round(
              ((selectedFileSize - outputFile.size) / selectedFileSize) * 100
            )}
            %)
          </p>
          {(outputFile.type.includes("image") && (
            <ImageResult
              src={URL.createObjectURL(outputFile.file)}
              width={500}
              height={500}
              alt="output image"
            />
          )) ||
            (outputFile.type.includes("audio") && (
              <audio controls>
                <source
                  src={URL.createObjectURL(outputFile.file)}
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            ))}
        </>
      )}
    </OutputProcessContainer>
  );
};

export default OutputProcess;
