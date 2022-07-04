import { useRef, useState } from "react";

import "./styles.css";

export function Modal({ score, saveLocalHighScores }) {
  const [name, setName] = useState("");
  const nameInputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    saveLocalHighScores(name.toUpperCase());
  }

  return (
    <div className="modal">
      <h1>Parabéns</h1>

      <div className="points-container">
        <h3>Sua pontuação</h3>
        <span>{score}</span>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Digite seu nome"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          ref={nameInputRef}
        />
        <button className="button">SALVAR</button>
      </form>
    </div>
  );
}
