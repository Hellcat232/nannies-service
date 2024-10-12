import css from "./FavoritesPage.module.css";
import FixedHeader from "../../components/FixedHeader/FixedHeader";
import CardList from "../../components/CardList/CardList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useState, useEffect } from "react";

export default function FavoritesPage() {
  const [user] = useAuthState(auth);
  const [favoritesNannies, setFavoritesNannies] = useState([]);

  const loadFavorites = () => {
    if (!user) return;
    const savedFavorites = JSON.parse(localStorage.getItem("nanny")) || [];
    setFavoritesNannies(savedFavorites);
  };

  // Використовуємо useEffect, щоб завантажувати список обраних при зміні localStorage
  useEffect(() => {
    loadFavorites(); // Завантажуємо обраних при першому рендері

    // Стежимо за змінами в localStorage, викликаючи подію
    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener("storage", handleStorageChange);

    // Очищаємо ефект після виходу з компонента
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [favoritesNannies]);

  return (
    <>
      <FixedHeader />

      <main className={css.main}>
        <section>
          <CardList dataValue={favoritesNannies} />
        </section>
      </main>
    </>
  );
}
