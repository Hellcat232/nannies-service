import { NavLink } from "react-router-dom";
import PopUp from "../PopUp/PopUp";
import css from "./Card.module.css";
import { GrLocation } from "react-icons/gr";
import { RxStarFilled } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Card = ({ nanny, removeFromFavorites }) => {
  const [user] = useAuthState(auth);
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);
  const [heart, setHeart] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const {
    avatar_url,
    about,
    name,
    location,
    kids_age,
    birthday,
    experience,
    education,
    price_per_hour,
    rating,
    characters,
    reviews,
    id,
  } = nanny;

  useEffect(() => {
    if (user) {
      const favorites = JSON.parse(localStorage.getItem("nanny")) || [];
      const isFavorite = favorites.some((favorite) => favorite.id === id);
      setHeart(isFavorite);
    }
  }, [user, id]);

  function getAge(date) {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  const handlePopUpOpener = () => {
    setPopUpIsOpen(true);
  };

  const toFavorites = () => {
    if (!user) return toast("You need to be authenticated");

    const existingFavorites = JSON.parse(localStorage.getItem("nanny")) || [];

    const isItemAlreadyFavorite = existingFavorites.some(
      (favorite) => favorite.id === id
    );

    if (isItemAlreadyFavorite) {
      const updatedFavorites = existingFavorites.filter(
        (favorite) => favorite.id !== id
      );
      localStorage.setItem("nanny", JSON.stringify(updatedFavorites));

      if (updatedFavorites.length < existingFavorites.length) {
        setHeart(false);
        removeFromFavorites(id);
      }
    } else {
      const updatedFavorites = [...existingFavorites, nanny];
      localStorage.setItem("nanny", JSON.stringify(updatedFavorites));

      setHeart(true);
    }
  };

  return (
    <>
      <li className={css.card}>
        <img src={avatar_url} alt="" className={css["card-img"]} />
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div className={css["nanny-name-location"]}>
            <div className={css["nanny-name"]}>
              <p className={css.nanny}>Nanny</p>
              <p className={css.name}>{name}</p>
            </div>
            <div
              style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}
            >
              <div className={css["location-rating-price"]}>
                <div className={css["div-location"]}>
                  <GrLocation />
                  <p>{location}</p>
                </div>
                <span className={css.span}>|</span>
                <div className={css["div-rating"]}>
                  <RxStarFilled className={css.star} />
                  <p>Rating: {rating}</p>
                </div>
                <span className={css.span}>|</span>
                <div>
                  <p>
                    Price / 1 hour:{" "}
                    <span className={css.price}>{price_per_hour}$</span>
                  </p>
                </div>
              </div>

              <div>
                <button className={css["btn-heart"]} onClick={toFavorites}>
                  {heart ? (
                    <AiFillHeart size="26px" className={css["full-heart"]} />
                  ) : (
                    <AiOutlineHeart
                      size="26px"
                      className={css["empty-heart"]}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <ul className={css["nanny-characters"]}>
              <li className={css.li}>
                <p className={css.text}>
                  Age: <span>{getAge(birthday)}</span>
                </p>
              </li>
              <li className={css.li}>
                <p className={css.text}>
                  Experience: <span>{experience}</span>
                </p>
              </li>
              <li className={css.li}>
                <p className={css.text}>
                  Kids Age: <span>{kids_age}</span>
                </p>
              </li>
              <li className={css.li}>
                <p className={css.text}>
                  Characters:{" "}
                  <span>
                    {`${characters[0]}, ${characters[1]}, ${characters[2]}, ${characters[3]}`}
                  </span>
                </p>
              </li>
              <li className={css.li}>
                <p className={css.text}>
                  Education: <span>{education}</span>
                </p>
              </li>
            </ul>
          </div>
          <div className={css["down-card"]}>
            <p className={css.about}>{about}</p>

            <NavLink onClick={handleReadMore} className={css["read-more"]}>
              {readMore ? "Read less" : "Read more"}
            </NavLink>

            {readMore && (
              <div className={css["extended-info"]}>
                <div className={css.reviews}>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "25px",
                    }}
                  >
                    {reviews && reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <li key={index} className={css.review}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "12px",
                            }}
                          >
                            <div className={css["review-span"]}>
                              <p className={css["first-spell"]}>
                                {review.reviewer.slice(0, 1)}
                              </p>
                            </div>
                            <div className={css["reviewer-rating"]}>
                              <p className={css.reviewer}>
                                <strong>{review.reviewer}</strong>
                              </p>
                              <p className={css.rating}>
                                <RxStarFilled className={css.star} />
                                {review.rating}
                              </p>
                            </div>
                          </div>
                          <p>{review.comment}</p>
                        </li>
                      ))
                    ) : (
                      <p>No reviews available</p>
                    )}
                  </ul>
                </div>

                <button
                  type="submit"
                  className={css["appointment-btn"]}
                  onClick={handlePopUpOpener}
                >
                  Make an appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </li>
      <PopUp
        popUpIsOpen={popUpIsOpen}
        setPopUpIsOpen={setPopUpIsOpen}
        name={name}
        avatar={avatar_url}
      />
    </>
  );
};

export default Card;
