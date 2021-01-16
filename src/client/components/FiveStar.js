import React, { useState } from "react";

function Star({ rating, onClick, starId, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={rating > starId ? "star selected" : "star"}
      onClick={onClick}
    />
  );
}

export function FiveStar({ rating, setRating }) {
  const stars = [0, 1, 2, 3, 4];
  const [hoverState, setHoverState] = useState(0);

  return (
    <div className="star-holder">
      {stars.map((star, i) => (
        <Star
          key={i}
          starId={i}
          rating={hoverState || rating}
          onMouseEnter={() => setHoverState(i + 1)}
          onMouseLeave={() => setHoverState(0)}
          onClick={() => setRating(i + 1)}
        />
      ))}
    </div>
  );
}
