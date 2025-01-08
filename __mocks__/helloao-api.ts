import { TranslationBookChapter } from "@/app/interfaces";

export const genesisPassage = [
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
			number: 2,
			content: [
				{
					type: "heading",
					content: ["The Seventh Day"],
				},
				{
					type: "verse",
					number: 1,
					content: [
						"Thus the heavens and the earth were completed in all their vast array.",
					],
				},
				{
					type: "verse",
					number: 2,
					content: [
						"And by the seventh day God had finished the work He had been doing; so on that day He rested from all His work.",
						{
							noteId: 4320,
						},
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 3,
					content: [
						"Then God blessed the seventh day and sanctified it, because on that day He rested from all the work of creation that He had accomplished.",
					],
				},
				{
					type: "heading",
					content: ["Man and Woman in the Garden"],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 4,
					content: [
						"This is the account of the heavens and the earth when they were created, in the day that the LORD",
						{
							noteId: 4321,
						},
						"God made them.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 5,
					content: [
						"Now no shrub of the field had yet appeared on the earth, nor had any plant of the field sprouted; for the LORD God had not yet sent rain upon the earth, and there was no man to cultivate the ground.",
					],
				},
				{
					type: "verse",
					number: 6,
					content: [
						"But springs",
						{
							noteId: 4322,
						},
						"welled up from the earth and watered the whole surface of the ground.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 7,
					content: [
						"Then the LORD God formed man from the dust of the ground and breathed the breath of life into his nostrils, and the man became a living being.",
						{
							noteId: 4323,
						},
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 8,
					content: [
						"And the LORD God planted a garden in Eden, in the east, where He placed the man He had formed.",
					],
				},
				{
					type: "verse",
					number: 9,
					content: [
						"Out of the ground the LORD God gave growth to every tree that is pleasing to the eye and good for food. And in the middle of the garden were the tree of life and the tree of the knowledge of good and evil.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 10,
					content: [
						"Now a river flowed out of Eden to water the garden, and from there it branched into four headwaters:",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 11,
					content: [
						"The name of the first river is Pishon; it winds through the whole land of Havilah, where there is gold.",
					],
				},
				{
					type: "verse",
					number: 12,
					content: [
						"And the gold of that land is pure, and bdellium and onyx are found there.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 13,
					content: [
						"The name of the second river is Gihon; it winds through the whole land of Cush.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 14,
					content: [
						"The name of the third river is Hiddekel; it runs along the east side of Assyria.",
						{
							lineBreak: true,
						},
						"And the fourth river is the Euphrates.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 15,
					content: [
						"Then the LORD God took the man and placed him in the Garden of Eden to cultivate and keep it.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 16,
					content: [
						"And the LORD God commanded him, “You may eat freely from every tree of the garden,",
					],
				},
				{
					type: "verse",
					number: 17,
					content: [
						"but you must not eat from the tree of the knowledge of good and evil; for in the day that you eat of it, you will surely die.”",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 18,
					content: [
						"The LORD God also said, “It is not good for the man to be alone. I will make for him a suitable helper.”",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 19,
					content: [
						"And out of the ground the LORD God formed every beast of the field and every bird of the air, and He brought them to the man to see what he would name each one. And whatever the man called each living creature, that was its name.",
					],
				},
				{
					type: "verse",
					number: 20,
					content: [
						"The man gave names to all the livestock, to the birds of the air, and to every beast of the field. But for Adam",
						{
							noteId: 4324,
						},
						"no suitable helper was found.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 21,
					content: [
						"So the LORD God caused the man to fall into a deep sleep, and while he slept, He took one of the man’s ribs",
						{
							noteId: 4325,
						},
						"and closed up the area with flesh.",
					],
				},
				{
					type: "verse",
					number: 22,
					content: [
						"And from the rib that the LORD God had taken from the man, He made a woman and brought her to him.",
					],
				},
				{
					type: "verse",
					number: 23,
					content: [
						"And the man said:",
						{
							lineBreak: true,
						},
						{
							text: "“This is now bone of my bones",
							poem: 1,
						},
						{
							text: "and flesh of my flesh;",
							poem: 2,
						},
						{
							text: "she shall be called ‘woman,’",
							poem: 1,
						},
						{
							text: "for out of man she was taken.”",
							poem: 2,
						},
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 24,
					content: [
						"For this reason a man will leave his father and mother and be united to his wife, and they will become one flesh.",
						{
							noteId: 4326,
						},
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 25,
					content: [
						"And the man and his wife were both naked, and they were not ashamed.",
					],
				},
			],
			footnotes: [
				{
					noteId: 4320,
					caller: "+",
					text: "Cited in Hebrews 4:4",
					reference: {
						chapter: 2,
						verse: 2,
					},
				},
				{
					noteId: 4321,
					caller: "+",
					text: "LORD or GOD, with capital letters, represents the proper name of the God of Israel and the one true God, transliterated from the Hebrew as YHWH; here and throughout the Scriptures.",
					reference: {
						chapter: 2,
						verse: 4,
					},
				},
				{
					noteId: 4322,
					caller: "+",
					text: "Or mist",
					reference: {
						chapter: 2,
						verse: 6,
					},
				},
				{
					noteId: 4323,
					caller: "+",
					text: "Or a living soul; cited in 1 Corinthians 15:45",
					reference: {
						chapter: 2,
						verse: 7,
					},
				},
				{
					noteId: 4324,
					caller: "+",
					text: "Or the man, as in verses 19 and 21",
					reference: {
						chapter: 2,
						verse: 20,
					},
				},
				{
					noteId: 4325,
					caller: "+",
					text: "Or took part of the man’s side; similarly in verse 22",
					reference: {
						chapter: 2,
						verse: 21,
					},
				},
				{
					noteId: 4326,
					caller: "+",
					text: "LXX and the two will become one flesh; cited in Matthew 19:5, Mark 10:7–8, 1 Corinthians 6:16, and Ephesians 5:31",
					reference: {
						chapter: 2,
						verse: 24,
					},
				},
			],
		},
		thisChapterLink: "/api/BSB/GEN/2.json",
		thisChapterAudioLinks: {
			gilbert: "https://openbible.com/audio/gilbert/BSB_01_Gen_002_G.mp3",
			hays: "https://openbible.com/audio/hays/BSB_01_Gen_002_H.mp3",
			souer: "https://openbible.com/audio/souer/BSB_01_Gen_002.mp3",
		},
		nextChapterApiLink: "/api/BSB/GEN/3.json",
		nextChapterAudioLinks: {
			gilbert: "https://openbible.com/audio/gilbert/BSB_01_Gen_003_G.mp3",
			hays: "https://openbible.com/audio/hays/BSB_01_Gen_003_H.mp3",
			souer: "https://openbible.com/audio/souer/BSB_01_Gen_003.mp3",
		},
		previousChapterApiLink: "/api/BSB/GEN/1.json",
		previousChapterAudioLinks: {
			gilbert: "https://openbible.com/audio/gilbert/BSB_01_Gen_001_G.mp3",
			hays: "https://openbible.com/audio/hays/BSB_01_Gen_001_H.mp3",
			souer: "https://openbible.com/audio/souer/BSB_01_Gen_001.mp3",
		},
		numberOfVerses: 25,
	},
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
			number: 3,
			content: [
				{
					type: "heading",
					content: ["The Serpent’s Deception"],
				},
				{
					type: "verse",
					number: 1,
					content: [
						"Now the serpent",
						{
							noteId: 4327,
						},
						"was more crafty than any beast of the field that the LORD God had made. And he said to the woman, “Did God really say, ‘You must not eat from any tree in the garden?’”",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 2,
					content: [
						"The woman answered the serpent, “We may eat the fruit of the trees of the garden,",
					],
				},
				{
					type: "verse",
					number: 3,
					content: [
						"but about the fruit of the tree in the middle of the garden, God has said, ‘You must not eat of it or touch it, or you will die.’”",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 4,
					content: ["“You will not surely die,” the serpent told her."],
				},
				{
					type: "verse",
					number: 5,
					content: [
						"“For God knows that in the day you eat of it, your eyes will be opened and you will be like God, knowing good and evil.”",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 6,
					content: [
						"When the woman saw that the tree was good for food and pleasing to the eyes, and that it was desirable for obtaining wisdom, she took the fruit and ate it. She also gave some to her husband who was with her, and he ate it.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 7,
					content: [
						"And the eyes of both of them were opened, and they knew that they were naked; so they sewed together fig leaves and made coverings for themselves.",
					],
				},
				{
					type: "heading",
					content: ["God Arraigns Adam and Eve"],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 8,
					content: [
						"Then the man and his wife heard the voice of the LORD God walking in the garden in the breeze",
						{
							noteId: 4328,
						},
						"of the day, and they hid themselves from the presence of the LORD God among the trees of the garden.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 9,
					content: ["But the LORD God called out to the man, “Where are you?”"],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 10,
					content: [
						"“I heard Your voice in the garden,” he replied, “and I was afraid because I was naked; so I hid myself.”",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 11,
					content: [
						"“Who told you that you were naked?” asked the LORD God. “Have you eaten from the tree of which I commanded you not to eat?”",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 12,
					content: [
						"And the man answered, “The woman whom You gave me, she gave me fruit from the tree, and I ate it.”",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 13,
					content: [
						"Then the LORD God said to the woman, “What is this you have done?”",
						{
							lineBreak: true,
						},
						"“The serpent deceived me,” she replied, “and I ate.”",
					],
				},
				{
					type: "heading",
					content: ["The Fate of the Serpent"],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 14,
					content: [
						"So the LORD God said to the serpent:",
						{
							lineBreak: true,
						},
						{
							text: "“Because you have done this,",
							poem: 1,
						},
						{
							text: "cursed are you above all livestock",
							poem: 2,
						},
						{
							lineBreak: true,
						},
						{
							text: "and every beast of the field!",
							poem: 2,
						},
						{
							text: "On your belly will you go,",
							poem: 1,
						},
						{
							text: "and dust you will eat,",
							poem: 2,
						},
						{
							lineBreak: true,
						},
						{
							text: "all the days of your life.",
							poem: 2,
						},
					],
				},
				{
					type: "verse",
					number: 15,
					content: [
						{
							text: "And I will put enmity between you and the woman,",
							poem: 1,
						},
						{
							text: "and between your seed and her seed.",
							poem: 2,
						},
						{
							text: "He will crush your head,",
							poem: 1,
						},
						{
							text: "and you will strike his heel.",
							poem: 2,
						},
						{
							noteId: 4329,
						},
						{
							text: "”",
							poem: 2,
						},
					],
				},
				{
					type: "heading",
					content: ["The Punishment of Mankind"],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 16,
					content: [
						"To the woman He said:",
						{
							lineBreak: true,
						},
						{
							text: "“I will sharply increase your pain in childbirth;",
							poem: 1,
						},
						{
							text: "in pain you will bring forth children.",
							poem: 2,
						},
						{
							text: "Your desire will be for your husband,",
							poem: 1,
						},
						{
							noteId: 4330,
						},
						{
							text: "and he will rule over you.”",
							poem: 2,
						},
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 17,
					content: [
						"And to Adam He said:",
						{
							lineBreak: true,
						},
						{
							text: "“Because you have listened to the voice of your wife",
							poem: 1,
						},
						{
							text: "and have eaten from the tree",
							poem: 2,
						},
						{
							lineBreak: true,
						},
						{
							text: "of which I commanded you not to eat,",
							poem: 2,
						},
						{
							text: "cursed is the ground because of you;",
							poem: 1,
						},
						{
							text: "through toil you will eat of it",
							poem: 2,
						},
						{
							lineBreak: true,
						},
						{
							text: "all the days of your life.",
							poem: 2,
						},
					],
				},
				{
					type: "verse",
					number: 18,
					content: [
						{
							text: "Both thorns and thistles it will yield for you,",
							poem: 1,
						},
						{
							text: "and you will eat the plants of the field.",
							poem: 2,
						},
					],
				},
				{
					type: "verse",
					number: 19,
					content: [
						{
							text: "By the sweat of your brow",
							poem: 1,
						},
						{
							text: "you will eat your bread,",
							poem: 2,
						},
						{
							text: "until you return to the ground—",
							poem: 1,
						},
						{
							text: "because out of it were you taken.",
							poem: 2,
						},
						{
							text: "For dust you are,",
							poem: 1,
						},
						{
							text: "and to dust you shall return.”",
							poem: 2,
						},
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 20,
					content: [
						"And Adam named his wife Eve,",
						{
							noteId: 4331,
						},
						"because she would be the mother of all the living.",
					],
				},
				{
					type: "heading",
					content: ["The Expulsion from Paradise"],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 21,
					content: [
						"And the LORD God made garments of skin for Adam and his wife, and He clothed them.",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 22,
					content: [
						"Then the LORD God said, “Behold, the man has become like one of Us, knowing good and evil. And now, lest he reach out his hand and take also from the tree of life, and eat, and live forever...”",
					],
				},
				{
					type: "line_break",
				},
				{
					type: "verse",
					number: 23,
					content: [
						"Therefore the LORD God banished him from the Garden of Eden to work the ground from which he had been taken.",
					],
				},
				{
					type: "verse",
					number: 24,
					content: [
						"So He drove out the man and stationed cherubim on the east side of the Garden of Eden, along with a whirling sword of flame to guard the way to the tree of life.",
					],
				},
			],
			footnotes: [
				{
					noteId: 4327,
					caller: "+",
					text: "Hebrew nachash, translated in this chapter as serpent, is translated in most cases as snake.",
					reference: {
						chapter: 3,
						verse: 1,
					},
				},
				{
					noteId: 4328,
					caller: "+",
					text: "Or at the breezy (time); Hebrew unto the Ruach",
					reference: {
						chapter: 3,
						verse: 8,
					},
				},
				{
					noteId: 4329,
					caller: "+",
					text: "Or He will bruise your head, and you will bruise his heel. The same Hebrew root for crush, bruise, or strike appears twice in this verse.",
					reference: {
						chapter: 3,
						verse: 15,
					},
				},
				{
					noteId: 4330,
					caller: "+",
					text: "Or You will desire to control your husband",
					reference: {
						chapter: 3,
						verse: 16,
					},
				},
				{
					noteId: 4331,
					caller: "+",
					text: "Eve sounds like the Hebrew for giving life or living.",
					reference: {
						chapter: 3,
						verse: 20,
					},
				},
			],
		},
		thisChapterLink: "/api/BSB/GEN/3.json",
		thisChapterAudioLinks: {
			gilbert: "https://openbible.com/audio/gilbert/BSB_01_Gen_003_G.mp3",
			hays: "https://openbible.com/audio/hays/BSB_01_Gen_003_H.mp3",
			souer: "https://openbible.com/audio/souer/BSB_01_Gen_003.mp3",
		},
		nextChapterApiLink: "/api/BSB/GEN/4.json",
		nextChapterAudioLinks: {
			gilbert: "https://openbible.com/audio/gilbert/BSB_01_Gen_004_G.mp3",
			hays: "https://openbible.com/audio/hays/BSB_01_Gen_004_H.mp3",
			souer: "https://openbible.com/audio/souer/BSB_01_Gen_004.mp3",
		},
		previousChapterApiLink: "/api/BSB/GEN/2.json",
		previousChapterAudioLinks: {
			gilbert: "https://openbible.com/audio/gilbert/BSB_01_Gen_002_G.mp3",
			hays: "https://openbible.com/audio/hays/BSB_01_Gen_002_H.mp3",
			souer: "https://openbible.com/audio/souer/BSB_01_Gen_002.mp3",
		},
		numberOfVerses: 24,
	},
] as unknown as TranslationBookChapter[];
