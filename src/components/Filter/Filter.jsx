import css from "./Filter.module.css";
import { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const [selectCategory, setSelectCategory] = useState("All");

  const handleSelectChange = (e) => {
    setSelectCategory(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className={css.filter}>
      <label htmlFor="categories" className={css.label}>
        Filters
      </label>
      <select
        value={selectCategory}
        onChange={handleSelectChange}
        id="categories"
        className={css.select}
      >
        <option value="AZ" className={css.option}>
          A to Z
        </option>
        <option value="ZA" className={css.option}>
          Z to A
        </option>
        <option value="Less" className={css.option}>
          Less than 19$
        </option>
        <option value="Greater" className={css.option}>
          Greater than 19$
        </option>
        <option value="Popular" className={css.option}>
          Popular
        </option>
        <option value="Notpopular" className={css.option}>
          Not popular
        </option>
        <option value="All" className={css.option}>
          Show all
        </option>
      </select>
    </div>
  );
};

export default Filter;
