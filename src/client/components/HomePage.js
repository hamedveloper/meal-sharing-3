import React, { useState } from "react";
import "./HomePage.css";
import { MealsList } from "./MealsList";
import { NavigateBar } from "./NavigateBar";

export const SearchContext = React.createContext();
export const SetSearchContext = React.createContext();

export function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={search}>
      <SetSearchContext.Provider value={setSearch}>
        <NavigateBar className="NavbarItems" />

        <p className="mainPage">
          Here is the very amazing place to provide you an opportunity to share
          your meals with the others. We have a very luxux and beautiful place
          in the city center with every thing you need for making your meals and
          host your customers. And also here is a place for you as a customer to
          select what you want completely diffenet than the normal restaurants.
          Enjoy...
        </p>
        <MealsList />
        <section style={{ marginTop: "20px" }}>
          <footer>
            <p>All rights reserved @ Hamed karachi</p>
          </footer>
        </section>
      </SetSearchContext.Provider>
    </SearchContext.Provider>
  );
}
