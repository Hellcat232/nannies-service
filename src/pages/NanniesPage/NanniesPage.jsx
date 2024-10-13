import FixedHeader from "../../components/FixedHeader/FixedHeader";
import CardList from "../../components/CardList/CardList";
import Filter from "../../components/Filter/Filter";
import css from "./NanniesPage.module.css";
import { nanniesRef } from "../../firebase/firebase";
import { get } from "firebase/database";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function NanniesPage() {
  const [dataValue, setDataValue] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(3); // Показываем по 3 элемента на страницу

  useEffect(() => {
    const database = async () => {
      try {
        const res = await get(nanniesRef);
        // console.log(res.val());

        setDataValue(res.val());
        return res.val();
      } catch (error) {
        console.log(error);
        toast(error.message);
      }
    };

    database();
  }, []);

  function handleFilterChange(category) {
    setFilterCategory(category);
  }

  function filteredData() {
    const filtered = (() => {
      switch (filterCategory) {
        case "AZ":
          return [...dataValue].sort((a, b) => a.name.localeCompare(b.name));
        case "ZA":
          return [...dataValue].sort((a, b) => b.name.localeCompare(a.name));
        case "Less":
          return dataValue.filter((nanny) => nanny.price_per_hour < 19);
        case "Greater":
          return dataValue.filter((nanny) => nanny.price_per_hour >= 19);
        case "Popular":
          return dataValue.filter((nanny) => nanny.rating >= 4.8);
        case "Notpopular":
          return dataValue.filter((nanny) => nanny.rating < 4.8);
        case "All":
        default:
          return dataValue;
      }
    })();

    // Возвращаем только те элементы, которые относятся к текущей "странице"
    return filtered.slice(0, itemsPerPage);
  }

  function loadMoreItems() {
    setItemsPerPage((prevItemsPerPage) => prevItemsPerPage + 3); // Увеличиваем количество отображаемых элементов на 3
  }

  return (
    <>
      <FixedHeader />

      <main className={css.main}>
        <section>
          <Filter onFilterChange={handleFilterChange} />
          <CardList dataValue={filteredData()} />
          {itemsPerPage < dataValue.length && (
            <button onClick={loadMoreItems} className={css.loadMoreBtn}>
              Load More
            </button>
          )}
        </section>
      </main>
    </>
  );
}
