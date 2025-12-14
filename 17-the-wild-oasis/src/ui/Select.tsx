import styled from "styled-components";
import type { Option } from "../types/Option";

const StyledSelect = styled.select<{ $type: string }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({
  options,
  onChange,
  defaultValue,
  ...props
}: {
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: string;
  $type: string;
}) {
  return (
    <StyledSelect {...props} defaultValue={defaultValue} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option?.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
