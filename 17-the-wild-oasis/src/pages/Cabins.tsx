import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinsFilterOperations from "../features/cabins/CabinsFilterOperations";

function Cabins() {
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinsFilterOperations />
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Row>
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
