import LogoTitle from "../LogoTitle/LogoTitle";
import css from "./FixedHeader.module.css";
import { NavLink } from "react-router-dom";

const FixedHeader = () => {
  return (
    <header className={css["fixed-header"]}>
      <nav className={css.nav}>
        <LogoTitle />

        <div className={css.links}>
          <NavLink to="/" className={css.link}>
            Home
          </NavLink>
          <NavLink to="/nannies" className={css.link}>
            Nannies
          </NavLink>
          <NavLink to="/favorites" className={css.link}>
            Favorites
          </NavLink>
        </div>

        <div className={css.btns}>
          <div className={css["avatar-div"]}>
            <img
              src="../../../public/avatar.png"
              alt=""
              width="40px"
              height="40px"
            />
            <p className={css.name}>Name</p>
          </div>
          <button className={css["logout-btn"]}>Log Out</button>
        </div>
      </nav>
    </header>
  );
};

export default FixedHeader;
