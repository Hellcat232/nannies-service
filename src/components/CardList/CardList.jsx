import css from "./CardList.module.css";
import Card from "../Card/Card";

const CardList = ({ dataValue, removeFromFavorites }) => {
  return (
    <ul>
      {dataValue.map((nanny, index) => {
        return (
          <Card
            key={nanny.id}
            nanny={nanny}
            removeFromFavorites={removeFromFavorites}
          />
        );
      })}
    </ul>
  );
};

export default CardList;
