import { useState } from "react";

export const useLocalStorage = (keyName: string, defaultValue: string = "") => {
  const [token, setTokenValue] = useState<string>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return value;
      } else {
        window.localStorage.setItem(keyName, defaultValue);
        return defaultValue;
      }
    } catch {
      return defaultValue;
    }
  });
  const setToken = (newValue: string) => {
    try {
      window.localStorage.setItem(keyName, newValue);
    } catch (err) {
      console.log(err);
    }
    setTokenValue(newValue);
  };
  return { token, setToken };
};
