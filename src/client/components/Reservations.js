import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

export function Reservations() {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [name, setName] = useState(null);
  const [guestNr, setGuestNr] = useState(null);
  const [phoneNr, setPhoneNr] = useState(null);
  const [email, setEmail] = useState(null);

  const fetchURL = `/api/meals/${parseInt(id)}`;

  const getData = () => fetch(`${fetchURL}`).then((res) => res.json());

  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);

  function availability() {
    const selectedMeal = data?.map((item) => {
      const myResult = {
        number_of_guests: item.number_of_guests,
      };
      return myResult;
    });
    const availabilityToBook = selectedMeal[0].number_of_guests - guestNr;
    return availabilityToBook;
  }

  function SubmitReservation() {
    async function myfetch() {
      try {
        await fetch("/api/reservations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            guestamount: guestNr,
            phonenumber: phoneNr,
            email: email,
            mealId: parseInt(id),
          }),
        }).then((res) => {
          if (!res.ok) {
            return Promise.reject({
              status: res.status,
              statusText: res.statusText,
            });
          }
          return alert(
            "Thank you! Your reservation has been registered successfully"
          );
        });
        async function fetchUpdate() {
          await fetch(
            `/api/meals/${parseInt(id)}?numberOfGuests=${availability()}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id,
              }),
            }
          );
        }
        fetchUpdate();

        if (availability() === 0) {
          async function newfetch() {
            await fetch(`/api/meals/${parseInt(id)}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id,
              }),
            });
          }
          newfetch();
        }
      } catch (error) {
        alert(
          error.statusText +
            " :Please fill all fields and try again. Check if you have put phonenumber and guest amount as a number!"
        );
      }
    }
    myfetch();
  }

  return (
    <section>
      <div className="review-list-section">
        {data?.map((item) => (
          <ul key={item.id} className="meal-list2">
            <li>Title: {item.title}</li>
            <li>Description: {item.description}</li>
            <li>Created at: {item.createdAt}</li>
            <li>Price: {item.price} DKK</li>
            <li>Max number of guests: {item.number_of_guests} persons</li>
            <br />
          </ul>
        ))}
      </div>

      <div className="add-meal" style={{ color: "#6b5835" }}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br />
        <label>How many guest: </label>
        <input
          type="text"
          value={guestNr}
          onChange={(e) => setGuestNr(e.target.value)}
        ></input>
        <br />
        <label>Phone Number: </label>
        <input
          type="text"
          value={phoneNr}
          onChange={(e) => setPhoneNr(e.target.value)}
        ></input>
        <br />
        <label>E-mail: </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <button
          type="submit"
          onClick={() =>
            availability() >= 0
              ? SubmitReservation()
              : alert(
                  "Check If you have booked less thana max number of reservation"
                )
          }
        >
          Reserve
        </button>
      </div>
    </section>
  );
}
