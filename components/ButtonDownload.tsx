import styled from "@emotion/styled";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20rem;
  height: 3rem;
  border: 2px solid #ccc;
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
`;

interface ButtonDownloadProps {
  outputFile: Object | null;
}

const ButtonDownload = (props: ButtonDownloadProps) => {
  const handleDownload = () => {
    if (!props.outputFile) {
      alert("No file to download. Please process a file first.");
      return;
    }

    const url = URL.createObjectURL(props.outputFile?.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed - ${props.outputFile.name}`;
    a.click();
  };

  return (
    <>
      <Button onClick={() => handleDownload()}>Download</Button>
    </>
  );
};

export default ButtonDownload;
