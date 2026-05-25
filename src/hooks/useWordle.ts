import { useCallback, useEffect, useMemo, useState } from "react";
import { decryptWord, handleFormatGuess } from "../helpers";
import { HistoryState } from "../components/Game/GameOver/History";
import { KeyInfo, keys, words } from "../data";
import { toast } from "react-toastify";

export interface LetterGuess {
  input: string;
  color: "gray" | "green" | "yellow" | "none";
}

export type RowGuess = LetterGuess[];

export interface GameStatusType {
  isOver: boolean;
  isWinner: boolean;
  guessesUsed: number;
}

const TOTAL_GUESSES = 6;
const WORD_LENGTH = 5;

const KEY_COLOR_PRIORITY: Record<LetterGuess["color"], number> = {
  none: 0,
  gray: 1,
  yellow: 2,
  green: 3,
};

const createEmptyBoard = (): Array<RowGuess> =>
  Array.from({ length: TOTAL_GUESSES }, () => Array.from({ length: WORD_LENGTH }, () => ({ input: "", color: "none" })));

const createKeyboard = (): KeyInfo[] => keys.map((key) => ({ ...key }));

const useWordle = (word: string) => {
  const validWords = useMemo(() => new Set(words), []);
  const decryptedWord = useMemo(() => decryptWord(word), [word]);
  const [board, setBoard] = useState<Array<RowGuess>>(createEmptyBoard);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessHistory, setGuessHistory] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [activeCell, setActiveCell] = useState<[number, number]>([0, 0]);
  const [keysData, setKeysData] = useState<KeyInfo[]>(createKeyboard);
  const [gameStatus, setGameStatus] = useState<GameStatusType>({
    isOver: false,
    isWinner: false,
    guessesUsed: 0,
  });

  // Save to local storage
  useEffect(() => {
    const history = localStorage.getItem("history");
    if (!gameStatus.isOver) return;

    if (history) {
      const parsedHistory: HistoryState = JSON.parse(history);
      const updatedHistory = {
        ...parsedHistory,
        totalGamesPlayed: parsedHistory.totalGamesPlayed + 1,
        totalGamesWon: gameStatus.isWinner ? parsedHistory.totalGamesWon + 1 : parsedHistory.totalGamesWon,
        totalGamesLost: !gameStatus.isWinner ? parsedHistory.totalGamesLost + 1 : parsedHistory.totalGamesLost,
      };

      localStorage.setItem("history", JSON.stringify(updatedHistory));
    } else {
      const initialHistory: HistoryState = {
        totalGamesPlayed: 1,
        totalGamesWon: gameStatus.isWinner ? 1 : 0,
        totalGamesLost: !gameStatus.isWinner ? 1 : 0,
      };

      localStorage.setItem("history", JSON.stringify(initialHistory));
    }
  }, [gameStatus.isOver, gameStatus.isWinner]);

  const updateKeyboardColors = useCallback((guessRow: RowGuess) => {
    const bestColorsByLetter = new Map<string, LetterGuess["color"]>();

    guessRow.forEach(({ input, color }) => {
      const currentColor = bestColorsByLetter.get(input) ?? "none";
      if (KEY_COLOR_PRIORITY[color] > KEY_COLOR_PRIORITY[currentColor]) {
        bestColorsByLetter.set(input, color);
      }
    });

    setKeysData((prevKeys) =>
      prevKeys.map((key) => {
        const nextColor = bestColorsByLetter.get(key.text);
        if (!nextColor || key.color === "static" || key.color === "blue") {
          return key;
        }

        const currentColor = key.color === "none" ? "none" : key.color;
        return KEY_COLOR_PRIORITY[nextColor] > KEY_COLOR_PRIORITY[currentColor] ? { ...key, color: nextColor } : key;
      })
    );
  }, []);

  const handleGuess = useCallback((guessRow: RowGuess) => {
    const didWin = currentGuess === decryptedWord;
    const didUseLastGuess = currentTurn === TOTAL_GUESSES - 1;

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[currentTurn] = guessRow;
      return newBoard;
    });
    setGuessHistory((history) => [...history, currentGuess]);
    setCurrentGuess("");

    if (didWin || didUseLastGuess) {
      setGameStatus({ isOver: true, isWinner: didWin, guessesUsed: currentTurn + 1 });
      setActiveCell([currentTurn, WORD_LENGTH]);
      return;
    }

    setActiveCell([currentTurn + 1, 0]);
    setCurrentTurn((p) => p + 1);
  }, [currentGuess, currentTurn, decryptedWord]);

  const handleKeyup = useCallback((e: string): void => {
    if (gameStatus.isOver || currentTurn >= TOTAL_GUESSES) return;

    const userInput = e.toLowerCase();

    if (userInput === "enter") {
      if (currentGuess.length !== WORD_LENGTH) {
        toast("Please complete a word before submitting");
        return;
      }
      if (guessHistory.includes(currentGuess)) {
        toast("You already guessed that word");
        return;
      }
      if (!validWords.has(currentGuess)) {
        toast("That word is not in the word list");
        return;
      }

      const formattedGuess = handleFormatGuess(decryptedWord, currentGuess);

      updateKeyboardColors(formattedGuess);
      setActiveCell([currentTurn, currentGuess.length]);
      handleGuess(formattedGuess);
      return;
    }

    if (userInput === "backspace") {
      if (currentGuess.length === 0) return;
      const previousCellIndex = currentGuess.length - 1;

      setCurrentGuess((prev) => prev.slice(0, -1));
      setBoard((prevBoard) => {
        return prevBoard.map((row, rowIndex) =>
          rowIndex === currentTurn
            ? row.map((cell, cellIndex) => (cellIndex === previousCellIndex ? { ...cell, input: "" } : cell))
            : row
        );
      });
      setActiveCell([currentTurn, previousCellIndex]);
      return;
    }

    if (/^[a-z]$/.test(userInput)) {
      if (currentGuess.length < WORD_LENGTH) {
        const nextCellIndex = currentGuess.length;

        setCurrentGuess((prev) => prev + userInput);
        setBoard((prevBoard) => {
          return prevBoard.map((row, rowIndex) =>
            rowIndex === currentTurn
              ? row.map((cell, cellIndex) => (cellIndex === nextCellIndex ? { ...cell, input: userInput } : cell))
              : row
          );
        });
        setActiveCell([currentTurn, nextCellIndex + 1]);
      }
    }
  }, [currentGuess, currentTurn, decryptedWord, gameStatus.isOver, guessHistory, handleGuess, updateKeyboardColors, validWords]);

  return { board, handleKeyup, keysData, gameStatus, activeCell };
};

export default useWordle;
