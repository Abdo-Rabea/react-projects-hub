import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    { quantity: 3, description: "test1", id: 1, packed: true },
    { quantity: 4, description: "test2", id: 2, packed: false },
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
      itms.map((item) => {
        return { ...item, packed: item.id === id ? !item.packed : item.packed };
      })
    );
  }

  function handleDeleteItem(id) {
    // ! it will map to the same objects in the heap
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

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ addNewItem }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // ! the wrong way: i am touching the dom
    // const quantity = e.target[0].value;
    // const description = e.target[1].value;

    // some validation
    if (description) {
      addNewItem({ quantity, description });
      setDescription("");
      setQuantity(1);
    }
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        title="Number Of Units"
      >
        {Array.from({ length: 20 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="description"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function List({ items, clearItems, togglePackingStatus, onDeleteItem }) {
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

function Item({ item, togglePackingStatus, onDeleteItem }) {
  const { quantity, description, id, packed } = item;

  return (
    <li>
      <input
        type="checkbox"
        checked={packed}
        onChange={() => togglePackingStatus(id)}
      />
      <span style={{ textDecoration: packed ? "line-through" : "none" }}>
        {quantity} {description}
      </span>

      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
}

//  display stats(number of items, number of packed items)
function Stats({ packedItems, totalItems }) {
  return (
    <footer className="stats">
      {totalItems === 0 && "Start adding some items to your packing list 🚀"}
      {totalItems > 0 && totalItems === packedItems && (
        <>You got everything! Ready to go ✈️</>
      )}
      {totalItems > 0 && totalItems > packedItems && (
        <>
          💼 You have <span>{totalItems}</span> items on your list, and you
          already packed
          <span> {packedItems} </span>
          <span> ({Math.round((packedItems / totalItems) * 100)}%) </span>
        </>
      )}
    </footer>
  );
}
export default App;
