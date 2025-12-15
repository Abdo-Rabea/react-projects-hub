import styled from "styled-components";
import { usePaginationData } from "../hooks/usePaginationData";
import { useSearchParams } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button<{ $active?: boolean }>`
  background-color: ${(props) =>
    props.$active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.$active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// read and modify the current page state in the url
function Pagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rangeStart, rangeEnd, currentPage, isFirstPage, isLastPage } =
    usePaginationData({
      count,
    });

  function handlePrevious() {
    const previous: number = isFirstPage ? currentPage : currentPage - 1;
    searchParams.set("page", String(previous));
    setSearchParams(searchParams);
  }

  function handleNext() {
    const next: number = isLastPage ? currentPage : currentPage + 1;
    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  }
  return (
    <StyledPagination>
      <P>
        showing <span>{rangeStart}</span> to <span> {rangeEnd}</span> of
        <span>{count}</span>
      </P>
      <Buttons>
        <PaginationButton onClick={handlePrevious} disabled={isFirstPage}>
          <HiChevronLeft />
          <span>previous</span>
        </PaginationButton>

        <PaginationButton onClick={handleNext} disabled={isLastPage}>
          <span>next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
