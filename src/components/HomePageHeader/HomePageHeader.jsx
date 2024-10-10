import css from "./HomePageHeader.module.css";
import LogoTitle from "../LogoTitle/LogoTitle";
import { NavLink } from "react-router-dom";

const HomePageHeader = () => {
  return (
    <header className={css["home-header"]}>
      <nav className={css.nav}>
        <LogoTitle />

        <div style={{ display: "flex", gap: "92px" }}>
          <div className={css.links}>
            <NavLink className={css.link}>Home</NavLink>
            <NavLink className={css.link}>Nannies</NavLink>
            {/* <NavLink className={css.link}>Favorites</NavLink> */}
          </div>

          <div className={css.btns}>
            <button className={css["log-btn"]}>Log In</button>
            <button className={css["reg-btn"]}>Registration</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomePageHeader;
