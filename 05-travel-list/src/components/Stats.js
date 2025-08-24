//  display stats(number of items, number of packed items)
export default function Stats({ packedItems, totalItems }) {
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
