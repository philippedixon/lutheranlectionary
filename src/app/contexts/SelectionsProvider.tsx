import { createContext, useReducer } from "react";
import { Selections } from "@/app/interfaces";
import { selectionsReducer, SelectionsAction } from "@/app/reducers";

export type SelectionsDispatch = (action: SelectionsAction) => void;

export const SelectionsContext = createContext<Selections>({
	languageName: "",
	translationId: "",
});
export const SelectionsDispatchContext = createContext<SelectionsDispatch>(
	({}: SelectionsAction) => {}
);

export const SelectionsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [selections, dispatch] = useReducer(selectionsReducer, {
		languageName: "",
		translationId: "",
	});

	return (
		<SelectionsContext.Provider value={selections}>
			<SelectionsDispatchContext.Provider value={dispatch}>
				{children}
			</SelectionsDispatchContext.Provider>
		</SelectionsContext.Provider>
	);
};
