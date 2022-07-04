import "./styles.css";

import { Modal } from "../Modal";
import { useEffect, useState } from "react";

export function GameOver({
  restartGame,
  score,
  saveLocalHighScores,
  orderedHighScores,
}) {
  console.log(orderedHighScores.length);

  return (
    <div className="end">
      {orderedHighScores.map((item) => item.score <= score) &&
        (score !== 0 ? (
          <Modal score={score} saveLocalHighScores={saveLocalHighScores} />
        ) : (
          <>
            <h1>Game over</h1>

            <div className="points-container">
              <h3>Sua pontuação</h3>
              <span>{score}</span>
            </div>

            <button className="button" onClick={restartGame}>
              REINICIAR
            </button>
          </>
        ))}
    </div>
  );
}
