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

	return (
		<div className="w-full pl-[88px] pr-[116px]">
			<div className="grid justify-start grid-cols-customAuto gap-x-10 gap-y-14">{children}</div>
		</div>
	);
}

export default CardGrid;
