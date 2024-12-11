"use client";

import { usePathname } from "next/navigation";

const DayPage = () => {
	const path = usePathname();
	const [month, day] = path.split("/").slice(1);
	// get readings from pathname
	// use books and chapters to make requests and make requests to API
	// format and display responses

	return (
		<div>
			<h1>
				{month} {day}
			</h1>
			{/* Add your content here */}
		</div>
	);
};

export default DayPage;
