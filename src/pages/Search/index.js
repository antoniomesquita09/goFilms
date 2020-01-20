import React, { useState } from 'react';

import api from "../../services/api"
import "./SideBar.css";
import "./Main.css";
import "./index.css";
import FilmItem from "../../components/FilmItem"

export default function Search() {
  const [ films, setFilms ] = useState([]);
  const [ title, setTitle ] = useState("");

  async function searchFilms(e) {
    e.preventDefault();
    const response = await api.get("/", {
      params: {
        Title: title
      }
    });

    setFilms([...films, response.data]);
    setTitle("");
  }

  return (
    <div id="app">
      <aside>
        <strong>Buscar filme</strong>
        <form onSubmit={searchFilms}>
          <div className="input-block">
            <label htmlFor="github_username">Nome do filme</label>
            <input
              name="github_username"
              id="github_username"
              required
              value={title}
              onChange={e => {setTitle(e.target.value)}}
            />
          </div>
          <button type="submit">Buscar</button>
        </form>
      </aside>
      <main>
        <ul>
          <FilmItem />
          <FilmItem />
          <FilmItem />
          <FilmItem />
          <FilmItem />
          <FilmItem />
          <FilmItem />
          <FilmItem />
        </ul>
      </main>
    </div>
  );
}
