import { useState } from "react";

export default function Form({ addNewItem }) {
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
