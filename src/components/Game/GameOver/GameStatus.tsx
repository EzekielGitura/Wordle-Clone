import { ExternalLink } from "lucide-react";
import { GameStatusType } from "../../../hooks/useWordle";
import { decryptWord } from "../../../helpers";

interface GameStatusProps {
  gameStatus: GameStatusType;
  word: string;
}

const GameStatus = ({ gameStatus, word }: GameStatusProps) => {
  const decryptedWord = decryptWord(word);
  return (
    <div className="w-full py-4 pb-8 flex flex-col">
      <h3 className="text-center text-xl font-semibold text-zinc-200">
        {gameStatus.isWinner ? "Victory is yours!" : "Better luck next time!"}
      </h3>
      <p className="text-center text-sm max-w-64 lg:max-w-full mx-auto text-zinc-400 mt-0 lg:mt-[2.5px]">
        {gameStatus.isWinner
          ? `Fantastic job! You nailed it in ${gameStatus.guessesUsed + 1} guesses!`
          : "Don't worry, you'll get it next time! The word was:"}
      </p>
      <div className="w-full flex flex-col gap-2">
        <a
          href={`https://en.wiktionary.org/wiki/${decryptedWord}`}
          rel="noopener noreferrer"
          target="_blank"
          className="w-min flex items-center gap-2 outline-none text-sm text-nowrap mx-auto border-2 rounded-lg border-zinc-700 uppercase font-medium tracking-wider text-blue-500 border-dashed mt-4 py-2 px-6"
        >
          {decryptedWord}
          <ExternalLink size={15} className="-mt-0.5" />
        </a>
      </div>
    </div>
  );
};

export default GameStatus;
