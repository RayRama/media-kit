import { CheckFileHelper } from "@/helper/checkFileHelper";
import { ProcessingFileHelper } from "@/helper/processingFileHelper";
import styled from "@emotion/styled";
import { useState } from "react";
import ButtonProcess from "./ButtonProcess";
import Image from "next/image";
import { FormatFileSize } from "@/helper/formatFileSizeHelper";

const DropZoneLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 20rem;
  height: 10rem;

  border: 2px dashed #ccc;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  transition: border 0.3s ease;

  &:hover {
    border-color: #aaa;
  }
  &:focus {
    border-color: #555;
  }
  ::-webkit-file-upload-button {
    visibility: hidden;
  }
`;

const DropZoneInput = styled.input`
  display: none;
`;

const DropZoneContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  p {
    text-align: center;
  }

  ::before {
    content: "+";
    font-size: 3rem;
    color: #ccc;
  }
  ::after {
    content: "Drop an image or audio file here";
    font-size: 1rem;
    color: #ccc;
  }
`;

interface DropZoneComponentProps {
  selectedFile: File | null;
  fileName: string;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DropZoneComponent: React.FC<DropZoneComponentProps> = ({
  selectedFile,
  fileName,
  handleFileUpload,
}) => {
  return (
    <>
      <DropZoneLabel
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDragLeave={(event) => {
          event.preventDefault();
        }}
        onDragEnter={(event) => {
          event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          const fileList = event.dataTransfer.files;
          const syntheticEvent: React.ChangeEvent<HTMLInputElement> = {
            target: {
              files: fileList,
            },
            currentTarget: event.currentTarget,
            nativeEvent: event.nativeEvent,
          };
          handleFileUpload(syntheticEvent);
        }}
      >
        <DropZoneInput
          type="file"
          onChange={handleFileUpload}
          accept=".jpg, .jpeg, .png, .mp3"
        />
        {selectedFile ? (
          <p style={{ textAlign: "center", overflow: "hidden" }}>{fileName}</p>
        ) : (
          <DropZoneContent />
        )}
      </DropZoneLabel>
    </>
  );
};

export default DropZoneComponent;
