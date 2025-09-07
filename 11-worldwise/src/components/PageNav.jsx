import { Link, NavLink } from "react-router-dom";
import style from "./PageNav.module.css";
import Logo from "./Logo";
function PageNav() {
  return (
    <nav className={style.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={style.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
