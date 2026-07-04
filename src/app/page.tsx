"use client";

import Link from "next/link";
import { months } from "@/app/constants";
import lectionary from "@/app/constants/lectionary";
import { ScrollToTopButton } from "@/app/components/ScrollToTopButton";
import { getReadingTitle } from "@/app/utils";

const MonthList = () => {
	const monthNumbers = [...Array(12).keys()].map((i) => i + 1);

	return (
		<div className="grid grid-cols-4 grid-rows-3 gap-3 justify-items-start text-left sm:grid-cols-6 sm:grid-rows-2  max-[430px]:grid-cols-3 max-[430px]:grid-rows-4 mb-6">
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
			<h1 className="text-center text-4xl my-5">Lutheran Lectionary</h1>
			<section className="max-w-xl mx-auto">
				<MonthList />
				{lectionary.map((month, monthIndex) => {
					const monthNumber = monthIndex + 1;

					return (
						<div id={`month-${monthNumber}`} key={month.name}>
							<h2
								data-testid={`monthId-${monthNumber}`}
								className="text-3xl mb-3"
							>
								{month.name}
							</h2>
							<div className="grid grid-cols-3 max-[374px]:grid-cols-2 gap-4">
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
											<Link href={`/${monthNumber}/${date}`} className="text-blue-600 dark:text-blue-400 hover:underline">
												<h3
													className="font-bold"
													data-testid={`date:${month.name}-${date}`}
												>
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
				<ScrollToTopButton />
			</section>
		</div>
	);
};

export default Home;
