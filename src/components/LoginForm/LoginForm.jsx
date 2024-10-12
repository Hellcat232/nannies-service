import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.number().positive().integer().required(),
  })
  .required();

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      navigate("/nannies");
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

        <input
          {...register("password")}
          placeholder="Password"
          className={css["login-inputs"]}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" className={css["login-btn"]}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
