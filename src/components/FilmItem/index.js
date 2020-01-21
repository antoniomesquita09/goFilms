import React, {useState} from "react";
import { useDispatch } from "react-redux"

import { saveFilms, removeSavedFilms } from "../../states/modules/films"
import "./styles.css";

export default function FilmItem({ film, main }) {
  const [ disable, setDisable ] = useState(false)
  const dispatch = useDispatch()
  
  function handleSave(item) {
    dispatch(saveFilms(item))
    setDisable(true)
  }

  return (
    <li className="film-item">
      <header>
        <img
          src="https://cdn.pixabay.com/photo/2013/07/13/14/05/clapperboard-162084__340.png"
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
          disabled={disable}
          onClick={() => handleSave(film)}
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
