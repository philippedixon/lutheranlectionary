import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DayPage from "@/app/[month]/[day]/page";
import { SelectionsContext } from "@/app/contexts";
import { esvChapterPassages } from "../../__mocks__/esv-api";

const mockPathname = jest.fn(() => "/11/3");

jest.mock("next/navigation", () => ({
	usePathname: () => mockPathname(),
}));

jest.mock("@/lib/api/ApiStrategyFactory", () => ({
	ApiStrategyFactory: jest.fn().mockImplementation(() => ({
		create: () => ({
			fetchData: jest.fn().mockResolvedValue(esvChapterPassages),
		}),
	})),
}));

describe("DayPage ESV multi-chapter reading", () => {
	beforeEach(() => mockPathname.mockReturnValue("/11/3"));

	it("renders every chapter in order with one copyright line", async () => {
		const { container } = render(
			<SelectionsContext.Provider
				value={{ languageName: "", translationId: "eng_esv" }}
			>
				<DayPage />
			</SelectionsContext.Provider>
		);

		await waitFor(() =>
			expect(container.querySelector(".esv-passage")).toBeInTheDocument()
		);

		const html = container.querySelector(".esv-passage")!.innerHTML;
		expect(html.indexOf("Chapter one.")).toBeLessThan(
			html.indexOf("Chapter two.")
		);
		expect(html.indexOf("Chapter two.")).toBeLessThan(
			html.indexOf("Chapter three.")
		);
		expect(container.querySelectorAll(".esv-passage a.copyright")).toHaveLength(1);
	});

	it("shows one footnotes block after the last chapter", async () => {
		const { container } = render(
			<SelectionsContext.Provider
				value={{ languageName: "", translationId: "eng_esv" }}
			>
				<DayPage />
			</SelectionsContext.Provider>
		);

		await waitFor(() =>
			expect(container.querySelector(".esv-passage")).toBeInTheDocument()
		);

		const footnotes = container.querySelectorAll(".esv-passage .footnotes");
		expect(footnotes).toHaveLength(1);
		const html = container.querySelector(".esv-passage")!.innerHTML;
		expect(html.indexOf("Chapter three.")).toBeLessThan(
			html.indexOf('class="footnotes')
		);
	});

	it("labels footnotes with the reading's real chapter numbers", async () => {
		mockPathname.mockReturnValue("/11/5"); // Amos 6-9
		const { container } = render(
			<SelectionsContext.Provider
				value={{ languageName: "", translationId: "eng_esv" }}
			>
				<DayPage />
			</SelectionsContext.Provider>
		);

		await waitFor(() =>
			expect(container.querySelector(".esv-passage")).toBeInTheDocument()
		);
		await userEvent.click(screen.getByRole("button", { name: "Amos 6-9" }));

		const labels = [
			...container.querySelectorAll(".esv-passage .footnotes-chapter"),
		].map((h) => h.textContent);
		expect(labels).toEqual(["Chapter 6", "Chapter 7"]);
	});
});
