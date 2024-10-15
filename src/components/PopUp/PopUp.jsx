import css from "./PopUp.module.css";
import Modal from "react-modal";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

const customStyles = {
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    overflowY: "auto",
    overflowX: "hidden",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    marginBottom: "10px",
    transform: "translate(-50%, -50%)",
    width: "472px",
    borderRadius: "30px",
    padding: "64px",
    maxHeight: "80vh",
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

const schema = yup
  .object({
    address: yup.string().required(),
    number: yup.number().positive().integer().required(),
    age: yup.number(),
    // time: yup.date(),
    email: yup.string().required(),
    parent: yup.string(),
    comment: yup.string(),
  })
  .required();

const PopUp = ({
  popUpIsOpen,
  onRequestClose,
  afterOpenModal,
  setPopUpIsOpen,
  name,
  avatar,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    toast.success("Appointment was booked!");
    reset();
    setPopUpIsOpen(false);
  };

  const handleCloseModal = () => {
    setPopUpIsOpen(false);
  };

  useEffect(() => {
    if (popUpIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [popUpIsOpen]);

  return (
    <>
      <Modal
        isOpen={popUpIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
        onRequestClose={handleCloseModal}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
      >
        <button className={css["modal-close"]}>
          <IoMdClose onClick={handleCloseModal} />
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className={css["booking-form"]}>
          <div className={css["title-descr"]}>
            <h2 className={css["main-title"]}>
              Make an appointment
              <br /> with a babysitter
            </h2>
            <p className={css["main-description"]}>
              Arranging a meeting with a caregiver for your child is the first
              step to creating a safe and comfortable environment. Fill out the
              form below so we can match you with the perfect care partner.
            </p>

            <div className={css["avatar-div"]}>
              <img src={avatar} alt="" className={css.img} />
              <div className={css["your-nanny"]}>
                <p className={css["nanny-text"]}>Your nanny</p>
                <p className={css["nanny-name"]}>{name}</p>
              </div>
            </div>
          </div>
          <div className={css["short-inputs-div"]}>
            <input
              {...register("address")}
              placeholder="Address"
              className={css["short-inputs"]}
            />
            {errors.address && <p>{errors.address.message}</p>}

            <input
              {...register("number")}
              placeholder="+380"
              className={css["short-inputs"]}
            />
            {errors.number && <p>{errors.number.message}</p>}

            <input
              {...register("age")}
              placeholder="Child's age"
              className={css["short-inputs"]}
            />
            {errors.age && <p>{errors.age.message}</p>}

            <input
              type="time"
              {...register("time")}
              placeholder="00:00"
              className={css["short-inputs"]}
            />
            {/* <p>{errors.password.message}</p> */}
          </div>
          <div className={css["long-inputs-div"]}>
            <input
              {...register("email")}
              placeholder="Email"
              className={css["long-inputs"]}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
              {...register("parent")}
              placeholder="Father's or mother's name"
              className={css["long-inputs"]}
            />
            {errors.parent && <p>{errors.parent.message}</p>}

            <input
              type="textarea"
              {...register("comment")}
              placeholder="Comment"
              className={css["textarea-inputs"]}
            />
            {errors.comment && <p>{errors.comment.message}</p>}
          </div>

          <button type="submit" className={css["book-btn"]}>
            Send
          </button>
        </form>
      </Modal>
    </>
  );
};

export default PopUp;
