import "./styles.css";

export function StartGame({ startGame, orderedHighScores }) {
  // console.log(orderedHighScores);
  return (
    <div className="start">
      <h1>Secret Word</h1>

      <button className="button" onClick={startGame}>
        JOGAR
      </button>

      {orderedHighScores.length > 0 && (
        <ul className="highscores">
          {orderedHighScores.map(
            (high, index) =>
              index <= 4 && (
                <li key={index}>
                  {index + 1}° - {high.name} - {high.score}
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
}
