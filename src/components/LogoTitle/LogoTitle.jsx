import { NavLink } from "react-router-dom";
import css from "./LogoTitle.module.css";

const LogoTitle = () => {
  return (
    <>
      <NavLink to="/" className={css.logo}>
        Nanny.Services
      </NavLink>
    </>
  );
};

export default LogoTitle;
