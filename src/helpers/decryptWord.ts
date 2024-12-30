import CryptoJS from "crypto-js";
import { config } from "../config/env";

export const decryptWord = (encryptedWord: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedWord, config.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Failed to decrypt word");
  }
};
