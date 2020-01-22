import React, { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";

import { getFilms, updateFilms } from "../../states/modules/films";
import "./SideBar.css";
import "./Main.css";
import "./index.css";
import FilmItem from "../../components/FilmItem";

export default function Search() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const allFilms = useSelector(({ films }) => films.films);
  const totalPages = useSelector(({ films }) => films.totalPages);
  const currentPage = useSelector(({ films }) => films.currentPage);
  const currentSearch = useSelector(({ films }) => films.currentSearch);

  function searchFilms(e) {
    e.preventDefault();
    dispatch(getFilms({ title }));
  }

  function updateList() {
    dispatch(updateFilms());
  }

  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          updateList();
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
      <div id="header">
        <a href="/">GoFilms</a>
        <aside>
          <strong>Buscar filme</strong>
          <form onSubmit={searchFilms}>
            <div className="input-block">
              <label htmlFor="title">Nome do filme</label>
              <input
                name="title"
                id="title"
                required
                value={title}
                autoFocus
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <button type="submit">Buscar</button>
          </form>
        </aside>
      </div>
      <main>
        <ul>
          {allFilms
            ? allFilms.map((film, index) => (
                <FilmItem key={index} film={film} />
              ))
            : null}
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
        {currentSearch && totalPages === 0 ? <p>Busca não encontrada</p> : null}
      </main>
    </div>
  );
}
