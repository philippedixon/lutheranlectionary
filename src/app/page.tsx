"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { months } from "@/app/constants";
import lectionary from "@/app/constants/lectionary";
import { ScrollToTopButton } from "@/app/components/ScrollToTopButton";
import { getReadingTitle } from "@/app/utils";

const Home = () => {
	const [selectedMonth, setSelectedMonth] = useState(() => new Date().getMonth() + 1);
	const [todayKey, setTodayKey] = useState<string | null>(null);

	useEffect(() => {
		const d = new Date();
		setTodayKey(`${d.getMonth() + 1}-${d.getDate()}`);
	}, []);
	const monthData = lectionary[selectedMonth - 1];

	return (
		<div className="px-8 max-w-[960px] mx-auto pb-8" id="top">
			<h1 className="font-cormorant font-semibold text-[44px] text-primary text-center mt-6 mb-1">
				Lutheran Lectionary
			</h1>
			<p className="font-eb-garamond italic text-[16px] text-gold text-center mb-6">
				A Daily Office of Scripture
			</p>

			<div className="flex flex-wrap justify-center border-y border-divider gap-[10px_8px] py-[18px] px-[10px] mb-6">
				{[...Array(12).keys()].map((i) => {
					const monthNumber = i + 1;
					const isActive = monthNumber === selectedMonth;
					return (
						<button
							key={monthNumber}
							onClick={() => setSelectedMonth(monthNumber)}
							className={`font-cormorant font-semibold text-[18px] px-3 py-[5px] rounded-sm transition-colors ${
								isActive ? "bg-primary text-card" : "text-primary"
							}`}
						>
							{months[monthNumber]}
						</button>
					);
				})}
			</div>

			<div className="text-center mb-6">
				<h2
					data-testid={`monthId-${selectedMonth}`}
					className="inline font-cormorant font-semibold text-[32px] text-primary border-b-2 border-gold pb-[2px]"
				>
					{monthData.name}
				</h2>
			</div>

			<div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-[14px]">
				{monthData.days.map((day) => {
					const date = day.ofTheMonth;
					const reading1Display = day.firstReading
						.map((r) => getReadingTitle(r))
						.join(", ");
					const reading2Display = day.secondReading
						.map((r) => getReadingTitle(r))
						.join(", ");
					const isToday = todayKey === `${selectedMonth}-${date}`;

					return (
						<Link
							key={`${monthData.name}-${date}`}
							href={`/${selectedMonth}/${date}`}
							className={`text-primary block rounded-sm p-[14px_16px] min-h-[104px] flex flex-col gap-[6px] ${
								isToday
									? "bg-today-fill border-[1.5px] border-gold shadow-[inset_0_0_0_1px_var(--color-gold)]"
									: "bg-card border border-border"
							}`}
						>
							<h3
								className="font-cormorant font-semibold text-[24px] text-primary"
								data-testid={`date:${monthData.name}-${date}`}
							>
								{date}
							</h3>
							<p
								className="font-eb-garamond italic text-[14.5px] text-gold leading-[1.3]"
								data-testid={`reading1:${monthData.name}-${date}`}
							>
								{reading1Display}
							</p>
							<p
								className="font-eb-garamond italic text-[14.5px] text-gold leading-[1.3]"
								data-testid={`reading2:${monthData.name}-${date}`}
							>
								{reading2Display}
							</p>
						</Link>
					);
				})}
			</div>

			<ScrollToTopButton />
		</div>
	);
};

export default Home;
