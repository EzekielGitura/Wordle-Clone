export const getEnvVar = (key: keyof ImportMetaEnv, fallback?: string): string => {
  const value = import.meta.env[key];
  if (value === undefined && fallback !== undefined) {
    return fallback;
  }
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const config = {
  encryptionKey: getEnvVar("VITE_ENCRYPTION_KEY", "wordle-clone-local-development-key"),
} as const;
