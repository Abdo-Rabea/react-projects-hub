import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// onClick on each button -> set the search params discount
interface Option {
  value: string;
  label: string;
}

export function Filter({
  filterField,
  options,
}: {
  filterField: string;
  options: Option[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedFilterValue = searchParams.get(filterField);

  // set the value of to first opetion by default but this navigation should happens after first render
  useEffect(
    function () {
      if (selectedFilterValue === null)
        setSearchParams({ [filterField]: options[0].value });
    },
    [filterField, options, selectedFilterValue, setSearchParams]
  );

  function handleSetSearchParams(value: string) {
    setSearchParams({ [filterField]: value });
  }
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleSetSearchParams(option.value)}
          $active={option.value === selectedFilterValue}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
