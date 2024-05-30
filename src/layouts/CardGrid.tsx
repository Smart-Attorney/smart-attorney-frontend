interface CardGridProps {
	children: React.ReactNode;
}

function CardGrid({ children }: CardGridProps) {
	return (
		<div className="w-full pl-[88px] pr-32">
			<div className="flex flex-row flex-wrap justify-center gap-x-10 gap-y-14">
				{children}
				{/* <CardContainer className="flex-grow visible"/> */}
			</div>
		</div>
	);
}
export default CardGrid;
/* 
grid gap-8 justify-items-center min-[2300px]:grid-cols-6 min-[1900px]:grid-cols-5 min-[1400px]:grid-cols-4 min-[1100px]:grid-cols-3 min-[850px]:grid-cols-2
*/
