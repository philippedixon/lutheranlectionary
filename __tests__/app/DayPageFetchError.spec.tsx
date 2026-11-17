import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DayPage from "@/app/[month]/[day]/page";
import { SelectionsContext } from "@/app/contexts";
import { esvChapterPassages } from "../../__mocks__/esv-api";

jest.mock("next/navigation", () => ({
	usePathname: () => "/11/3",
}));

const helloaoChapters = [
	{
		book: { id: "PSA" },
		chapter: {
			number: 123,
			content: [
				{ type: "verse", number: 1, content: ["I lift up my eyes"] },
			],
		},
	},
];

const mockFetchData = jest.fn();

jest.mock("@/lib/api/ApiStrategyFactory", () => ({
	ApiStrategyFactory: jest.fn().mockImplementation(() => ({
		create: () => ({ fetchData: mockFetchData }),
	})),
}));

const dayPageWithTranslation = (translationId: string) => (
	<SelectionsContext.Provider value={{ languageName: "", translationId }}>
		<DayPage />
	</SelectionsContext.Provider>
);

const renderEsvDayPage = () => render(dayPageWithTranslation("eng_esv"));

describe("DayPage fetch error", () => {
	beforeEach(() => {
		mockFetchData.mockReset();
		jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => jest.restoreAllMocks());

	it("shows the retry state instead of 'not available' when a fetch throws", async () => {
		mockFetchData.mockRejectedValue(new Error("Network error"));

		renderEsvDayPage();

		expect(
			await screen.findByText("Couldn't load this passage.")
		).toBeInTheDocument();
		expect(
			screen.queryByText("Passage not available in this translation.")
		).not.toBeInTheDocument();
	});

	it("re-fetches on Try again and replaces the error with the reading", async () => {
		mockFetchData.mockRejectedValueOnce(new Error("Network error"));
		mockFetchData.mockRejectedValueOnce(new Error("Network error"));
		mockFetchData.mockResolvedValue(esvChapterPassages);

		const { container } = renderEsvDayPage();
		await screen.findByText("Couldn't load this passage.");
		const callsBeforeRetry = mockFetchData.mock.calls.length;

		await userEvent.click(screen.getByRole("button", { name: "Try again" }));

		await waitFor(() =>
			expect(container.querySelector(".esv-passage")).toBeInTheDocument()
		);
		expect(mockFetchData.mock.calls.length).toBeGreaterThan(callsBeforeRetry);
		expect(
			screen.queryByText("Couldn't load this passage.")
		).not.toBeInTheDocument();
	});

	it("ignores a rejection from a fetch the user has already switched away from", async () => {
		let rejectStaleFetch!: (reason: Error) => void;
		mockFetchData.mockImplementationOnce(
			() => new Promise((_, reject) => (rejectStaleFetch = reject))
		);
		mockFetchData.mockResolvedValue(helloaoChapters);

		const { rerender } = renderEsvDayPage();
		rerender(dayPageWithTranslation("BSB"));
		await waitFor(() =>
			expect(screen.getByTestId("123:1-0")).toHaveTextContent("I lift up my eyes")
		);

		await act(async () => rejectStaleFetch(new Error("Network error")));

		expect(
			screen.queryByText("Couldn't load this passage.")
		).not.toBeInTheDocument();
	});
});
