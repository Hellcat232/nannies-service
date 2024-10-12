import FixedHeader from "../../components/FixedHeader/FixedHeader";
import CardList from "../../components/CardList/CardList";
import css from "./NanniesPage.module.css";
import { nanniesRef } from "../../firebase/firebase";
import { get } from "firebase/database";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function NanniesPage() {
  const [dataValue, setDataValue] = useState([]);

  useEffect(() => {
    const database = async () => {
      try {
        const res = await get(nanniesRef);
        console.log(res.val());

        setDataValue(res.val());
        return res.val();
      } catch (error) {
        console.log(error);
        toast(error.message);
      }
    };

    database();
  }, []);

  return (
    <>
      <FixedHeader />

      <main className={css.main}>
        <section>
          <CardList dataValue={dataValue} />
        </section>
      </main>
    </>
  );
}
