import { act, render, screen } from "@testing-library/react";
import DayPage from "@/app/[month]/[day]/page";
import { SelectionsContext } from "@/app/contexts";

jest.mock("next/navigation", () => ({
	usePathname: () => "/1/4",
}));

type Deferred = {
	promise: Promise<unknown>;
	resolve: (value: unknown) => void;
};

const deferred = (): Deferred => {
	let resolve!: (value: unknown) => void;
	const promise = new Promise<unknown>((r) => (resolve = r));
	return { promise, resolve };
};

// One pending fetch per translation so the test controls resolution order.
const pendingFetches: Record<string, Deferred> = {};

jest.mock("@/lib/api/ApiStrategyFactory", () => ({
	ApiStrategyFactory: jest.fn().mockImplementation(() => ({
		create: ({ translationId }: { translationId: string }) => ({
			fetchData: () => {
				pendingFetches[translationId] ??= deferred();
				return pendingFetches[translationId].promise;
			},
		}),
	})),
}));

const chaptersWithVerse = (text: string) => [
	{
		book: { id: "PSA" },
		chapter: { number: 32, content: [{ type: "verse", number: 1, content: [text] }] },
	},
];

const dayPageWithTranslation = (translationId: string) => (
	<SelectionsContext.Provider value={{ languageName: "", translationId }}>
		<DayPage />
	</SelectionsContext.Provider>
);

describe("DayPage stale fetch", () => {
	it("ignores a stale fetch that resolves after a newer one", async () => {
		// KJV fetch starts and stays pending
		const { rerender } = render(dayPageWithTranslation("eng_kjv"));

		// Switch to BSB before KJV resolves
		rerender(dayPageWithTranslation("BSB"));

		// The newer fetch resolves first and its content renders
		await act(async () =>
			pendingFetches["BSB"].resolve(chaptersWithVerse("Blessed (BSB)"))
		);
		await screen.findByText("Blessed (BSB)");

		// The stale KJV fetch resolves late; it must not overwrite BSB
		await act(async () =>
			pendingFetches["eng_kjv"].resolve(chaptersWithVerse("Blessed (KJV)"))
		);

		expect(screen.getByText("Blessed (BSB)")).toBeInTheDocument();
		expect(screen.queryByText("Blessed (KJV)")).not.toBeInTheDocument();
	});
});
