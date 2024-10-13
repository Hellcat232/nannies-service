import { useForm } from "react-hook-form";
import css from "./RegistrationForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { IoEyeOff, IoEye } from "react-icons/io5";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.number().positive().integer().required(),
  })
  .required();

const RegistrationForm = () => {
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
    const { name, email, password } = data;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: name,
      });

      navigate("/nannies");

      reset();

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
          {...register("name")}
          placeholder="Name"
          className={css["register-inputs"]}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input
          {...register("email")}
          placeholder="Email"
          className={css["register-inputs"]}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <div className={css["password-wrapper"]}>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className={css["register-inputs"]}
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

      <button type="submit" className={css["register-btn"]}>
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
