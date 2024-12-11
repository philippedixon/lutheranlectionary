"use client";

import { months, lectionary } from "@/app/constants";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			<h1>Lutheran Lectionary</h1>
			<section>
				{lectionary.map((month, monthIndex) => {
					const monthName = months[monthIndex + 1];
					const monthNumber = monthIndex + 1;

					return (
						<div key={monthName}>
							<h2>{monthIndex + 1}</h2>
							{month?.map((day, dayIndex) => {
								const date = dayIndex + 1;

								const reading1Book = day.reading_1.book;
								const reading1Chapters = day.reading_1.chapters;
								const reading1Verses = day.reading_1.verses || "";
								let reading1 = `${reading1Book} ${reading1Chapters}`;
								reading1 = reading1Verses
									? `${reading1}:${reading1Verses}`
									: reading1;

								const reading2Book = day.reading_2.book;
								const reading2Chapters = day.reading_2.chapters;
								const reading2Verses = day.reading_2.verses || "";
								let reading2 = `${reading2Book} ${reading2Chapters}`;
								reading2 = reading2Verses
									? `${reading2}:${reading2Verses}`
									: reading2;
								return (
									<div key={`${monthName}-${date}`}>
										<Link href={`/${monthNumber}/${date}`}>
											<h3>{date}</h3>
											<p>{reading1}</p>
											<p>{reading2}</p>
										</Link>
									</div>
								);
							})}
							<br />
						</div>
					);
				})}
			</section>
		</div>
	);
}
