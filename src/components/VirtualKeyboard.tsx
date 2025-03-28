interface VirtualKeyboardProps {
    onLetterClick: (letter: string) => void;
    guessedLetters: string[];
    wrongLetters: string[];
  }
  
  export const VirtualKeyboard = ({
    onLetterClick,
    guessedLetters,
    wrongLetters,
  }: VirtualKeyboardProps) => {
    const rows = [
      "abcdefghij".split(""),
      "klmnopqrs".split(""),
      "tuvwxyz".split(""),
    ];
  
    const isLetterDisabled = (letter: string) => {
      return guessedLetters.includes(letter) || wrongLetters.includes(letter);
    };
  
    return (
      <div className="keyboard">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((letter) => (
              <button
                key={letter}
                onClick={() => onLetterClick(letter)}
                disabled={isLetterDisabled(letter)}
                className="letter-button"
                style={{
                  cursor: isLetterDisabled(letter) ? "not-allowed" : "pointer",
                  backgroundColor: isLetterDisabled(letter) ? "#888" : "white"
                }}
              >
                {letter.toUpperCase()}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };
  