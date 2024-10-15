import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { IoEyeOff, IoEye } from "react-icons/io5";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.mixed().required(),
  })
  .required();

const LoginForm = ({ setLoginModalIsOpen }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      navigate("/nannies");

      reset();
      setLoginModalIsOpen(false);
      return res;
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css["login-form"]}>
      <div className={css["title-descr"]}>
        <h2 className={css["login-title"]}>Log In</h2>
        <p className={css["login-description"]}>
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>
      </div>
      <div className={css["inputs-div"]}>
        <input
          {...register("email")}
          placeholder="Email"
          className={css["login-inputs"]}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <div className={css["password-wrapper"]}>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className={css["login-inputs"]}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={css["toggle-password"]}
          >
            {showPassword ? <IoEyeOff size="16" /> : <IoEye size="16" />}
          </button>
        </div>
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" className={css["login-btn"]}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
