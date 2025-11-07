"use client";

import { createContext } from "react";
import { Translation } from "@/app/interfaces";
import { TranslationsAction } from "@/app/reducers";

export const TranslationsContext = createContext<Translation[]>([]);
export const TranslationsDispatchContext = createContext<
	(action: TranslationsAction) => void
>(({}: TranslationsAction) => {});

export const TranslationsProvider = ({
	children,
	translations = [],
}: {
	children: React.ReactNode;
	translations?: Translation[];
}) => {
	return (
		<TranslationsContext.Provider value={translations}>
			{children}
		</TranslationsContext.Provider>
	);
};
