import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import styled from "styled-components";
import Row from "./ui/Row";
const StyledApp = styled.div`
  background-color: #eee;
`;

function App() {
  return (
    <StyledApp>
      <GlobalStyles />
      <Row $type="horizontal">
        <Heading as="h1">The wild Oasis Hotel</Heading>
        <div>
          <Heading as="h2">Check-in & check-out</Heading>
          <Button $variations="primary" $size="small">
            Check-in
          </Button>
          <Button $variations="secondary" $size="small">
            Check-in
          </Button>
          <Button $variations="danger" $size="small">
            Check-in
          </Button>
          <Button $variations="primary" $size="medium">
            Check-in
          </Button>
          <Button $variations="secondary" $size="medium">
            Check-in
          </Button>
          <Button $variations="danger" $size="medium">
            Check-in
          </Button>
          <Button $variations="primary" $size="large">
            Check-in
          </Button>
          <Button $variations="secondary" $size="large">
            Check-in
          </Button>
          <Button $variations="danger" $size="large">
            Check-in
          </Button>
        </div>
      </Row>
      <Row>
        <Heading as="h3">Form</Heading>
        <div>
          <Input placeholder="Number of guests" />
          <Input placeholder="Number of guests" />
        </div>
      </Row>
    </StyledApp>
  );
}

export default App;
