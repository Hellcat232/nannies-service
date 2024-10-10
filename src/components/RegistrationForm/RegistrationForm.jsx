import { useForm } from "react-hook-form";
import css from "./RegistrationForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.number().positive().integer().required(),
    repeat: yup.number().positive().integer().required(),
  })
  .required();

const RegistrationForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    navigate("/nannies");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css["register-form"]}>
      <div className={css["title-descr"]}>
        <h2 className={css["register-title"]}>Registration</h2>
        <p className={css["register-description"]}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
      </div>

      <div className={css["inputs-div"]}>
        <input
          {...register("email")}
          placeholder="Email"
          className={css["register-inputs"]}
        />
        {/* <p>{errors.email.message}</p> */}

        <input
          {...register("password")}
          placeholder="Password"
          className={css["register-inputs"]}
        />
        {/* <p>{errors.password.message}</p> */}

        <input
          {...register("repeat")}
          placeholder="Repeat password"
          className={css["register-inputs"]}
        />
        {/* <p>{errors.repeat.message}</p> */}
      </div>

      <button type="submit" className={css["register-btn"]}>
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
