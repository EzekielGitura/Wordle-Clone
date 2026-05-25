import type { RowGuess } from "../hooks/useWordle";

type LetterColor = "gray" | "green" | "yellow" | "none";

export const handleFormatGuess = (word: string, currentGuess: string): RowGuess => {
  const remainingLetters = [...word];
  const userWordArray = [...currentGuess].map((letter) => ({
    input: letter,
    color: "gray" as LetterColor,
  }));

  userWordArray.forEach((obj, i) => {
    if (remainingLetters[i] === obj.input) {
      obj.color = "green";
      remainingLetters[i] = "";
    }
  });

  userWordArray.forEach((obj) => {
    const letterIndex = remainingLetters.indexOf(obj.input);
    if (letterIndex !== -1 && obj.color !== "green") {
      obj.color = "yellow";
      remainingLetters[letterIndex] = "";
    }
  });

  return userWordArray;
};
