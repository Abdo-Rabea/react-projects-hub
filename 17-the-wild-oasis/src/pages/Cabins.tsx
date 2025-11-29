import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import CreateEditCabinForm from "../features/cabins/CreateEditCabinForm";
import Button from "../ui/Button";

function Cabins() {
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Row>
        <Button>create new cabin</Button>
        <CreateEditCabinForm />
      </Row>
    </>
  );
}

export default Cabins;
