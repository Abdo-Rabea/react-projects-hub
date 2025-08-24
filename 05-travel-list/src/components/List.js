import { useState } from "react";
import Item from "./Item";

export default function List({
  items,
  clearItems,
  togglePackingStatus,
  onDeleteItem,
}) {
  const [sortBy, setSortBy] = useState("id");
  const displayItems = [...items];
  displayItems.sort((a, b) =>
    a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0
  );
  return (
    <div className="list">
      <ul>
        {displayItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            togglePackingStatus={togglePackingStatus}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="id">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={clearItems}>Clear List</button>
      </div>
    </div>
  );
}
