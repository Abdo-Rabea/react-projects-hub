import styled, { css } from "styled-components";

// make a horizontal row of element or a vertical one based on the passed type prop

interface RowProps {
  $type?: "horizontal" | "vertical";
}

const Row = styled.div<RowProps>`
  display: flex;

  ${(props) =>
    props.$type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    (props.$type ?? "vertical") === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

export default Row;
