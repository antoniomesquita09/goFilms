import React from "react";

import "./styles.css";

export default function FilmItem({ film, main }) {
  async function addToStorage(item) {
    const filmsArray = await JSON.parse(localStorage.getItem("filmList"));
    if (!filmsArray) {
      const filmsArray = [];
      filmsArray.push(item);
      await localStorage.setItem("filmList", JSON.stringify(filmsArray));
    } else {
      filmsArray.push(item);
      await localStorage.setItem("filmList", JSON.stringify(filmsArray));
    }
  }

  async function removeToStorage(item) {
    const filmsArray = await JSON.parse(localStorage.getItem("filmList"));
    const newFilmArray = filmsArray.filter(function(el) {
      return el.Title !== item.Title;
    });
    await localStorage.setItem("filmList", JSON.stringify(newFilmArray));
  }

  return (
    <li className="film-item">
      <header>
        <img
          src="https://avatars2.githubusercontent.com/u/44874857?s=460&v=4"
          alt="alt"
        />
        <div className="film-info">
          <strong>{film.Title}</strong>
          <span>{film.Year}</span>
        </div>
      </header>
      <p>Bio do filme</p>
      {!main ? (
        <button
          type="button"
          className="salve"
          onClick={() => addToStorage(film)}
        >
          Salvar
        </button>
      ) : (
        <button
          type="button"
          className="delete"
          onClick={() => removeToStorage(film)}
        >
          Remover
        </button>
      )}
    </li>
  );
}
