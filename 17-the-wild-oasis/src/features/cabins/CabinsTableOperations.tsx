import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function CabinsTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With discount" },
          { value: "no-discount", label: "No discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinsTableOperations;
