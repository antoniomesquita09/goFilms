import React from "react";
import "./styles.css";

export default function FilmItem() {
  return (
    <li className="dev-item">
      <header>
        <img src="https://avatars2.githubusercontent.com/u/44874857?s=460&v=4" alt="alt" />
        <div className="user-info">
          <strong>Spiderman</strong>
          <span>Autores</span>
        </div>
      </header>
      <p>Bio do filme</p>
      <a href="/">
        Acessar perfil no github
      </a>
    </li>
  );
}