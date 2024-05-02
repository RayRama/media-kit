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

interface ButtonProcessProps {
  onClick: () => React.MouseEventHandler<HTMLButtonElement>;
  isProcessing: boolean;
}

const ButtonProcess = (props: ButtonProcessProps) => {
  return (
    <>
      <Button onClick={() => props.onClick()} disabled={props.isProcessing}>
        Process
      </Button>
    </>
  );
};

export default ButtonProcess;
