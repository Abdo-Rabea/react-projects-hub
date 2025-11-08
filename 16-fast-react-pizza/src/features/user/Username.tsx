import { useSelector } from "react-redux";
import type { RootState } from "../../store";

function Username() {
  // get the user name from redux
  const username = useSelector((store: RootState) => store.user.username);
  if (!username) return null;
  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
