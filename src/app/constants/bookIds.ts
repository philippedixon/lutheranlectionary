import { Book, BookId } from "@/app/enums";

const booksIds: Record<BookId, Book> = {
	[BookId.Colossians]: Book.Colossians,
	[BookId.Corinthians1]: Book.Corinthians1,
	[BookId.Corinthians2]: Book.Corinthians2,
	[BookId.Deuteronomy]: Book.Deuteronomy,
	[BookId.Ephesians]: Book.Ephesians,
	[BookId.Exodus]: Book.Exodus,
	[BookId.Galatians]: Book.Galatians,
	[BookId.Genesis]: Book.Genesis,
	[BookId.Isaiah]: Book.Isaiah,
	[BookId.Leviticus]: Book.Leviticus,
	[BookId.Luke]: Book.Luke,
	[BookId.Mark]: Book.Mark,
	[BookId.Numbers]: Book.Numbers,
	[BookId.Philemon]: Book.Philemon,
	[BookId.Philippians]: Book.Philippians,
	[BookId.Psalms]: Book.Psalms,
	[BookId.Revelation]: Book.Revelation,
	[BookId.Romans]: Book.Romans,
	[BookId.Samuel1]: Book.Samuel1,
	[BookId.Samuel2]: Book.Samuel2,
	[BookId.Thessalonians1]: Book.Thessalonians1,
	[BookId.Thessalonians2]: Book.Thessalonians2,
	[BookId.Timothy1]: Book.Timothy1,
	[BookId.Timothy2]: Book.Timothy2,
	[BookId.Titus]: Book.Titus,
};

export default booksIds;
