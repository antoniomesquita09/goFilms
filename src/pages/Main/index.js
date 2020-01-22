import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import "./index.css";
import { getSavedFilms } from "../../states/modules/films";
import FilmItem from "../../components/FilmItem";

export default function Main({ history }) {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const savedFilms = useSelector(({ films }) => films.savedFilms);

  const totalPages =
    savedFilms.length % 10
      ? Math.floor(savedFilms.length / 10) + 1
      : Math.floor(savedFilms.length / 10);

  useEffect(() => {
    dispatch(getSavedFilms());
  }, [dispatch]);

  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentPage(currentPage + 1);
        }
      },
      { threshold: 1 }
    )
  );

  const infiniteRef = useCallback(
    node => {
      if (node !== null) {
        observer.current.observe(node);
      }
    },
    [observer]
  );

  let loadNewPage = totalPages > 1 && totalPages > currentPage;

  return (
    <div id="app">
      <div id="menu">
        <a href="/">GoFilms</a>
        <button onClick={() => history.push("/search")}>Buscar filmes</button>
      </div>
      <main>
        <ul>
          {savedFilms ? (
            savedFilms.map((film, index) => {
              if (index < currentPage * 10) {
                return <FilmItem main key={index} film={film} />;
              } else return null;
            })
          ) : (
            <p>
              Você ainda não possui filmes salvos. Clique em "Buscar filmes"
              para adicionar novos filmes a sua biblioteca.
            </p>
          )}
        </ul>
        {loadNewPage ? (
          <div className="loader-block" ref={infiniteRef}>
            <Loader
              type="Oval"
              color="#7d40e7"
              height={20}
              width={20}
              timeout={3000} //3 secs
            />
          </div>
        ) : null}
      </main>
    </div>
  );
}
