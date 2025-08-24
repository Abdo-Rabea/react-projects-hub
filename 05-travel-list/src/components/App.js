import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import List from "./List";
import Stats from "./Stats";

function App() {
  const [items, setItems] = useState([
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
  ]);

  const packedItemsNum = items.reduce((acc, item) => acc + item.packed, 0);
  function addNewItem(item) {
    const lastId = items.length ? items[items.length - 1].id : 0;
    const newItem = { ...item, id: lastId + 1, packed: false };
    setItems((i) => [...i, newItem]);
  }

  function clearItems() {
    const res = window.confirm("Are you sure you want to delete all items?");
    if (res) setItems([]);
  }

  function togglePackingStatus(id) {
    setItems((itms) =>
      itms.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteItem(id) {
    // ! it will map to the same objects in the heap which is totally fine as long as you use setItems and don't delete item from the items array directly (exp. items.splice or items.filter)
    setItems((itms) =>
      itms.filter((item) => {
        return item.id !== id;
      })
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form addNewItem={addNewItem} />
      <List
        items={items}
        clearItems={clearItems}
        togglePackingStatus={togglePackingStatus}
        onDeleteItem={handleDeleteItem}
      />
      <Stats packedItems={packedItemsNum} totalItems={items.length} />
    </div>
  );
}

export default App;
