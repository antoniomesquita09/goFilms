import React, { useState } from "react";

import api from "../../services/api";
import "./SideBar.css";
import "./Main.css";
import "./index.css";
import FilmItem from "../../components/FilmItem";

export default function Search() {
  const [films, setFilms] = useState([]);
  const [title, setTitle] = useState("");

  async function searchFilms(e) {
    e.preventDefault();
    const response = await api.get("/", {
      params: {
        Title: title
      }
    });

    setFilms([...films, response.data.data]);
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
          {films[0]
            ? films[0].map(film => <FilmItem key={film._id} film={film} />)
            : null}
        </ul>
      </main>
    </div>
  );
}
