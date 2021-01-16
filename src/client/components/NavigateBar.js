import React, { useState, useEffect } from "react";
import "./HomePage.css";
import logo from "./../assets/images/mealsharing.png";
import { SearchBarFeature } from "./SearchBarFeature";

export function NavigateBar() {
  return (
    <nav>
      <img
        src={logo}
        alt="Meal Sharing"
        width="20%"
        style={{ borderRadius: "30px" }}
      />
      <SearchBarFeature />
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="./menu">Menu</a>
        </li>
        <li>
          <a href="./meals">Add a Meal</a>
        </li>
        <li>
          <a href="./reviews">Reviews</a>
        </li>
        <li>
          <a href="./contactus">Contact us</a>
        </li>
      </ul>
    </nav>
  );
}
