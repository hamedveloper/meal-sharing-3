// /* eslint-disable camelcase */
// /* eslint-disable @typescript-eslint/camelcase */
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import "./TestComponentStyle.css";

// export function TestComponent() {
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [date, setDate] = useState("");
//   const [price, setPrice] = useState("");
//   const [numberOfGuest, setNumberOfGuest] = useState("");

//   function onSubmit() {
//     async function myfetch() {
//       await fetch("http://localhost:3000/api/meals", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: title,
//           description: desc,
//           createdAt: date,
//           price: price,
//           number_of_guests: numberOfGuest,
//         }),
//       });
//     }
//     myfetch();
//   }

//   return (
//     <section className="test-component">
//       <label>Title:</label>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       ></input>
//       <br />
//       <label>Description: </label>
//       <input
//         type="text"
//         value={desc}
//         onChange={(e) => setDesc(e.target.value)}
//       ></input>
//       <br />
//       <label>Date: </label>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       ></input>
//       <br />
//       <label>Price: </label>
//       <input
//         type="text"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//       ></input>
//       <br />
//       <label>Number of guests: </label>
//       <input
//         type="text"
//         value={numberOfGuest}
//         onChange={(e) => setNumberOfGuest(e.target.value)}
//       ></input>

//       <button onClick={onSubmit}>submit</button>
//     </section>
//   );
// }
