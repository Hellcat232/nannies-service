import css from "./CardList.module.css";
import Card from "../Card/Card";

const CardList = ({ dataValue }) => {
  return (
    <ul>
      {dataValue.map((nanny, index) => {
        return <Card key={nanny.id} nanny={nanny} />;
      })}
    </ul>
  );
};

export default CardList;
