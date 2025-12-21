import styled from "styled-components";

const StyledErrorMessage = styled.div``;

function ErrorMessage({ message }: { message: string | undefined }) {
  return <StyledErrorMessage>{message || "unknown error"}</StyledErrorMessage>;
}

export default ErrorMessage;
