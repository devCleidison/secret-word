import { useEffect, useRef, useState } from "react";
import "./styles.css";

export function Game({
  letters,
  category,
  verifyLetter,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  isWin,
  startGame,
  clearLetterAndGuessesStates,
  setIsWin,
}) {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    verifyLetter(letter.toUpperCase());
    letterInputRef.current.focus();
    setLetter("");
  }

  useEffect(() => {
    clearLetterAndGuessesStates();
    setIsWin(false);

    startGame();
  }, [isWin]);

  return (
    <div className="game">
      <div className="pointsAndGuesses">
        <span>
          pontos: <span>{score}</span>
        </span>
        <span>
          tentativas: <span>{guesses}</span>
        </span>
      </div>

      <h1>Qual é a palavra?</h1>

      <p>
        Dica sobre a palavra: <span>{category}</span>
      </p>

      <div className="board">
        {letters.map((letter, index) =>
          guessedLetters.includes(letter) ? (
            <div key={index} className="letter">
              {letter}
            </div>
          ) : (
            <div key={index} className="letter"></div>
          )
        )}
      </div>

      <div className="letterContainer">
        <p>Tente adivinhar uma letra:</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength={1}
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button className="button">JOGAR</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já utilizadas</p>
        <div>
          {wrongLetters.map((letter, index) => (
            <span key={index}>{letter}, </span>
          ))}
        </div>
      </div>
    </div>
  );
}
