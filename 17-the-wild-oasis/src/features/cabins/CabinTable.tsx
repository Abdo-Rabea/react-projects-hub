import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import type { Cabin } from "../../types/cabin";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { cabins, isPending, isError, error } = useCabins();
  if (isPending) return <Spinner />;
  if (isError) return <div>{error?.message}</div>;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin: Cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
  // return (
  //   <Table role="table">
  //     <TableHeader role="row">
  //       <div></div>
  //       <div>Cabin</div>
  //       <div>Capacity</div>
  //       <div>Price</div>
  //       <div>Discount</div>
  //       <div></div>
  //     </TableHeader>
  //     {cabins?.map((cabin: Cabin) => (
  //       <CabinRow cabin={cabin} key={cabin.id} />
  //     ))}
  //   </Table>
  // );
}

export default CabinTable;
