"use client";

import lectionary from "@/app/constants/lectionary";
import { getReadingTitle } from "@/app/utils";
import Link from "next/link";

const Home = () => {
	return (
		<div>
			<h1>Lutheran Lectionary</h1>
			<section>
				{lectionary.map((month, monthIndex) => {
					const monthNumber = monthIndex + 1;

					return (
						<div key={month.name}>
							<h2 className="text-center">{month.name}</h2>
							<div className="grid grid-flow-col grid-rows-[repeat(11,auto)] auto-cols-[minmax(0,12rem)] gap-4 justify-center">
								{month?.days?.map((day) => {
									const date = day.ofTheMonth;
									const reading1Display = day.firstReading
										.map((reading) => getReadingTitle(reading))
										.join(", ");
									const reading2Display = day.secondReading
										.map((reading) => getReadingTitle(reading))
										.join(", ");

									return (
										<div key={`${month.name}-${date}`}>
											<Link href={`/${monthNumber}/${date}`}>
												<h3 data-testid={`date:${month.name}-${date}`}>
													{date}
												</h3>
												<p data-testid={`reading1:${month.name}-${date}`}>
													{reading1Display}
												</p>
												<p data-testid={`reading2:${month.name}-${date}`}>
													{reading2Display}
												</p>
											</Link>
										</div>
									);
								})}
							</div>
							<br />
						</div>
					);
				})}
			</section>
		</div>
	);
};

export default Home;
