import { stitchEsvPassages } from "@/app/utils";
import { esvChapterPassages } from "../../__mocks__/esv-api";

const copyrightLine = /<p>\(<a[^>]*class="copyright"[^>]*>ESV<\/a>\)<\/p>/g;
const footnotesBlock = /<div class="footnotes[^"]*">/g;
const ids = (html: string) => [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
const hrefs = (html: string) =>
	[...html.matchAll(/ href="#([^"]+)"/g)].map((m) => m[1]);

describe("stitchEsvPassages", () => {
	it("returns an empty string for no passages", () => {
		expect(stitchEsvPassages([])).toBe("");
	});

	it("returns a single passage unchanged", () => {
		const [chapterOne] = esvChapterPassages;
		expect(stitchEsvPassages([chapterOne])).toBe(chapterOne);
	});

	it("labels footnotes from the reading's first chapter number", () => {
		const html = stitchEsvPassages(esvChapterPassages, 6);
		const footnotes = html.slice(html.indexOf('<div class="footnotes'));
		const labels = [...footnotes.matchAll(/<h4[^>]*>([^<]+)<\/h4>/g)].map(
			(m) => m[1]
		);
		expect(labels).toEqual(["Chapter 6", "Chapter 7"]);
	});

	it("adds no footnotes block when no chapter has footnotes", () => {
		const [, , chapterThree] = esvChapterPassages;
		const html = stitchEsvPassages([chapterThree, chapterThree]);

		expect(html.match(footnotesBlock)).toBeNull();
		expect(html.match(copyrightLine)).toHaveLength(1);
	});

	describe("with several chapters", () => {
		const html = stitchEsvPassages(esvChapterPassages);

		it("joins chapters in order with a single copyright line at the end", () => {
			expect(html.indexOf("Chapter one.")).toBeLessThan(
				html.indexOf("Chapter two.")
			);
			expect(html.indexOf("Chapter two.")).toBeLessThan(
				html.indexOf("Chapter three.")
			);
			expect(html.match(copyrightLine)).toHaveLength(1);
			expect(html.trimEnd().endsWith("</a>)</p>")).toBe(true);
		});

		it("collects all footnotes into one block after the last chapter", () => {
			expect(html.match(footnotesBlock)).toHaveLength(1);
			expect(html.indexOf("Chapter three.")).toBeLessThan(
				html.indexOf('<div class="footnotes')
			);
			expect(html.indexOf('<div class="footnotes')).toBeLessThan(
				html.search(copyrightLine)
			);
		});

		it("labels each chapter's footnotes, skipping chapters without any", () => {
			const footnotes = html.slice(html.indexOf('<div class="footnotes'));
			const labels = [...footnotes.matchAll(/<h4[^>]*>([^<]+)<\/h4>/g)].map(
				(m) => m[1]
			);
			expect(labels).toEqual(["Chapter 1", "Chapter 2"]);
		});

		it("numbers footnote markers continuously across chapters", () => {
			const markers = [...html.matchAll(/<sup class="footnote">.*?\[(\d+)\]/g)].map(
				(m) => m[1]
			);
			expect(markers).toEqual(["1", "2", "3"]);
			expect(html).toContain("[3]</a></span> <span class=\"footnote-ref\">2:17");
		});

		it("keeps every footnote id unique and every link resolvable", () => {
			const allIds = ids(html);
			expect(new Set(allIds).size).toBe(allIds.length);
			for (const target of hrefs(html)) {
				expect(allIds).toContain(target);
			}
		});
	});
});
