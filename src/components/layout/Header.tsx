import { BookOpen, RotateCw } from "lucide-react";
import Button from "../ui/Button";

interface HeaderProps {
  onNewGame: () => void;
}

const Header = ({ onNewGame }: HeaderProps) => {
  return (
    <header className="game-header px-4 py-3 sm:px-6 flex justify-between items-center">
      <a
        href="https://www.notion.so/How-to-Play-the-Wordle-Game-20d58b7c3b2480269a5dfbdc4d8167ba?source=copy_link"
        target="_blank"
        rel="noreferrer"
        className="glass-link text-sm font-medium text-cyan-100 transition hover:text-white"
      >
        <BookOpen size={17} />
        Guide
      </a>
      <div className="flex items-center gap-2">
        <Button onClick={onNewGame} className="brand-action">
          <RotateCw size={16} />
          New Game
        </Button>
      </div>
    </header>
  );
};

export default Header;
