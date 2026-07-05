"use client";

import { useContext, useEffect } from "react";
import { languages } from "@/app/constants";
import {
	SelectionsContext,
	SelectionsDispatch,
	SelectionsDispatchContext,
} from "@/app/contexts";
import { Languages } from "@/app/enums";
import { Selections, Translation } from "@/app/interfaces";

interface OptionsPanelProps {
	isOpen: boolean;
	onClose: () => void;
	translations: Translation[];
}

const setDefaultTranslationId = (
	translations: Translation[],
	selections: Selections,
	dispatch: SelectionsDispatch
): void => {
	const defaultTranslation =
		translations.find(
			(t) =>
				t.id === "eng_esv" && t.languageEnglishName === selections.languageName
		) ??
		translations.find((t) => t.languageEnglishName === selections.languageName);
	const translationId = defaultTranslation?.id ?? "";
	dispatch({ type: "SET_TRANSLATION", payload: translationId });
	localStorage.setItem("translation", translationId);
};

export const OptionsPanel: React.FC<OptionsPanelProps> = ({
	isOpen,
	onClose,
	translations,
}) => {
	const selections = useContext(SelectionsContext);
	const dispatchSelections = useContext(SelectionsDispatchContext);

	useEffect(() => {
		const storedTranslationId = localStorage.getItem("translation");
		let storedSelectedLanguage = localStorage.getItem("language");

		if (
			storedSelectedLanguage &&
			storedSelectedLanguage !== selections.languageName &&
			storedTranslationId &&
			storedTranslationId !== selections.translationId
		) {
			dispatchSelections({
				type: "SET_SELECTIONS",
				payload: {
					languageName: storedSelectedLanguage,
					translationId: storedTranslationId,
				},
			});
		} else if (!storedSelectedLanguage) {
			storedSelectedLanguage = Languages.English;
			dispatchSelections({
				type: "SET_LANGUAGE",
				payload: storedSelectedLanguage as Languages,
			});
			localStorage.setItem("language", storedSelectedLanguage);
		} else if (
			storedSelectedLanguage &&
			storedSelectedLanguage === selections.languageName &&
			!storedTranslationId &&
			translations.length
		) {
			setDefaultTranslationId(translations, selections, dispatchSelections);
		}
	}, [dispatchSelections, selections, translations]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => { document.body.style.overflow = ""; };
	}, [isOpen]);

	const handleLanguageClick = (language: Languages) => {
		localStorage.setItem("language", language);
		localStorage.setItem("translation", "");
		dispatchSelections({ type: "SET_LANGUAGE", payload: language });
	};

	const handleTranslationClick = (translationId: string) => {
		localStorage.setItem("translation", translationId);
		dispatchSelections({ type: "SET_TRANSLATION", payload: translationId });
	};

	const filteredTranslations = translations
		.filter((t) => t.languageEnglishName === selections.languageName)
		.sort((a, b) => (a.name < b.name ? -1 : 1));

	return (
		<div
			className={`fixed inset-0 z-40 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
		>
			<div
				data-testid="options-scrim"
				className={`absolute inset-0 bg-[rgba(20,15,8,0.35)] transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
				onClick={onClose}
			/>
			<aside
				data-testid="options-panel"
				className={`absolute right-0 top-0 h-full w-[320px] max-w-[88vw] overflow-y-auto bg-card border-l border-border shadow-[-8px_0_24px_rgba(20,15,8,0.18)] transition-transform duration-[280ms] ease-[cubic-bezier(.16,.9,.35,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				<div className="flex items-center justify-between p-6 pb-4">
					<h2 className="font-cormorant font-semibold text-[24px] text-primary">
						Reading Options
					</h2>
					<button
						aria-label="Close options"
						onClick={onClose}
						className="text-gold"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={18}
							height={18}
							fill="none"
							stroke="currentColor"
							strokeWidth={1.6}
							strokeLinecap="round"
						>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>

				<div className="px-6 pb-4">
					<p className="font-cormorant font-semibold text-[15px] uppercase tracking-[0.5px] text-gold mb-2">
						LANGUAGE
					</p>
					<div className="flex flex-col gap-1">
						{languages.map((language) => (
							<button
								key={language}
								aria-pressed={selections.languageName === language}
								onClick={() => handleLanguageClick(language)}
								className={`text-left px-[14px] py-[10px] rounded-sm border font-eb-garamond text-[17px] ${
									selections.languageName === language
										? "border-primary text-primary font-semibold"
										: "border-border"
								}`}
							>
								{language}
							</button>
						))}
					</div>
				</div>

				<div className="px-6">
					<p className="font-cormorant font-semibold text-[15px] uppercase tracking-[0.5px] text-gold mb-2">
						TRANSLATION
					</p>
					<div className="flex flex-col gap-1">
						{filteredTranslations.map((translation) => (
							<button
								key={translation.id}
								data-testid={`translation-row-${translation.id}`}
								aria-pressed={selections.translationId === translation.id}
								onClick={() => handleTranslationClick(translation.id)}
								className={`text-left px-[14px] py-[10px] rounded-sm border font-eb-garamond text-[17px] ${
									selections.translationId === translation.id
										? "border-primary text-primary font-semibold"
										: "border-border"
								}`}
							>
								{translation.name}
							</button>
						))}
					</div>
				</div>
			</aside>
		</div>
	);
};
