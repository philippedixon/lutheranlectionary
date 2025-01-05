import { TranslationBookChapter } from "@/app/interfaces";

export const genesisPassage: TranslationBookChapter[] = [
	{
		translation: {
			id: "BSB",
			name: "Berean Standard Bible",
			website: "https://berean.bible/",
			licenseUrl: "https://berean.bible/",
			licenseNotes: null,
			shortName: "BSB",
			englishName: "Berean Standard Bible",
			language: "eng",
			textDirection: "ltr",
			sha256:
				"17c5ac87e26de77bf1f09c1c3ee0c3fafeb3c876849038e8df9b64a7a9504674",
			availableFormats: ["json"],
			listOfBooksApiLink: "/api/BSB/books.json",
			numberOfBooks: 66,
			totalNumberOfChapters: 1189,
			totalNumberOfVerses: 31086,
			languageName: "English",
			languageEnglishName: "English",
		},
		book: {
			id: "GEN",
			translationId: "BSB",
			name: "Genesis",
			commonName: "Genesis",
			title: "Genesis",
			order: 1,
			numberOfChapters: 50,
			sha256:
				"9ae507188093d846873e8affd9e88c21ac55abdbc6d8adb9beb220345494f0f1",
			firstChapterApiLink: "/api/BSB/GEN/1.json",
			lastChapterApiLink: "/api/BSB/GEN/50.json",
			totalNumberOfVerses: 1533,
		},
		chapter: {
			number: 1,
			content: [
				{
					type: "heading",
					content: ["The Creation"],
				},
				{
					type: "verse",
					number: 1,
					content: ["In the beginning God created the heavens and the earth."],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 2,
					content: [
						"Now the earth was formless and void, and darkness was over the surface of the deep. And the Spirit of God was hovering over the surface of the waters.",
					],
				},
				{
					type: "heading",
					content: ["The First Day"],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 3,
					content: [
						"And God said, “Let there be light,”",
						{
							noteId: 4315,
						},
						"and there was light.",
					],
				},
				{
					type: "verse",
					number: 4,
					content: [
						"And God saw that the light was good, and He separated the light from the darkness.",
					],
				},
				{
					type: "verse",
					number: 5,
					content: [
						"God called the light “day,” and the darkness He called “night.”",
						{
							lineBreak: true,
						},
						"And there was evening, and there was morning—the first day.",
						{
							noteId: 4316,
						},
					],
				},
				{
					type: "heading",
					content: ["The Second Day"],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 6,
					content: [
						"And God said, “Let there be an expanse",
						{
							noteId: 4317,
						},
						"between the waters, to separate the waters from the waters.”",
					],
				},
				{
					type: "verse",
					number: 7,
					content: [
						"So God made the expanse and separated the waters beneath it from the waters above. And it was so.",
					],
				},
				{
					type: "verse",
					number: 8,
					content: [
						"God called the expanse “sky.”",
						{
							lineBreak: true,
						},
						"And there was evening, and there was morning—the second day.",
					],
				},
				{
					type: "heading",
					content: ["The Third Day"],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 9,
					content: [
						"And God said, “Let the waters under the sky be gathered into one place, so that the dry land may appear.” And it was so.",
					],
				},
				{
					type: "verse",
					number: 10,
					content: [
						"God called the dry land “earth,” and the gathering of waters He called “seas.” And God saw that it was good.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 11,
					content: [
						"Then God said, “Let the earth bring forth vegetation: seed-bearing plants and fruit trees, each bearing fruit with seed according to its kind.” And it was so.",
					],
				},
				{
					type: "verse",
					number: 12,
					content: [
						"The earth produced vegetation: seed-bearing plants according to their kinds and trees bearing fruit with seed according to their kinds. And God saw that it was good.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 13,
					content: [
						"And there was evening, and there was morning—the third day.",
					],
				},
				{
					type: "heading",
					content: ["The Fourth Day"],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 14,
					content: [
						"And God said, “Let there be lights in the expanse of the sky to distinguish between the day and the night, and let them be signs to mark the seasons and days and years.",
					],
				},
				{
					type: "verse",
					number: 15,
					content: [
						"And let them serve as lights in the expanse of the sky to shine upon the earth.” And it was so.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 16,
					content: [
						"God made two great lights: the greater light to rule the day and the lesser light to rule the night. And He made the stars as well.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 17,
					content: [
						"God set these lights in the expanse of the sky to shine upon the earth,",
					],
				},
				{
					type: "verse",
					number: 18,
					content: [
						"to preside over the day and the night, and to separate the light from the darkness. And God saw that it was good.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 19,
					content: [
						"And there was evening, and there was morning—the fourth day.",
					],
				},
				{
					type: "heading",
					content: ["The Fifth Day"],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 20,
					content: [
						"And God said, “Let the waters teem with living creatures, and let birds fly above the earth in the open expanse of the sky.”",
					],
				},
				{
					type: "verse",
					number: 21,
					content: [
						"So God created the great sea creatures and every living thing that moves, with which the waters teemed according to their kinds, and every bird of flight after its kind. And God saw that it was good.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 22,
					content: [
						"Then God blessed them and said, “Be fruitful and multiply and fill the waters of the seas, and let birds multiply on the earth.”",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 23,
					content: [
						"And there was evening, and there was morning—the fifth day.",
					],
				},
				{
					type: "heading",
					content: ["The Sixth Day"],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 24,
					content: [
						"And God said, “Let the earth bring forth living creatures according to their kinds: livestock, land crawlers, and beasts of the earth according to their kinds.” And it was so.",
					],
				},
				{
					type: "verse",
					number: 25,
					content: [
						"God made the beasts of the earth according to their kinds, the livestock according to their kinds, and everything that crawls upon the earth according to its kind. And God saw that it was good.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 26,
					content: [
						"Then God said, “Let Us make man in Our image, after Our likeness, to rule over the fish of the sea and the birds of the air, over the livestock, and over all the earth itself",
						{
							noteId: 4318,
						},
						"and every creature that crawls upon it.”",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 27,
					content: [
						{
							text: "So God created man in His own image;",
							poem: 1,
						},
						{
							text: "in the image of God He created him;",
							poem: 2,
						},
						{
							lineBreak: true,
						},
						{
							text: "male and female He created them.",
							poem: 2,
						},
						{
							noteId: 4319,
						},
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 28,
					content: [
						"God blessed them and said to them, “Be fruitful and multiply, and fill the earth and subdue it; rule over the fish of the sea and the birds of the air and every creature that crawls upon the earth.”",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 29,
					content: [
						"Then God said, “Behold, I have given you every seed-bearing plant on the face of all the earth, and every tree whose fruit contains seed. They will be yours for food.",
					],
				},
				{
					type: "verse",
					number: 30,
					content: [
						"And to every beast of the earth and every bird of the air and every creature that crawls upon the earth—everything that has the breath of life in it—I have given every green plant for food.” And it was so.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 31,
					content: [
						"And God looked upon all that He had made, and indeed, it was very good.",
						{
							lineBreak: true,
						},
						"And there was evening, and there was morning—the sixth day.",
					],
				},
			],
			footnotes: [
				{
					noteId: 4315,
					caller: "+",
					text: "Cited in 2 Corinthians 4:6",
					reference: {
						chapter: 1,
						verse: 3,
					},
				},
				{
					noteId: 4316,
					caller: "+",
					text: "Literally day one",
					reference: {
						chapter: 1,
						verse: 5,
					},
				},
				{
					noteId: 4317,
					caller: "+",
					text: "Or a canopy or a firmament or a vault; also in verses 7, 8, 14, 15, 17, and 20",
					reference: {
						chapter: 1,
						verse: 6,
					},
				},
				{
					noteId: 4318,
					caller: "+",
					text: "MT; Syriac and over all the beasts of the earth",
					reference: {
						chapter: 1,
						verse: 26,
					},
				},
				{
					noteId: 4319,
					caller: "+",
					text: "Cited in Matthew 19:4 and Mark 10:6",
					reference: {
						chapter: 1,
						verse: 27,
					},
				},
			],
		},
		thisChapterLink: "/api/BSB/GEN/1.json",
		thisChapterAudioLinks: {
			gilbert: "https://openbible.com/audio/gilbert/BSB_01_Gen_001_G.mp3",
			hays: "https://openbible.com/audio/hays/BSB_01_Gen_001_H.mp3",
			souer: "https://openbible.com/audio/souer/BSB_01_Gen_001.mp3",
		},
		nextChapterApiLink: "/api/BSB/GEN/2.json",
		nextChapterAudioLinks: {
			gilbert: "https://openbible.com/audio/gilbert/BSB_01_Gen_002_G.mp3",
			hays: "https://openbible.com/audio/hays/BSB_01_Gen_002_H.mp3",
			souer: "https://openbible.com/audio/souer/BSB_01_Gen_002.mp3",
		},
		previousChapterApiLink: null,
		previousChapterAudioLinks: null,
		numberOfVerses: 31,
	},
] as TranslationBookChapter[];
