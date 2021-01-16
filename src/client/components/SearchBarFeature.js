import React, { useContext } from "react";
import { SetSearchContext } from "./HomePage";
import { SearchContext } from "./HomePage";

export function SearchBarFeature() {
  const search = useContext(SearchContext);
  const setSearch = useContext(SetSearchContext);

  return (
    <input
      type="text"
      className="searchbar"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search your meal here"
    ></input>
  );
}
