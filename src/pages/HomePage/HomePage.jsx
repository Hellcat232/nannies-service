import css from "./HomePage.module.css";
import { GoArrowUpRight } from "react-icons/go";

import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/nannies");
  };

  return (
    <div className={css.home}>
      <HomePageHeader />

      <main className={css.main}>
        <section className={css.section}>
          <div className={css.about}>
            <p className={css.description}>
              Make Life Easier
              <br /> for the Family:
            </p>
            <p className={css.text}>
              Find Babysitters Online for All Occasions
            </p>
            <button
              type="click"
              className={css["get-started-btn"]}
              onClick={handleGetStarted}
            >
              Get started <GoArrowUpRight size="24" />
            </button>
          </div>

          <div className={css.quantity}>
            <div className={css.ckeck}>
              <svg width="20" height="16" className={css.svg}>
                <use href="images/symbol-defs.svg#icon-feCheck1"></use>
              </svg>
            </div>
            <div className={css.descr}>
              <p className={css["exp-nannies"]}>Experienced nannies</p>
              <p className={css.calc}>15,000</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
