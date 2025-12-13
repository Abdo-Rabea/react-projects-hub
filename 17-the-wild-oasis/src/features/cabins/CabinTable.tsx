import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import type { Cabin } from "../../types/cabin";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, isPending, isError, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (isError) return <div>{error?.message}</div>;

  // cabin filtering all - with-discount - no-discount
  const filterValue: string = searchParams.get("discount") || "all";
  let filterCabins: Cabin[] | undefined;
  if (filterValue === "all") filterCabins = cabins;
  else if (filterValue === "with-discount")
    filterCabins = cabins?.filter((cabin) => cabin.discount > 0);
  else filterCabins = cabins?.filter((cabin) => cabin.discount === 0);

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
          data={filterCabins}
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
