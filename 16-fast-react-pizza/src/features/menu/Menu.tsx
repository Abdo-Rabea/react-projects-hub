import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import type { Pizza } from "../../types/Pizza";

function Menu() {
  // consuming data
  const menu = useLoaderData();

  return (
    <ul>
      {menu.map((pizza: Pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// 1. define the loader function
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
