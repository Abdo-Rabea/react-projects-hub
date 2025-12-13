import Filter from "../../ui/Filter";

function CabinsFilterOperations() {
  return (
    <Filter
      filterField="discount"
      options={[
        { value: "all", label: "All" },
        { value: "with-discount", label: "With discount" },
        { value: "no-discount", label: "No discount" },
      ]}
    />
  );
}

export default CabinsFilterOperations;
