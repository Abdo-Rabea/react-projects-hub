import type React from "react";
import { Link, useNavigate } from "react-router-dom";

const buttonStyles =
  "text-sm text-blue-500 hover:text-blue-600 hover:underline cursor-pointer";

function LinkButton({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  const navigate = useNavigate();

  if (to === "-1")
    return (
      <button className={buttonStyles} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={buttonStyles}>
      {children}
    </Link>
  );
}

export default LinkButton;
