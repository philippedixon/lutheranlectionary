"use client";

import { lectionary } from "@/app/constants";
import { getReadingDisplay } from "@/app/utils";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			<h1>Lutheran Lectionary</h1>
			<section>
				{lectionary.map((month, monthIndex) => {
					const monthNumber = monthIndex + 1;

					return (
						<div key={month.name}>
							<h2>{month.name}</h2>
							{month?.days?.map((day, dayIndex) => {
								const date = dayIndex + 1;
								const reading1Display = getReadingDisplay(day.reading_1);
								const reading2Display = getReadingDisplay(day.reading_2);

								return (
									<div key={`${month.name}-${date}`}>
										<Link href={`/${monthNumber}/${date}`}>
											<h3>{date}</h3>
											<p>{reading1Display}</p>
											<p>{reading2Display}</p>
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
