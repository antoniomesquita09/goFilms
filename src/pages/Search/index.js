import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
// import InfiniteScroll from "react-infinite-scroll-component";

import { getFilms } from "../../states/modules/films"
import "./SideBar.css";
import "./Main.css";
import "./index.css";
import FilmItem from "../../components/FilmItem";

export default function Search() {
  const [title, setTitle] = useState("");
  // const [page, setPage] = useState(1);
  const dispatch = useDispatch()

  const allFilms = useSelector(({films}) => films.films)

  async function searchFilms(e) {
    e.preventDefault();
    dispatch(getFilms(title));
    setTitle("");
  }

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
            ? allFilms.map(film => <FilmItem key={film._id} film={film} />)
            : null}
        </ul>
      </main>
    </div>
  );
}
