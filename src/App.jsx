// react
import { useCallback, useEffect, useState } from "react";

// components
import { StartScreen } from "./components/StartScreen";
import { Game } from "./components/Game";
import { GameOver } from "./components/GameOver";

// data
import { wordsList } from "./data/wordsList";

// css
import "./App.css";

// creating stages for game progression
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

export function App() {
  // control the game stage
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  // choosing a category, word, and exploding the word into letters
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  //
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickedWordAndCategory = () => {
    // pick a random category (-passing the object key as category)
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    // pick a random word utility category
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);

    return { word, category };
  };

  // starts the secret word game
  const startGame = () => {
    // pick word and pick category
    const { word, category } = pickedWordAndCategory();

    // create an array of letter
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // fill state
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    // to change the state of the gameStage to stage start
    setGameStage(stages[1].name);
  };

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      // reset all stages
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // restart the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}
