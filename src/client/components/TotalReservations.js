import React, { useState, useEffect } from "react";

export function TotalReservations() {
  const [reserve, setReserve] = useState([]);

  const fetchURL = "/api/reservations";

  const getData = () => fetch(`${fetchURL}`).then((res) => res.json());

  useEffect(() => {
    getData().then((data) => setReserve(data));
  }, []);
  return (
    <div>
      {reserve.map((item) => (
        <ul key={item.id} className="review-list meal-list2">
          <li>Name: {item.name}</li>
          <li>How much guests: {item.guestamount}</li>
          <li>Email: {item.email}</li>
          <li>Phone Number: {item.phonenumber}</li>
          <li>Meal title: {item.mealIdc}</li>
          <br />
        </ul>
      ))}
    </div>
  );
}
