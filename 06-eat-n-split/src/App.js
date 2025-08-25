import { useEffect, useState } from "react";

const initialFriends = [
  {
    id: 118846,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118846",
    balance: -7,
  },
  {
    id: 933342,
    name: "Abdo",
    image: "https://i.pravatar.cc/48?u=933342",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [freinds, setFreinds] = useState(initialFriends);
  const [openedBillId, setOpenedBillId] = useState(null);

  // dervied state
  const openedFreind = freinds.reduce(
    (acc, c) => (c.id === openedBillId ? c.name : acc),
    null
  );

  function handleToggleBill(id) {
    setOpenedBillId((o) => (id === o ? null : id));
  }

  function handleAddFriend(newFreind) {
    setFreinds((freinds) => [...freinds, newFreind]);
  }

  // update the balance of given id
  function handleUpdateBalance({ id, addedBalance }) {
    setFreinds((freinds) =>
      freinds.map((f) =>
        f.id === id ? { ...f, balance: f.balance + addedBalance } : f
      )
    );

    // close the split form
    setOpenedBillId(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FreindsList
          freinds={freinds}
          openedBillId={openedBillId}
          onToggleBill={handleToggleBill}
        />
        <AddFreindForm onAddFreind={handleAddFriend} />
      </div>
      {openedBillId && (
        <SplitBillForm
          key={openedBillId}
          name={openedFreind}
          openedBillId={openedBillId}
          onUpdateBalance={handleUpdateBalance}
        />
      )}
    </div>
  );
}
function SplitBillForm({ name, openedBillId, onUpdateBalance }) {
  const [billValue, setBillValue] = useState("");
  const [expense, setExpense] = useState("");
  const [isMePaying, setIsMePaying] = useState(true);
  const freindExpense = billValue - expense;

  // useEffect(
  //   function () {
  //     setBillValue("");
  //     setExpense("");
  //     setIsMePaying(true);
  //   },
  //   [openedBillId]
  // );

  function handleSubmit(e) {
    e.preventDefault();
    // prevent proceed
    if (isNaN(billValue) || isNaN(expense) || !billValue) return;

    const obj = {
      id: openedBillId,
      addedBalance: isMePaying ? Number(freindExpense) : -Number(expense),
    };

    // call onUpdateBalance
    onUpdateBalance(obj);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {name}</h2>
      <label for="bill-value">💰 Bill value</label>
      <input
        type="text"
        id="bill-value"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
        autoFocus
      />
      <label for="expense">🧍‍♀️ Your expense</label>
      <input
        type="text"
        id="expense"
        value={expense}
        onChange={(e) =>
          setExpense((ex) =>
            billValue >= Number(e.target.value) ? Number(e.target.value) : ex
          )
        }
      />
      <label>👫 {name}'s expense</label>
      <input
        type="text"
        value={freindExpense}
        onChange={(e) => setExpense(e.target.value)}
        disabled
      />
      <label for="who-paying">🤑 Who is paying the bill</label>
      <select
        id="who-paying"
        name="isYouPaying"
        value={isMePaying}
        onChange={(e) => setIsMePaying(e.target.value === "true")}
      >
        <option value={true}>You</option>
        <option value={false}>{name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}

function FreindsList({ freinds, openedBillId, onToggleBill }) {
  return (
    <ul>
      {freinds.map((freind) => (
        <FreindItem
          key={freind.id}
          freind={freind}
          isOpenBill={openedBillId === freind.id}
          onToggleBill={onToggleBill}
        />
      ))}
    </ul>
  );
}

function FreindItem({ freind, isOpenBill, onToggleBill }) {
  const { id, name, image, balance } = freind;

  return (
    <li className="selected">
      <img src={image} alt="avatar" />
      <h3>{name}</h3>

      {balance === 0 && <p className="">you and {name} are even</p>}
      {balance > 0 && (
        <p className="green">
          {name} owes you {balance}€
        </p>
      )}
      {balance < 0 && (
        <p className="red">
          You owe {name} {-balance}€
        </p>
      )}

      <button className="button" onClick={() => onToggleBill(id)}>
        {isOpenBill ? "Close" : "Select"}
      </button>
    </li>
  );
}

function AddFreindForm({ onAddFreind }) {
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function closeForm() {
    setName("");
    setImage("https://i.pravatar.cc/48");
    setIsFromOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // simple validation
    if (!name || !image) return;

    onAddFreind({ id: crypto.randomUUID(), name, image, balance: 0 });

    closeForm();
  }
  return (
    <>
      {isFromOpen ? (
        <>
          <form className="form-add-friend" onSubmit={handleSubmit}>
            <label for="freind-name">👫 Friend name</label>
            <input
              type="text"
              id="freind-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <label for="img-url">🌄 Image URL</label>
            <input
              type="text"
              id="img-url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <button className="button">Add</button>
          </form>
          <button className="button" onClick={closeForm}>
            Close
          </button>
        </>
      ) : (
        <button className="button" onClick={() => setIsFromOpen(true)}>
          Add freind
        </button>
      )}
    </>
  );
}
export default App;
