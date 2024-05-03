import styled from "@emotion/styled";

const ImageProcessingSettingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const ImageProcessingSettingLabel = styled.label<{ hasCheckbox?: boolean }>`
  display: flex;
  flex-direction: ${({ hasCheckbox }) => (hasCheckbox ? "row" : "column")};
  align-items: ${({ hasCheckbox }) => (hasCheckbox ? "center" : "flex-start")};
  gap: 0.5rem;

  ${({ hasCheckbox }) =>
    hasCheckbox &&
    "background-color: #f9f9f9; padding: 0.5rem; border-radius: 5px; width: 19rem;"}

  input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    background-color: #ccc;
  }

  input[type="number"] {
    width: 8rem;
    height: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
  }
`;

interface ImageProcessingSettingProps {
  maxHeightPlaceholder: number;
  maxWidthPlaceholder: number;
  isCompression: boolean;
  setMaxWidth: (maxWidth: number) => void;
  setMaxHeight: (maxHeight: number) => void;
  setIsCompression: (isCompression: boolean) => void;
}

const ImageProcessingSetting: React.FC<ImageProcessingSettingProps> = ({
  maxHeightPlaceholder,
  maxWidthPlaceholder,
  isCompression,
  setMaxWidth,
  setMaxHeight,
  setIsCompression,
}) => {
  return (
    <>
      <ImageProcessingSettingContainer>
        <ImageProcessingSettingLabel>
          Max Width
          <input
            type="number"
            placeholder={maxHeightPlaceholder.toString()}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
          />
        </ImageProcessingSettingLabel>
        <ImageProcessingSettingLabel>
          Max Height
          <input
            type="number"
            placeholder={maxHeightPlaceholder.toString()}
            onChange={(e) => setMaxHeight(Number(e.target.value))}
          />
        </ImageProcessingSettingLabel>
      </ImageProcessingSettingContainer>
      <ImageProcessingSettingLabel hasCheckbox>
        <input
          type="checkbox"
          defaultChecked={isCompression}
          onChange={(e) => setIsCompression(e.target.checked)}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          Compression
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            Check if you not set max width and max height
          </span>
        </div>
      </ImageProcessingSettingLabel>
    </>
  );
};

export default ImageProcessingSetting;
