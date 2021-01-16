import React, { useState, useEffect, useContext } from "react";
import "./HomePage.css";
import { useHistory } from "react-router-dom";
import { SearchContext } from "./HomePage";
import { StarRating } from "./StarRating";
import { StarRatingSelected } from "./StarRatingSelected";

export function MealsList() {
  const search = useContext(SearchContext);
  const [data, setData] = useState(null);
  const stars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (search !== "") {
    var fetchURL = `api/meals?title=${search}`;
  } else fetchURL = "/api/meals";

  const getData = () => fetch(`${fetchURL}`).then((res) => res.json());

  useEffect(() => {
    getData().then((data) => setData(data));
  }, [search]);

  const history = useHistory();

  const routeChangeToReserve = (item) => {
    let path = `/meals/reservations/${item}`;
    history.push(path);
  };

  const routeChangeToReview = (item) => {
    let path = `/meals/reviews/${item}`;
    history.push(path);
  };

  function dateHandler(item) {
    const eventdate = item.split("T");
    return eventdate;
  }

  return (
    <div
      className={data?.length <= 4 || search ? "meal-list-search" : "meal-list"}
    >
      {data?.map((item) => (
        <ul className="meal-list2" key={item.id}>
          <li>Title: {item.title}</li>
          <li>Description: {item.description}</li>
          <li>Date for event : {dateHandler(item.createdAt)[0]}</li>
          <li>Price: {item.price} DKK</li>
          <li>Max number of guests: {item.number_of_guests} persons</li>
          <div>
            <div className="button-section">
              <button onClick={() => routeChangeToReserve(item.id)}>
                Reserve
              </button>
              <button onClick={() => routeChangeToReview(item.id)}>
                Review
              </button>
            </div>
            <div style={{ display: "flex" }} className="star-group">
              {stars.map((x, i) =>
                item.averageRate < i + 1 ? (
                  <StarRating key={i} />
                ) : (
                  <StarRatingSelected key={i} />
                )
              )}
            </div>
          </div>
        </ul>
      ))}
    </div>
  );
}
