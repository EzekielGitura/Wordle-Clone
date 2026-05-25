import { LetterGuess } from "../../hooks/useWordle";
import { cn } from "../../lib/utils";

interface RowProps {
  row: LetterGuess[];
  rowIndex: number;
  activeCell: [number, number];
}

const CELL_BASE_STYLES = [
  "word-cell w-full text-white select-none",
  "font-black rounded-lg flex justify-center shadow-sm",
  "items-center text-2xl sm:text-3xl lg:text-4xl uppercase aspect-square",
  "ring-1 ring-inset ring-white/15",
];

const COLOR_VARIANTS = {
  gray: "bg-slate-700/90 ring-0 shadow-[0_14px_30px_rgba(15,23,42,0.4)]",
  green: "bg-gradient-to-br from-emerald-300 to-teal-500 text-slate-950 ring-0 shadow-[0_14px_34px_rgba(45,212,191,0.36)]",
  yellow: "bg-gradient-to-br from-amber-200 to-orange-400 text-slate-950 ring-0 shadow-[0_14px_34px_rgba(251,191,36,0.34)]",
  none: "bg-white/[0.055]",
} as const;

const Row: React.FC<RowProps> = ({ row, rowIndex, activeCell }) => {
  return (
    <div className="w-full grid grid-cols-5 gap-1.5 lg:gap-2">
      {row.map((cell, cellIndex) => (
        <div
          key={`${rowIndex}-${cellIndex}`}
          className={cn(
            ...CELL_BASE_STYLES,
            cell.color && COLOR_VARIANTS[cell.color],
            activeCell[0] === rowIndex && activeCell[1] === cellIndex && "ring-2 ring-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.34)]",
            cell.input && "animate-cell"
          )}
        >
          {cell.input}
        </div>
      ))}
    </div>
  );
};

export default Row;
