import LogoTitle from "../LogoTitle/LogoTitle";
import css from "./FixedHeader.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const FixedHeader = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);

    navigate("/");
  };

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
          {user && (
            <NavLink to="/favorites" className={css.link}>
              Favorites
            </NavLink>
          )}
        </div>

        <div className={css.btns}>
          <div className={css["avatar-div"]}>
            <img
              src="../../../public/avatar.png"
              alt=""
              width="40px"
              height="40px"
            />
            <p className={css.name}>{"anonym"}</p>
          </div>
          {user && (
            <button className={css["logout-btn"]} onClick={handleLogout}>
              Log Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default FixedHeader;
