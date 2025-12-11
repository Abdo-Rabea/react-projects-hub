import {
  createContext,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  /* overflow: hidden; */
`;

const CommonRow = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext({ columns: "" });

function Table({
  children,
  columns,
}: {
  children: ReactNode;
  columns: string;
}) {
  return (
    <TableContext value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext>
  );
}

function Header({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader columns={columns} role="row" as="header">
      {children}
    </StyledHeader>
  );
}

function Body<T>({
  data,
  render,
}: {
  data: T[] | undefined;
  render: (element: T) => ReactElement;
}) {
  if (!data || data.length === 0)
    return <Empty>No data to show at the moment!</Empty>;

  return <StyledBody>{data?.map((element) => render(element))}</StyledBody>;
}

function Row({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow columns={columns} role="row">
      {children}
    </StyledRow>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Footer = Footer;
Table.Body = Body;

export default Table;
