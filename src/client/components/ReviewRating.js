import React from "react";
import { StarRating } from "./StarRating";
import { StarRatingSelected } from "./StarRatingSelected";

export function ReviewRating({ ratedAmount }) {
  const stars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div style={{ display: "flex" }} className="star-group">
      {stars.map((x, i) =>
        ratedAmount < i + 1 ? (
          <StarRating key={i} />
        ) : (
          <StarRatingSelected key={i} />
        )
      )}
    </div>
  );
}
