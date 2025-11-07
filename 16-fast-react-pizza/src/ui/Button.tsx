import { Link } from "react-router-dom";

const base =
  "hover: cursor-pointer rounded-full bg-yellow-400  font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 outline-none hover:bg-yellow-300 hover:text-stone-700 focus:bg-yellow-300 focus:text-stone-800 focus:ring-3 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-yellow-400 disabled:text-stone-800 ";

const styles: { primary: string; small: string; secondary: string } = {
  primary: base + " px-4 py-3 md:px-6 md:py-4",
  small: base + " text-xs px-4 py-2 md:px-5 md:py-3 ",
  secondary:
    "hover: cursor-pointer rounded-full border border-stone-300 px-4 py-2.5 font-semibold tracking-wide text-stone-400 uppercase transition-colors duration-300 outline-none hover:bg-stone-300 hover:text-stone-500 focus:bg-stone-300 focus:text-stone-600 focus:ring-3 focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:text-stone-800 md:px-6 md:py-3.5",
};

type ButtonType = keyof typeof styles; // "primary" | "small"

function Button({
  children,
  disabled,
  to,
  type = "primary",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
  type: ButtonType;
}) {
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
