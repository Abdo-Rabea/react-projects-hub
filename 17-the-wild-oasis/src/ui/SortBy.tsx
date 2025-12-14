import type { Option } from "../types/Option";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }: { options: Option[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "name-asc";
  function hanldeChangeOption(e: React.ChangeEvent<HTMLSelectElement>) {
    // set the url
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      defaultValue={sortBy}
      onChange={hanldeChangeOption}
      $type="white"
    />
  );
}

export default SortBy;
