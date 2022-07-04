import { useEffect, useState } from "react";

import { StartGame } from "./components/StartGame";
import { Game } from "./components/Game";
import { GameOver } from "./components/GameOver";

import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQt = 5;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [theme, setTheme] = useState(false);

  const [letters, setLetters] = useState([]);
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQt);

  const [score, setScore] = useState(0);

  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);

  const [orderedHighScores, setOrderedHighScores] = useState([]);

  const [words] = useState(wordsList);

  const secretBody = document.getElementsByTagName("body")[0];

  useEffect(() => {
    const savedTheme = localStorage.getItem("secretWordTheme");

    if (savedTheme === "dark") {
      setTheme(true);
      secretBody.classList.add("dark");
    } else {
      setTheme(false);
      secretBody.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const localHighScores = localStorage.getItem("localHighScores");
    const convertedLocalHighScores = JSON.parse(localHighScores);

    if (convertedLocalHighScores) {
      getOrderedHighScores(convertedLocalHighScores);
      // setHighScores(convertedLocalHighScores);
    } else {
      return;
    }
  }, [isLose]);

  function getOrderedHighScores(order) {
    const newOrderHighScores = order.sort((a, b) => b.score - a.score);

    const best5Scores = newOrderHighScores.filter(
      (player, index) => index < 5 && player
    );

    setOrderedHighScores(best5Scores);
  }

  function saveLocalHighScores(name) {
    const newHighScore = { name, score };

    if (orderedHighScores.length > 0) {
      setOrderedHighScores((actualOrderedHighScores) => [
        ...actualOrderedHighScores,
        { name, score },
      ]);
      localStorage.setItem(
        "localHighScores",
        JSON.stringify([...orderedHighScores, newHighScore])
      );
    } else {
      setOrderedHighScores([newHighScore]);
      localStorage.setItem("localHighScores", JSON.stringify([newHighScore]));
    }

    restartGame();
    setIsLose(true);
  }

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    const uniqueGuessedLetters = [...new Set(guessedLetters)];

    if (
      uniqueLetters.length === uniqueGuessedLetters.length &&
      uniqueLetters.length !== 0
    ) {
      setScore((actualScore) => (actualScore += 100));
      setIsWin(true);
    }
  }, [guessedLetters, letters]);

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterAndGuessesStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  function changeTheme() {
    setTheme(!theme);

    if (theme) {
      localStorage.setItem("secretWordTheme", "light");
      secretBody.classList.remove("dark");
    } else {
      localStorage.setItem("secretWordTheme", "dark");
      secretBody.classList.add("dark");
    }
  }

  function pickedWordAndCategory() {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);
    return { word, category };
  }

  function startGame() {
    setIsLose(false);
    const { word, category } = pickedWordAndCategory();

    let wordLettersNormalized = word.toUpperCase();
    let wordLetters = wordLettersNormalized.split("");

    setLetters(wordLetters);
    setCategory(category);
    setWord(word);

    setGameStage(stages[1].name);
  }

  function verifyLetter(letter) {
    const letterA = ["A", "Á", "À", "Â", "Ã"];
    const letterE = ["E", "É", "Ê"];
    const letterI = ["I", "Í"];
    const letterO = ["O", "Ô", "Õ"];
    const letterU = ["U", "Ú"];
    const letterC = ["C", "Ç"];

    let newLetter = new Array();
    let newLetters = new Array();

    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
      return;
    }

    switch (letter) {
      case "A":
        newLetters = letters.map(
          (letterOnLetters) =>
            letterOnLetters &&
            letterA.find(
              (letterOnLatter) =>
                letterOnLatter && letterOnLetters === letterOnLatter
            )
        );

        newLetter = newLetters.filter(
          (letterOnNewLetters) => letterOnNewLetters !== undefined
        );

        if (newLetter.length === 0) {
          setWrongLetters((actualWrongLetters) => [
            ...actualWrongLetters,
            letter,
          ]);

          setGuesses((actualGuesses) => actualGuesses - 1);

          return;
        }

        if (newLetter.length > 0) {
          newLetter.map((letterOnNewLetter) =>
            setGuessedLetters((actualGuessedLetters) => [
              ...actualGuessedLetters,
              letterOnNewLetter,
            ])
          );
        } else {
          newLetter.map((letterOnNewLetter) =>
            setWrongLetters((actualWrongLetters) => [
              ...actualWrongLetters,
              letterOnNewLetter,
            ])
          );

          setGuesses((actualGuesses) => actualGuesses - 1);
        }
        break;

      case "E":
        newLetters = letters.map(
          (letterOnLetters) =>
            letterOnLetters &&
            letterE.find(
              (letterOnLatter) =>
                letterOnLatter && letterOnLetters === letterOnLatter
            )
        );

        newLetter = newLetters.filter(
          (letterOnNewLetters) => letterOnNewLetters !== undefined
        );

        if (newLetter.length === 0) {
          setWrongLetters((actualWrongLetters) => [
            ...actualWrongLetters,
            letter,
          ]);

          setGuesses((actualGuesses) => actualGuesses - 1);

          return;
        }

        if (newLetter.length > 0) {
          newLetter.map((letterOnNewLetter) =>
            setGuessedLetters((actualGuessedLetters) => [
              ...actualGuessedLetters,
              letterOnNewLetter,
            ])
          );
        } else {
          newLetter.map((letterOnNewLetter) =>
            setWrongLetters((actualWrongLetters) => [
              ...actualWrongLetters,
              letterOnNewLetter,
            ])
          );

          setGuesses((actualGuesses) => actualGuesses - 1);
        }
        break;

      case "I":
        newLetters = letters.map(
          (letterOnLetters) =>
            letterOnLetters &&
            letterI.find(
              (letterOnLatter) =>
                letterOnLatter && letterOnLetters === letterOnLatter
            )
        );

        newLetter = newLetters.filter(
          (letterOnNewLetters) => letterOnNewLetters !== undefined
        );

        if (newLetter.length === 0) {
          setWrongLetters((actualWrongLetters) => [
            ...actualWrongLetters,
            letter,
          ]);

          setGuesses((actualGuesses) => actualGuesses - 1);

          return;
        }

        if (newLetter.length > 0) {
          newLetter.map((letterOnNewLetter) =>
            setGuessedLetters((actualGuessedLetters) => [
              ...actualGuessedLetters,
              letterOnNewLetter,
            ])
          );
        } else {
          newLetter.map((letterOnNewLetter) =>
            setWrongLetters((actualWrongLetters) => [
              ...actualWrongLetters,
              letterOnNewLetter,
            ])
          );

          setGuesses((actualGuesses) => actualGuesses - 1);
        }
        break;

      case "O":
        newLetters = letters.map(
          (letterOnLetters) =>
            letterOnLetters &&
            letterO.find(
              (letterOnLatter) =>
                letterOnLatter && letterOnLetters === letterOnLatter
            )
        );

        newLetter = newLetters.filter(
          (letterOnNewLetters) => letterOnNewLetters !== undefined
        );

        if (newLetter.length === 0) {
          setWrongLetters((actualWrongLetters) => [
            ...actualWrongLetters,
            letter,
          ]);

          setGuesses((actualGuesses) => actualGuesses - 1);

          return;
        }

        if (newLetter.length > 0) {
          newLetter.map((letterOnNewLetter) =>
            setGuessedLetters((actualGuessedLetters) => [
              ...actualGuessedLetters,
              letterOnNewLetter,
            ])
          );
        } else {
          newLetter.map((letterOnNewLetter) =>
            setWrongLetters((actualWrongLetters) => [
              ...actualWrongLetters,
              letterOnNewLetter,
            ])
          );

          setGuesses((actualGuesses) => actualGuesses - 1);
        }
        break;

      case "U":
        newLetters = letters.map(
          (letterOnLetters) =>
            letterOnLetters &&
            letterU.find(
              (letterOnLatter) =>
                letterOnLatter && letterOnLetters === letterOnLatter
            )
        );

        newLetter = newLetters.filter(
          (letterOnNewLetters) => letterOnNewLetters !== undefined
        );

        if (newLetter.length === 0) {
          setWrongLetters((actualWrongLetters) => [
            ...actualWrongLetters,
            letter,
          ]);

          setGuesses((actualGuesses) => actualGuesses - 1);

          return;
        }

        if (newLetter.length > 0) {
          newLetter.map((letterOnNewLetter) =>
            setGuessedLetters((actualGuessedLetters) => [
              ...actualGuessedLetters,
              letterOnNewLetter,
            ])
          );
        } else {
          newLetter.map((letterOnNewLetter) =>
            setWrongLetters((actualWrongLetters) => [
              ...actualWrongLetters,
              letterOnNewLetter,
            ])
          );

          setGuesses((actualGuesses) => actualGuesses - 1);
        }
        break;

      case "C":
        newLetters = letters.map(
          (letterOnLetters) =>
            letterOnLetters &&
            letterC.find(
              (letterOnLatter) =>
                letterOnLatter && letterOnLetters === letterOnLatter
            )
        );

        newLetter = newLetters.filter(
          (letterOnNewLetters) => letterOnNewLetters !== undefined
        );

        if (newLetter.length === 0) {
          setWrongLetters((actualWrongLetters) => [
            ...actualWrongLetters,
            letter,
          ]);

          setGuesses((actualGuesses) => actualGuesses - 1);

          return;
        }

        if (newLetter.length > 0) {
          newLetter.map((letterOnNewLetter) =>
            setGuessedLetters((actualGuessedLetters) => [
              ...actualGuessedLetters,
              letterOnNewLetter,
            ])
          );
        } else {
          newLetter.map((letterOnNewLetter) =>
            setWrongLetters((actualWrongLetters) => [
              ...actualWrongLetters,
              letterOnNewLetter,
            ])
          );

          setGuesses((actualGuesses) => actualGuesses - 1);
        }
        break;

      default:
        if (letters.includes(letter)) {
          setGuessedLetters((actualGuessedLetters) => [
            ...actualGuessedLetters,
            letter,
          ]);
        } else {
          setWrongLetters((actualWrongLetters) => [
            ...actualWrongLetters,
            letter,
          ]);

          setGuesses((actualGuesses) => actualGuesses - 1);
        }
        break;
    }
  }

  function clearLetterAndGuessesStates() {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  function restartGame() {
    setGuesses(guessesQt);
    setScore(0);
    clearLetterAndGuessesStates();
    setGameStage(stages[0].name);
  }

  return (
    <div className="container">
      <button className="toggle-theme" onClick={changeTheme}>
        {theme ? <i className="ri-sun-line" /> : <i className="ri-moon-line" />}
      </button>
      {gameStage === "start" && (
        <StartGame
          startGame={startGame}
          orderedHighScores={orderedHighScores}
        />
      )}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          letters={letters}
          category={category}
          word={word}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          isWin={isWin}
          startGame={startGame}
          clearLetterAndGuessesStates={clearLetterAndGuessesStates}
          setIsWin={setIsWin}
        />
      )}
      {gameStage === "end" && (
        <GameOver
          restartGame={restartGame}
          score={score}
          saveLocalHighScores={saveLocalHighScores}
          orderedHighScores={orderedHighScores}
          clearLetterAndGuessesStates={clearLetterAndGuessesStates}
        />
      )}
    </div>
  );
}

export default App;
