import { render, screen } from "@testing-library/react";
import DayPage from "@/app/[month]/[day]/page";
import lectionary from "@/app/constants/lectionary";
import { getReadingTitle } from "@/app/utils";

const mockPathname = jest.fn();
const mockNotFound = jest.fn(() => {
	throw new Error("NEXT_NOT_FOUND");
});

jest.mock("next/navigation", () => ({
	usePathname: () => mockPathname(),
	notFound: () => mockNotFound(),
}));

jest.mock("@/lib/api/ApiStrategyFactory", () => ({
	ApiStrategyFactory: jest.fn().mockImplementation(() => ({
		create: () => ({ fetchData: jest.fn().mockResolvedValue([]) }),
	})),
}));

beforeEach(() => mockNotFound.mockClear());

describe("DayPage with an invalid date", () => {
	beforeEach(() => {
		jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => jest.restoreAllMocks());

	it.each(["/13/5", "/2/30", "/Web/Auth", "/wp-admin/install.php"])(
		"shows not found for %s",
		(path) => {
			mockPathname.mockReturnValue(path);

			expect(() => render(<DayPage />)).toThrow("NEXT_NOT_FOUND");
			expect(mockNotFound).toHaveBeenCalled();
		}
	);
});

describe("DayPage on February 29", () => {
	it("shows February 28's readings under a February 29 heading", () => {
		mockPathname.mockReturnValue("/2/29");

		render(<DayPage />);

		expect(
			screen.getByRole("heading", { name: "February 29" })
		).toBeInTheDocument();
		const february28 = lectionary[1].days[27];
		for (const reading of [
			...february28.firstReading,
			...february28.secondReading,
		]) {
			expect(
				screen.getByRole("button", { name: getReadingTitle(reading) })
			).toBeInTheDocument();
		}
		expect(mockNotFound).not.toHaveBeenCalled();
	});
});
