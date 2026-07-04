"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/contexts";

export const DarkModeToggle = () => {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<button
			onClick={toggleTheme}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
		>
			{isDark ? <Sun size={20} /> : <Moon size={20} />}
		</button>
	);
};
