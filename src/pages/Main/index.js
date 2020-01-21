import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";
import { saveFilms } from "../../states/modules/films";
import FilmItem from "../../components/FilmItem";

export default function Main({ history }) {
  const dispatch = useDispatch();

  const savedFilms = useSelector(({ films }) => films.savedFilms);

  useEffect(() => {
    dispatch(saveFilms());
  }, [dispatch]);

  return (
    <div id="app">
      <div id="menu">
        <a href="/">GoFilms</a>
        <button onClick={() => history.push("/search")}>Buscar filmes</button>
      </div>
      <main>
        <ul>
          {savedFilms ? (
            savedFilms.map((film, index) => (
              <FilmItem main key={index} film={film} />
            ))
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
