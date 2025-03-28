import React from "react";

interface WrongLettersProps {
  wrongLetters: string[];
}

export const WrongLetters: React.FC<WrongLettersProps> = ({ wrongLetters }) => {
  return (
    <p className="wrong-letters">
      {wrongLetters.length > 0 ? (
        wrongLetters.map((letter, index) => (
          <span key={index} className="wrong-letter">
            {letter}
          </span>
        ))
      ) : (
        ""
      )}
    </p>
  );
};
