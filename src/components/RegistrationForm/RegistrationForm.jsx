import { useForm } from "react-hook-form";
import css from "./RegistrationForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

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
  const onSubmit = async (data) => {
    const { email, password, repeat } = data;
    if (password !== repeat) return toast("Password not matches");
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      navigate("/nannies");
      return res;
    } catch (error) {
      console.log(error.message);
      toast(error.message);
    }
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
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register("password")}
          placeholder="Password"
          className={css["register-inputs"]}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input
          {...register("repeat")}
          placeholder="Repeat password"
          className={css["register-inputs"]}
        />
        {errors.repeat && <p>{errors.repeat.message}</p>}
      </div>

      <button type="submit" className={css["register-btn"]}>
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
