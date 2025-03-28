import { useEffect, useState, useCallback } from "react";
import { fetchData } from "../api.tsx";
import { HangmanSVG } from "../components/HangmanSVG.tsx";
import { VirtualKeyboard } from "./VirtualKeyboard";
import { WrongLetters } from ".//WrongLetters.tsx";
import { GameResult } from "./GameResult.tsx";


export const Word = () => {
  const [word, setWord] = useState<string | null>(null);
  const [normalizedWord, setNormalizedWord] = useState<string | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchData().then((data) => {
      if (data) {
        let formattedWord = data.word.toLowerCase().replace(/-/g, " ");
        let normalized = formattedWord.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
        setWord(formattedWord);
        setNormalizedWord(normalized);
        setGameStatus(null);
      }
    });
  }, []);

  const handleLetterClick = (letter: string) => {
    if (gameStatus || !normalizedWord) return; 

    if (normalizedWord.includes(letter)) {
      if (!guessedLetters.includes(letter)) {
        setGuessedLetters((prev) => [...prev, letter]);
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters((prev) => [...prev, letter]);
      }
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const letter = event.key.toLowerCase();
      if (/^[a-z]$/.test(letter) && normalizedWord) {
        handleLetterClick(letter);
      }
    },
    [normalizedWord, guessedLetters, wrongLetters]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (normalizedWord) {
      const wordArray = normalizedWord.split("");
      const allGuessed = wordArray.every(
        (letter) => letter === " " || guessedLetters.includes(letter)
      );
      if (allGuessed) {
        setGameStatus("win");
      }
    }
  }, [guessedLetters, normalizedWord]);

  useEffect(() => {
    if (wrongLetters.length > 10) {
      setGameStatus("lose");
    }
  }, [wrongLetters]);

  const handleRestart = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
    setGameStatus(null);
    fetchData().then((data) => {
      if (data) {
        let formattedWord = data.word.toLowerCase().replace(/-/g, " ");
        let normalized = formattedWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        setWord(formattedWord);
        setNormalizedWord(normalized);
      }
    });
  };

  return (
    <div>
      <HangmanSVG errors={wrongLetters.length} />

      <p className="word">
        {word
          ? word.split("").map((letter, index) =>
              letter === " " ? (
                <span key={index} style={{ marginRight: "20px" }}> </span>
              ) : guessedLetters.includes(normalizedWord?.[index] ?? "") ? (
                <span key={index} style={{ marginRight: "5px", fontSize: "64px" }}>
                  {letter}
                </span>
              ) : (
                <span key={index} style={{ marginRight: "5px", fontSize: "64px" }}>
                  _
                </span>
              )
            )
          : "Chargement..."}
      </p>

      <WrongLetters wrongLetters={wrongLetters} />

      <GameResult gameStatus={gameStatus} word={word} handleRestart={handleRestart} />

      <VirtualKeyboard 
        onLetterClick={handleLetterClick}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
      />
    </div>
  );
};
