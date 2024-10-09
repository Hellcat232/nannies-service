import css from "./HomePage.module.css";
import Navigation from "../../components/Navigation/Navigation";

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main className={css.main}>
        <section>
          <h1>HomePage</h1>
        </section>
      </main>
    </>
  );
}
