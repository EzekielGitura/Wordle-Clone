import { useCallback, useEffect, useState } from "react";
import useWordle from "../../hooks/useWordle";
import Row from "./Row";
import GameOver from "./GameOver/GameOver";
import Keyboard from "./Keyboard/Keyboard";
import Hero from "./Hero";

interface GameProps {
  word: string;
  onNewGame: () => void;
}

const Game = ({ word, onNewGame }: GameProps) => {
  const { handleKeyup, board, activeCell, gameStatus, keysData } = useWordle(word);
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    if (gameStatus.isOver) {
      const timer = setTimeout(() => setShowGameOver(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus.isOver]);

  const handleKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      handleKeyup(event.key);
    },
    [handleKeyup]
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyEvent);
    return () => {
      window.removeEventListener("keyup", handleKeyEvent);
    };
  }, [handleKeyEvent]);

  return (
    <>
      {showGameOver && <GameOver word={word} isOpen={showGameOver} onClose={onNewGame} gameStatus={gameStatus} />}
      <main className="game-main w-full flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="game-stage w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(22rem,0.9fr)_minmax(30rem,1.1fr)] gap-5 lg:gap-8">
          <section className="glass-panel board-panel w-full max-w-[21rem] sm:max-w-[24rem] lg:max-w-[31rem] mx-auto grid grid-cols-1 gap-1.5 sm:gap-2">
            {board.map((row, rowIndex) => (
              <Row key={rowIndex} rowIndex={rowIndex} row={row} activeCell={activeCell} />
            ))}
          </section>
          <section className="glass-panel control-panel w-full flex flex-col">
            <Hero />
            <Keyboard onKeyPress={handleKeyup} keysData={keysData} />
          </section>
        </div>
      </main>
    </>
  );
};

export default Game;
