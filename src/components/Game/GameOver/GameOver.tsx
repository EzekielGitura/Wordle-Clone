import Confetti from "react-confetti";
import { GameStatusType } from "../../../hooks/useWordle";
import ModalHeadless from "../../ui/ModalHeadless";
import useWindowSize from "../../../hooks/useWindowSize";
import GameStatus from "./GameStatus";
import Separator from "./Separator";
import History from "./History";
import Button from "../../ui/Button";

interface GameOverProps {
  isOpen: boolean;
  onClose: () => void;
  gameStatus: GameStatusType;
  word: string;
}

const GameOver = ({ isOpen, onClose, gameStatus, word }: GameOverProps) => {
  const { width, height } = useWindowSize();

  return (
    <ModalHeadless isOpen={isOpen} onOverlayClick={onClose} className="max-w-lg">
      {gameStatus.isWinner && <Confetti width={width} height={height} recycle={true} numberOfPieces={150} gravity={0.05} wind={0.01} />}
      <div className="w-full flex flex-col px-4 py-8 pb-6">
        <GameStatus gameStatus={gameStatus} word={word} />
        <Separator title="History" />
        <div className="w-full py-4">
          <History />
        </div>
        <Button variant="primary" size="regular" className="w-full" onClick={onClose}>
          {gameStatus.isWinner ? "Play Again" : "Try Again"}
        </Button>
      </div>
    </ModalHeadless>
  );
};

export default GameOver;
