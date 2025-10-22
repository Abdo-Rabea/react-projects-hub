import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const balance = useSelector((store) => store.account.balance);
  return <div className="balance">{formatCurrency(balance)}</div>;
}
// john explained here the old way to consume state here before useSelector on video: 269 but it doesn't really matter here except for the old code basis.

export default BalanceDisplay;
