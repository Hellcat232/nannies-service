import css from "./FavoritesPage.module.css";
import FixedHeader from "../../components/FixedHeader/FixedHeader";
import CardList from "../../components/CardList/CardList";
import Filter from "../../components/Filter/Filter";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useState, useEffect } from "react";

export default function FavoritesPage() {
  // const [user] = useAuthState(auth);
  const [favoritesNannies, setFavoritesNannies] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = JSON.parse(localStorage.getItem("nanny")) || [];
      setFavoritesNannies(savedFavorites);
    };

    loadFavorites();

    const handleStorageChange = (event) => {
      if (event.key === "nanny") {
        loadFavorites();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function handleFilterChange(category) {
    setFilterCategory(category);
  }

  function filteredFavorites() {
    const filtered = (() => {
      switch (filterCategory) {
        case "AZ":
          return [...favoritesNannies].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        case "ZA":
          return [...favoritesNannies].sort((a, b) =>
            b.name.localeCompare(a.name)
          );
        case "Less":
          return favoritesNannies.filter((nanny) => nanny.price_per_hour < 19);
        case "Greater":
          return favoritesNannies.filter((nanny) => nanny.price_per_hour >= 19);
        case "Popular":
          return favoritesNannies.filter((nanny) => nanny.rating >= 4.8);
        case "Notpopular":
          return favoritesNannies.filter((nanny) => nanny.rating < 4.8);
        case "All":
        default:
          return favoritesNannies;
      }
    })();

    return filtered.slice(0, itemsPerPage);
  }

  function removeFromFavorites(nannyId) {
    const savedFavorites = JSON.parse(localStorage.getItem("nanny")) || [];
    const updatedFavorites = savedFavorites.filter(
      (nanny) => nanny.id !== nannyId
    );

    localStorage.setItem("nanny", JSON.stringify(updatedFavorites));

    setFavoritesNannies(updatedFavorites);
  }

  function loadMoreItems() {
    setItemsPerPage((prevItemsPerPage) => prevItemsPerPage + 3);
  }

  return (
    <>
      <FixedHeader />

      <main className={css.main}>
        <section>
          {favoritesNannies.length > 0 && (
            <Filter onFilterChange={handleFilterChange} />
          )}
          <CardList
            dataValue={filteredFavorites()}
            removeFromFavorites={removeFromFavorites}
          />
          {itemsPerPage < favoritesNannies.length && (
            <button onClick={loadMoreItems} className={css.loadMoreBtn}>
              Load More
            </button>
          )}
        </section>
      </main>
    </>
  );
}
