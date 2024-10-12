import css from "./HomePageHeader.module.css";
import LogoTitle from "../LogoTitle/LogoTitle";
import ModalWindow from "../ModalWindow/ModalWindow";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

const HomePageHeader = () => {
  const [user] = useAuthState(auth);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const handleOpenLoginForm = () => {
    setLogin(true);
    setLoginModalIsOpen(true);
  };

  const handleOpenRegisterForm = () => {
    setRegister(true);
    setRegisterModalIsOpen(true);
  };

  return (
    <>
      <header className={css["home-header"]}>
        <nav className={css.nav}>
          <LogoTitle />

          <div style={{ display: "flex", gap: "75px" }}>
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

            {!user && (
              <div className={css.btns}>
                <button
                  className={css["log-btn"]}
                  onClick={handleOpenLoginForm}
                >
                  Log In
                </button>
                <button
                  className={css["reg-btn"]}
                  onClick={handleOpenRegisterForm}
                >
                  Registration
                </button>
              </div>
            )}
          </div>
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
        {login && <LoginForm />}
        {register && <RegistrationForm />}
      </ModalWindow>
    </>
  );
};

export default HomePageHeader;
