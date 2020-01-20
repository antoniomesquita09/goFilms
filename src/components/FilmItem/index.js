import React from "react";
import "./styles.css";

export default function FilmItem({ film, main }) {
  function addToStorage(item) {
    const filmsArray = JSON.parse(localStorage.getItem("filmList"));
    if (!filmsArray) {
      const filmsArray = [];
      filmsArray.push(item);
      localStorage.setItem("filmList", JSON.stringify(filmsArray));
    } else {
      filmsArray.push(item);
      localStorage.setItem("filmList", JSON.stringify(filmsArray));
    }
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
        <button type="button" onClick={() => addToStorage(film)}>
          Salvar
        </button>
      ) : (
        <button>Remover</button>
      )}
    </li>
  );
}
