import React, { useEffect, useState } from "react";

import "./index.css";
import FilmItem from "../../components/FilmItem";

export default function Main({ history }) {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function loadFilms() {
      const storageFilms = await JSON.parse(localStorage.getItem("filmList"));

      setFilms([...films, storageFilms]);
    }
    loadFilms();
  }, [films]);

  return (
    <div id="app">
      <div id="menu">
        <a href="/">GoFilms</a>
        <button onClick={() => history.push("/search")}>Buscar filmes</button>
      </div>
      <main>
        <ul>
          {films[0] ? (
            films[0].map(film => <FilmItem main key={film.Title} film={film} />)
          ) : (
            <p>
              Você ainda não possui filmes salvos. Clique em "Buscar filmes"
              para adicionar novos filmes a sua biblioteca.
            </p>
          )}
        </ul>
      </main>
    </div>
  );
}
