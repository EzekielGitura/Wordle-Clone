import { RowGuess } from "../hooks/useWordle";

type LetterColor = "gray" | "green" | "yellow" | "none";

export const handleFormatGuess = (word: string, currentGuess: string): RowGuess => {
  const targetWordArray = [...word];
  const userWordArray = [...currentGuess].map((letter) => ({
    input: letter,
    color: "gray" as LetterColor,
  }));

  userWordArray.forEach((obj, i) => {
    if (targetWordArray[i] === obj.input) {
      obj.color = "green";
      targetWordArray[i] = "";
    }
  });

  userWordArray.forEach((obj) => {
    if (targetWordArray.includes(obj.input) && obj.color !== "green") {
      obj.color = "yellow";
    }
  });

  return userWordArray;
};
