"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
	theme: "light",
	toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const listeners = new Set<() => void>();

const readTheme = (): Theme => {
	const stored = localStorage.getItem("theme") as Theme | null;
	return stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
};

const themeStore = {
	subscribe(listener: () => void) {
		listeners.add(listener);
		return () => listeners.delete(listener);
	},
	getSnapshot: readTheme,
	getServerSnapshot(): Theme {
		return "light";
	},
	set(next: Theme) {
		localStorage.setItem("theme", next);
		listeners.forEach((listener) => listener());
	},
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const theme = useSyncExternalStore(
		themeStore.subscribe,
		themeStore.getSnapshot,
		themeStore.getServerSnapshot,
	);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	const toggleTheme = () => themeStore.set(theme === "light" ? "dark" : "light");

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
