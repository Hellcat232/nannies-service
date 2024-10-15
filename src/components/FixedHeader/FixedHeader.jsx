import LogoTitle from "../LogoTitle/LogoTitle";
import css from "./FixedHeader.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const FixedHeader = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleOpenLoginForm = () => {
    setLogin(true);
    setLoginModalIsOpen(true);
  };

  const handleOpenRegisterForm = () => {
    setRegister(true);
    setRegisterModalIsOpen(true);
  };

  const handleLogout = async () => {
    await signOut(auth);

    navigate("/");
  };

  return (
    <>
      <header className={css["fixed-header"]}>
        <nav className={css.nav}>
          <LogoTitle />

          <div className={css.links}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/nannies"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Nannies
            </NavLink>
            {user && (
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? `${css.link} ${css.active}` : css.link
                }
              >
                Favorites
              </NavLink>
            )}
          </div>

          {user ? (
            <div className={css.btns}>
              <div className={css["avatar-div"]}>
                <img
                  src="/images/avatar.png"
                  alt=""
                  width="40px"
                  height="40px"
                />

                <p className={css.name}>{user.displayName}</p>
              </div>

              <button
                type="submit"
                className={css["logout-btn"]}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className={css.btns}>
              <button
                type="submit"
                className={css["log-btn"]}
                onClick={handleOpenLoginForm}
              >
                Log In
              </button>
              <button
                type="submit"
                className={css["reg-btn"]}
                onClick={handleOpenRegisterForm}
              >
                Registration
              </button>
            </div>
          )}
        </nav>
      </header>
      <ModalWindow
        loginModalIsOpen={loginModalIsOpen}
        setLoginOpenModal={setLoginModalIsOpen}
        setLogin={setLogin}
        login={login}
        registerModalIsOpen={registerModalIsOpen}
        setRegisterOpenModal={setRegisterModalIsOpen}
        setRegister={setRegister}
        register={register}
      >
        {login && <LoginForm setLoginModalIsOpen={setLoginModalIsOpen} />}
        {register && (
          <RegistrationForm setRegisterModalIsOpen={setRegisterModalIsOpen} />
        )}
      </ModalWindow>
    </>
  );
};

export default FixedHeader;
