import React, { useState } from "react";
import { SearchBarFeature } from "./SearchBarFeature";
import { SearchBarList } from "./SearchBarList";

export function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <SearchBarFeature search={search} setSearch={setSearch} />
      <SearchBarList {...{ search }} />
    </div>
  );
}
