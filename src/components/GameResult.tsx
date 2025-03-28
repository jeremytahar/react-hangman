import React from "react";

interface GameResultProps {
    gameStatus: string | null;
    word: string | null;
    handleRestart: () => void;
}

export const GameResult: React.FC<GameResultProps> = ({ gameStatus, word, handleRestart }) => {
    const gameResult = document.querySelector('.game-result');

    if(gameStatus === null) {

        if(gameResult) {
            gameResult.classList.add('hidden');
        }
    } else if(gameStatus === 'lose' || gameStatus === 'win') {

        if(gameResult) {
            gameResult.classList.remove('hidden');
        }
    }

    return (
        <div className="game-result">
            {gameStatus && (
            <div className={`${gameStatus}-message`}>
                <h2 className={`${gameStatus}-title`}>
                {gameStatus === "win" ? "Bravo, vous avez gagné !" : "Perdu !"}
                </h2>
                <p className="lang-word-was">Le mot était : {word ? word.toUpperCase() : ""}</p>
                <button className="restart-button lang-restart-btn" onClick={handleRestart}>Rejouer</button>
            </div>
            )}
        </div>
    );
}