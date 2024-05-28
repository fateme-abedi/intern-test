import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/index.jsx";

export default function Container({ movies }) {
  return (
    <div className="flex justify-between gap-2 flex-wrap mt-7 mx-auto mb-0 md:justify-center">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          src={movie.imageUrl}
          movieName={movie.name}
          type={movie.type}
          url={movie.url}
        />
      ))}
    </div>
  );
}
