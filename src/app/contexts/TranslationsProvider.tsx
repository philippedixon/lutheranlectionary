import { createContext, useReducer } from "react";
import { Translation } from "@/app/interfaces";
import { TranslationsAction, translationsReducer } from "@/app/reducers";

export const TranslationsContext = createContext<Translation[]>([]);
export const TranslationsDispatchContext = createContext<
	(action: TranslationsAction) => void
>(({}: TranslationsAction) => {});

export const TranslationsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [translations, dispatch] = useReducer(translationsReducer, []);

	return (
		<TranslationsContext.Provider value={translations}>
			<TranslationsDispatchContext.Provider value={dispatch}>
				{children}
			</TranslationsDispatchContext.Provider>
		</TranslationsContext.Provider>
	);
};
