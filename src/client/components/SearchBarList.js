import React, { useState, useEffect, useContext } from "react";

export function SearchBarList({ search }) {
  const [data, setData] = useState(null);

  const fetchURL = `/api/meals?title=${search}`;

  const getData = () => fetch(`${fetchURL}`).then((res) => res.json());

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, [search]);

  return (
    <div className="meal-list">
      {data?.map((item) => (
        <ul key={item.id}>
          <li>Title: {item.title}</li>
          <li>Description: {item.description}</li>
          <li>Created at: {item.createdAt}</li>
          <li>Price: {item.price} DKK</li>
          <li>Max number of guests: {item.number_of_guests} persons</li>
          <br />
        </ul>
      ))}
    </div>
  );
}
