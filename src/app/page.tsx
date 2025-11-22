"use client";

import Link from "next/link";
import { months } from "@/app/constants";
import lectionary from "@/app/constants/lectionary";
import { ScrollToTopButton } from "@/app/components/ScrollToTopButton";
import { getReadingTitle } from "@/app/utils";

const MonthList = () => {
	const monthNumbers = [...Array(12).keys()].map((i) => i + 1);

	return (
		<div className="flex gap-3 flex-wrap justify-between">
			{monthNumbers.map((monthNumber) => {
				const monthName = months[monthNumber];

				return (
					<button
						key={monthNumber}
						className="text-blue-600 hover:underline"
						onClick={(e) => {
							e.preventDefault();
							const id = `month-${monthNumber}`;
							const element = document.getElementById(id);
							if (element) {
								// optional offset: scrollIntoView then adjust
								element.scrollIntoView({ behavior: "smooth", block: "start" });
								// push hash without jumping
								history.replaceState(null, "", `#${id}`);
							}
						}}
					>
						{monthName}
					</button>
				);
			})}
		</div>
	);
};

const Home = () => {
	return (
		<div className="px-6">
			<h1 className="text-center">Lutheran Lectionary</h1>
			<section className="max-w-xl mx-auto">
				<MonthList />
				{lectionary.map((month, monthIndex) => {
					const monthNumber = monthIndex + 1;

					return (
						<div id={`month-${monthNumber}`} key={month.name}>
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
			<ScrollToTopButton />
		</div>
	);
};

export default Home;
