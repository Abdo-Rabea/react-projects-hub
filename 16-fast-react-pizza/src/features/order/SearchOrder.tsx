import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState<string>();
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit} className="ml-auto md:mr-2">
      <input
        placeholder="Search Order ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 outline-none placeholder:text-stone-400 focus:ring-2 focus:ring-yellow-500/50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
