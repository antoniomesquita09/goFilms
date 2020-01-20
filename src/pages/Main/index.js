import React, { useEffect, useState } from "react";
import FilmItem from "../../components/FilmItem";

export default function Main() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function loadFilms() {
      const storageFilms = await JSON.parse(localStorage.getItem("filmList"));

      console.log(storageFilms);

      setFilms([...films, storageFilms]);
    }
    loadFilms();
  }, [films]);
  return (
    <div id="app">
      <div id="header">
        <a href="/">GoFilms</a>
        <a href="/search">
          <strong>Buscar filme</strong>
        </a>
      </div>
      <main>
        <ul>
          {films[0]
            ? films[0].map(film => <FilmItem main key={film._id} film={film} />)
            : null}
        </ul>
      </main>
    </div>
  );
}
