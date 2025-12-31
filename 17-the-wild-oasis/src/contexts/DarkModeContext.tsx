import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface DarkModeContextValue {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const DarkModeConext = createContext<DarkModeContextValue | null>(null);

function DarkModeProvider({ children }: { children: ReactNode }) {
  // the only ground truth in the app -> everything else changes based on this value
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    false,
    "dark-mode"
  );

  function handleToggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  // it is the scape hatch and you only have single ground that everything changes based on it
  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );
  return (
    <DarkModeConext
      value={{ isDarkMode, onToggleDarkMode: handleToggleDarkMode }}
    >
      {children}
    </DarkModeConext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDarkMode() {
  const context = useContext(DarkModeConext);
  if (!context)
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  return context;
}

export default DarkModeProvider;
