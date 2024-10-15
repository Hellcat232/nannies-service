import Modal from "react-modal";
import css from "./ModalWindow.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";

const customStyles = {
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    overflowY: "hidden",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    marginBottom: "10px",
    transform: "translate(-50%, -50%)",
    // width: "565px",
    borderRadius: "30px",
    padding: "64px",
    // height: "490px",
    background: "#f5f6fb",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const ModalWindow = ({
  loginModalIsOpen,
  registerModalIsOpen,
  onRequestClose,
  setLoginOpenModal,
  setRegisterOpenModal,
  login,
  setLogin,
  register,
  setRegister,
  children,
}) => {
  const handleCloseModal = () => {
    if (login) {
      setLogin(false);
      setLoginOpenModal(false);
    } else {
      setRegister(false);
      setRegisterOpenModal(false);
    }
  };

  useEffect(() => {
    if (loginModalIsOpen || registerModalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loginModalIsOpen, registerModalIsOpen]);

  return (
    <>
      <Modal
        isOpen={loginModalIsOpen || registerModalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
        onRequestClose={handleCloseModal}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
      >
        <button className={css["modal-close"]}>
          <IoMdClose onClick={handleCloseModal} />
        </button>
        {children}
      </Modal>
    </>
  );
};

export default ModalWindow;
