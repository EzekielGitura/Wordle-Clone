import { Coffee } from "lucide-react";
import Button from "../ui/Button";

interface HeaderProps {
  onNewGame: () => void;
}

const Header = ({ onNewGame }: HeaderProps) => {
  return (
    <header className="py-3 px-6 flex justify-between items-center border-b border-zinc-800">
      <a
        href="https://azlanibrahim.notion.site/How-to-Play-Wordle-16b4c3b4e0a1800d923bc2f769855e66"
        target="_blank"
        rel="noreferrer"
        className="text-sm text-sky-400 transition hover:underline"
      >
        Guide -&gt;
      </a>
      <div className="flex items-center gap-2">
        <a
          title="Buy me a coffee"
          href="https://buymeacoffee.com/azlibdar"
          target="_blank"
          rel="noreferrer"
          className="p-2 aspect-square flex justify-center items-center no-underline rounded-md text-amber-400 bg-zinc-700"
        >
          <Coffee size={20} />
        </a>
        <Button onClick={onNewGame}>New Game</Button>
      </div>
    </header>
  );
};

export default Header;
