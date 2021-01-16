import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FiveStar } from "./FiveStar";

export function Reviews() {
  let { id } = useParams();
  const [data, setData] = useState([]);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(null);
  const [averageRate, setAverageRate] = useState(0);
  const [name, setName] = useState(null);

  const fetchURL = `/api/meals/${parseInt(id)}`;
  const getData = () => fetch(`${fetchURL}`).then((res) => res.json());

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  function submitReview() {
    async function myreviewfetch() {
      try {
        await fetch("/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numberOfStars: rating,
            content: review,
            mealId: parseInt(id),
            createdAt: new Date().toISOString().split("T")[0],
            name: name,
          }),
        }).then((res) => {
          if (!res.ok) {
            return Promise.reject({
              status: res.status,
              statusText: res.statusText,
            });
          }
          return alert(
            "Thank you for your feedback! Your review has been registered successfully"
          );
        });
      } catch (error) {
        alert(error.statusText + " :Please fill all fields and try agian");
      }
    }
    myreviewfetch();
  }

  const getDatas = () =>
    fetch(`api/reviews/${parseInt(id)}`).then((res) => res.json());

  useEffect(() => {
    getDatas().then((data) => {
      const numberofSelected = data.map((item) => item["avg(`numberOfStars`)"]);
      setAverageRate(parseInt(numberofSelected) * 2);
    });
  }, []);

  async function updateAverage() {
    await fetch(`/api/meals/${parseInt(id)}?averageRate=${averageRate}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
  }
  updateAverage();

  return (
    <section>
      <div className="review-list-section">
        {data?.map((item) => (
          <ul className="meal-list2" key={item.id}>
            <li>Title: {item.title}</li>
            <li>Description: {item.description}</li>
            <li>Created at: {item.createdAt}</li>
            <li>Price: {item.price} DKK</li>
            <li>Max number of guests: {item.number_of_guests} persons</li>
            <br />
          </ul>
        ))}
      </div>
      <div className="star-text-holder">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="star-holder">
          <span>Rate your review: </span>
          <FiveStar {...{ rating, setRating }} />
        </div>
      </div>
      <br />
      <form>
        <div className="review-form">
          <textarea
            type="text"
            value={review}
            className="review-box"
            placeholder="Type your review here"
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" onClick={submitReview}>
          Submit you review
        </button>
      </form>
    </section>
  );
}
