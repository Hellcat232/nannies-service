import css from "./Navigation.module.css";
import LogoTitle from "../LogoTitle/LogoTitle";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header>
      <nav className={css.nav}>
        <LogoTitle />

        <div className={css.links}>
          <NavLink>Home</NavLink>
          <NavLink>Nannies</NavLink>
          <NavLink>Favorites</NavLink>
        </div>

        <div className={css.btns}>
          <button>Log In</button>
          <button>Registration</button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
