import { Link } from "react-router-dom";

const buttonStyles =
  "hover: cursor-pointer rounded-full bg-yellow-400 px-4 py-3 font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 outline-none hover:bg-yellow-300 hover:text-stone-700 focus:bg-yellow-300 focus:text-stone-800 focus:ring-3 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-yellow-400 disabled:text-stone-800 sm:px-6 sm:py-4";

function Button({
  children,
  disabled,
  to,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
}) {
  if (to)
    return (
      <Link className={buttonStyles} to={to}>
        {children}
      </Link>
    );
  return (
    <button className={buttonStyles} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
