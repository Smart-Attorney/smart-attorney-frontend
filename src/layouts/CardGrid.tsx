interface CardGridProps {
	children: React.ReactNode;
}

function CardGrid({ children }: CardGridProps) {
	/*
	 * The cards should be grouped and center-justified with even spacing between.
	 * When the window shrinks, the cards on the end will wrap onto the next row.
	 * Cards wrapped on the last row should be left-justified.
	 *
	 * Problem: cards on last row are not left-justified.
	 */
	/*
	 * Attempted Solutions:
	 * https://stackoverflow.com/questions/34331102/how-to-display-wrapping-flex-items-as-space-between-with-last-row-aligned-left
	 * https://stackoverflow.com/questions/36487476/flex-item-should-align-left-not-center-when-it-wraps
	 * https://stackoverflow.com/questions/42176419/sizing-flex-items-on-the-last-row
	 */
	/*
	 * SOLUTION:
	 * https://stackoverflow.com/questions/32802202/how-to-center-a-flex-container-but-left-align-flex-items
	 */

	// const layout_0: string = `grid gap-x-10 gap-y-14 justify-items-center
	// 	min-[2300px]:grid-cols-6 min-[1900px]:grid-cols-5 min-[1400px]:grid-cols-4
	// 	min-[1100px]:grid-cols-3 min-[850px]:grid-cols-2 `;

	// const layout_1: string = `flex flex-row flex-wrap justify-center gap-x-10 gap-y-14`;

	// const layout_2: string = `flex flex-row flex-wrap justify-between gap-x-10 gap-y-14`;

	const layout_3: string = `grid justify-center grid-cols-customAuto gap-x-10 gap-y-14`;

	return (
		<div className="w-full pl-[88px] pr-32">
			<div className={layout_3}>{children}</div>
		</div>
	);
}

export default CardGrid;
