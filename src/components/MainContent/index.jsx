import React, { useState, useEffect } from "react";
import Searchbar from "../Searchbar/index.jsx";
import fetchData from "../../services/fetchMoviesData.js";
import MoviesList from "../MoviesList/index.jsx";
import useDebounce from "../../hooks/useDebounce.jsx";

export default function Container() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchQuery, 500)

  const fetchMovies = async () => {
    const movieData = await fetchData("all", page, debouncedSearchTerm);
    setMovies((prevMovies) => [...prevMovies, ...movieData]);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchMovies();
  }, [debouncedSearchTerm]);

  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log("pag: " + page);
  return (
    <section className=" m-auto h-[100vh] py-9 px-14 text-center">
      
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {searchQuery && movies.length === 0 && <p className="mt-20 my-auto text-2lg text-black font-bold"> موردی یافت نشد </p>}
        {!searchQuery && movies.length === 0 ? (
          <p className="mt-20 my-auto text-2lg text-black font-bold"> ... در حال جستجو </p>
        ) : (
          <MoviesList movies={movies} />
        )}
     
    </section>
  );
}
