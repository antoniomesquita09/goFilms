import React from "react";
import { useDispatch } from "react-redux"

import { saveFilms, removeSavedFilms } from "../../states/modules/films"
import "./styles.css";

export default function FilmItem({ film, main }) {
  const dispatch = useDispatch()
  
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
          onClick={() => dispatch(saveFilms(film))}
        >
          Salvar
        </button>
      ) : (
        <button
          type="button"
          className="delete"
          onClick={() => dispatch(removeSavedFilms(film))}
        >
          Remover
        </button>
      )}
    </li>
  );
}
