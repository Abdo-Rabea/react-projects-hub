export default function Item({ item, togglePackingStatus, onDeleteItem }) {
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
