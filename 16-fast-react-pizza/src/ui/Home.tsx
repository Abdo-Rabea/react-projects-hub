import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Button from "./Button";

function Home() {
  const username = useSelector((store: RootState) => store.user.username);
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-8 px-4 text-center text-2xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          Continue Ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
