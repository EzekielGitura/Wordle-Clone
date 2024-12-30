import CryptoJS from "crypto-js";
import { config } from "../config/env";

export const encryptWord = (word: string): string => {
  try {
    return CryptoJS.AES.encrypt(word, config.encryptionKey).toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt word");
  }
};
