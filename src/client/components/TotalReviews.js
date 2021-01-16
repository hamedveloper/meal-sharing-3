import React, { useState, useEffect } from "react";
import { ReviewRating } from "./ReviewRating";

export function TotalReview() {
  const [totalReview, setTotalReview] = useState([]);
  const [data, setData] = useState([]);
  const [searchReview, setSearchReview] = useState("");

  //..................Make search section for reviews by meal name....(1)

  const mealsName = data?.map((meal) => {
    return { title: meal.title, id: meal.id };
  });

  if (searchReview) {
    const commonId = mealsName
      .filter((x) => x.title.toUpperCase().match(searchReview.toUpperCase()))
      .map((x) => x.id);

    var fetchURL = `/api/reviews/meal/${commonId}`;
  } else fetchURL = "/api/reviews";

  //finish part (1)

  const getData = () => fetch(`${fetchURL}`).then((res) => res.json());

  useEffect(() => {
    getData().then((data) => setTotalReview(data));
  }, [searchReview]);

  //..............this section is used for getting meal name (2)

  const mealData = () => fetch("/api/meals").then((res) => res.json());

  useEffect(() => {
    mealData().then((data) => setData(data));
  }, [totalReview, searchReview]);

  //finish part(2)
  return (
    <section>
      <div>
        <input
          type="text"
          className="searchbar"
          value={searchReview}
          placeholder="Search the meal that you want to see reviews"
          onChange={(e) => setSearchReview(e.target.value)}
        ></input>
      </div>

      <div className="treview-list">
        {totalReview.map((item) => (
          <ul key={item.id} className="meal-list2">
            {mealsName
              .filter((x) => x.id === item.mealId)
              .map((x) => (
                <li key={x.id}>Meal: {x.title}</li>
              ))}
            <li>Comments: {item.content}</li>
            <li>Name: {item.name}</li>
            <li style={{ width: "30%", margin: "10px 0 10px 0" }}>
              <ReviewRating ratedAmount={item.numberOfStars * 2} />
            </li>
          </ul>
        ))}
      </div>
    </section>
  );
}
