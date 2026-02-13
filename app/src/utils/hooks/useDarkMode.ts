import { useState, useEffect } from "react";

const KEY = "darkMode";

function applyDark(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem(KEY) === "true";
  });

  useEffect(() => {
    applyDark(isDark);
    localStorage.setItem(KEY, String(isDark));
  }, [isDark]);

  // Applica al primo mount senza attendere interazione
  useEffect(() => {
    applyDark(isDark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isDark, toggle: () => setIsDark((p) => !p) };
}
