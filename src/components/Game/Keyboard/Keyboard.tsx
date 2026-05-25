import type { CSSProperties } from "react";
import { Delete } from "lucide-react";
import { cn } from "../../../lib/utils";
import type { KeyInfo } from "../../../data";

const BRAND_KEY_COLORS = [
  ["#36d1ff", "#2dd4bf", "rgba(45, 212, 191, 0.42)"],
  ["#8b5cf6", "#22d3ee", "rgba(139, 92, 246, 0.38)"],
  ["#facc15", "#fb923c", "rgba(250, 204, 21, 0.34)"],
  ["#34d399", "#84cc16", "rgba(52, 211, 153, 0.34)"],
  ["#f472b6", "#f97316", "rgba(244, 114, 182, 0.34)"],
  ["#60a5fa", "#6366f1", "rgba(96, 165, 250, 0.36)"],
  ["#5eead4", "#14b8a6", "rgba(94, 234, 212, 0.34)"],
  ["#fde047", "#22c55e", "rgba(253, 224, 71, 0.3)"],
  ["#fb7185", "#a855f7", "rgba(251, 113, 133, 0.34)"],
  ["#38bdf8", "#2563eb", "rgba(56, 189, 248, 0.36)"],
] as const;

const feedbackColors = {
  static: ["#64748b", "#475569", "rgba(148, 163, 184, 0.24)"],
  blue: ["#22d3ee", "#2563eb", "rgba(34, 211, 238, 0.36)"],
  yellow: ["#facc15", "#fb923c", "rgba(250, 204, 21, 0.36)"],
  gray: ["#475569", "#1f2937", "rgba(71, 85, 105, 0.24)"],
  green: ["#34d399", "#14b8a6", "rgba(52, 211, 153, 0.38)"],
};

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keysData: KeyInfo[];
}

type KeyStyle = CSSProperties & {
  "--key-start": string;
  "--key-end": string;
  "--key-glow": string;
  "--float-delay": string;
};

const getKeyStyle = (key: KeyInfo, index: number): KeyStyle => {
  const colors = key.color === "none" ? BRAND_KEY_COLORS[index % BRAND_KEY_COLORS.length] : feedbackColors[key.color];

  return {
    "--key-start": colors[0],
    "--key-end": colors[1],
    "--key-glow": colors[2],
    "--float-delay": `${(index % 10) * 90}ms`,
  };
};

const Keyboard = ({ onKeyPress, keysData }: KeyboardProps) => {
  return (
    <div className="w-full md:max-w-3xl lg:max-w-full md:mx-auto">
      <div className="keyboard-grid grid grid-cols-10 gap-1.5 sm:gap-2">
        {keysData.map((key, index) => {
          const isEnterKey = key.text === "enter";
          return (
            <button
              onClick={() => onKeyPress(key.text)}
              key={index}
              style={getKeyStyle(key, index)}
              className={cn(
                "keyboard-key h-12 sm:h-14 lg:h-16 rounded-lg outline-none overflow-hidden font-black uppercase select-none",
                "text-sm sm:text-base lg:text-lg active:translate-y-px active:brightness-125",
                isEnterKey && "col-span-3 lowercase text-base lg:text-lg"
              )}
            >
              <span className="keyboard-key-face w-full h-full flex justify-center items-center">
                {key.text === "backspace" ? <Delete strokeWidth={2} className="text-white size-5 lg:size-6" /> : key.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
