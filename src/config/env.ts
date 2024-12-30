export const getEnvVar = (key: keyof ImportMetaEnv): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const config = {
  encryptionKey: getEnvVar("VITE_ENCRYPTION_KEY"),
} as const;
