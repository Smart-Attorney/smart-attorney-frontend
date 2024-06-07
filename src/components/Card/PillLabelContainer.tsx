import { useEffect, useRef } from "react";

interface PillLabelContainerProps {
	id?: string;
	navLabel?: string;
	className?: string;
	children: React.ReactNode;
}

function PillLabelContainer({ id, navLabel, className, children }: PillLabelContainerProps) {
	const pillContainer = useRef<HTMLDivElement>(null);

	// Stops background scroll when user mouse wheels while hovering pill labels
	useEffect(() => {
		pillContainer.current?.addEventListener("wheel", preventDefaultScroll, { passive: false });
		return () => {
			pillContainer.current?.removeEventListener("wheel", preventDefaultScroll);
		};
	}, []);

	const preventDefaultScroll = (event: { preventDefault: () => void }) => {
		event.preventDefault();
	};

	/*
	 * Allows vertical scroll wheel behavior to perform horizontal scroll
	 * Source: https://stackoverflow.com/questions/61099088/how-to-horizontally-scroll-a-table-with-mouse-wheel-in-react?rq=3
	 */
	const handleMouseWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
		const pillContainerScrollPosition = pillContainer.current ? pillContainer.current?.scrollLeft : 0;
		// translates vertical mouse wheel motion to horizontal scroll motion
		if (event.deltaX === 0) {
			pillContainer.current?.scrollTo({
				top: 0,
				left: pillContainerScrollPosition + event.deltaY,
			});
		}
		// translates horizontal mouse wheel motion to horizontal scroll motion
		if (event.deltaY === 0) {
			pillContainer.current?.scrollTo({
				top: 0,
				left: pillContainerScrollPosition + event.deltaX,
			});
		}
	};

	return (
		<div
			id={id}
			aria-label={navLabel}
			className={`${className} flex flex-row overflow-x-hidden overflow-y-hidden custom-scrollbar hover:overflow-x-auto gap-x-3 gap-y-1`}
			ref={pillContainer}
			onWheel={(event) => handleMouseWheelScroll(event)}
		>
			{children}
		</div>
	);
}

export default PillLabelContainer;
