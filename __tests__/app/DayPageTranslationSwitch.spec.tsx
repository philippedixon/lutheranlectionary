import { render, screen, waitFor } from "@testing-library/react";
import DayPage from "@/app/[month]/[day]/page";
import { SelectionsContext } from "@/app/contexts";

jest.mock("next/navigation", () => ({
	usePathname: () => "/1/4",
}));

const esvPassages = ["<p>Blessed is the one</p>"];
const helloaoChapters = [
	{
		book: { id: "PSA" },
		chapter: {
			number: 32,
			content: [
				{ type: "verse", number: 1, content: ["Blessed is the one"] },
			],
		},
	},
];

jest.mock("@/lib/api/ApiStrategyFactory", () => ({
	ApiStrategyFactory: jest.fn().mockImplementation(() => ({
		create: ({ translationId }: { translationId: string }) => ({
			fetchData: jest
				.fn()
				.mockResolvedValue(
					translationId === "eng_esv" ? esvPassages : helloaoChapters
				),
		}),
	})),
}));

const dayPageWithTranslation = (translationId: string) => (
	<SelectionsContext.Provider value={{ languageName: "", translationId }}>
		<DayPage />
	</SelectionsContext.Provider>
);

describe("DayPage translation switch", () => {
	it("does not crash when switching from ESV to a HelloAO translation", async () => {
		const { rerender, container } = render(dayPageWithTranslation("eng_esv"));
		await waitFor(() =>
			expect(container.querySelector(".esv-passage")).toBeInTheDocument()
		);

		expect(() => rerender(dayPageWithTranslation("BSB"))).not.toThrow();

		await waitFor(() =>
			expect(screen.getByTestId("title")).toHaveTextContent("Psalms 32")
		);
		expect(container.querySelector(".esv-passage")).not.toBeInTheDocument();
	});
});
