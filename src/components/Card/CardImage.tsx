interface CardImageProps {
	id?: string;
	navLabel?: string;
	viewFile?: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
	imgSrc: string;
}

function CardImage({ id, navLabel, viewFile, imgSrc }: CardImageProps) {
	return (
		<>
			{imgSrc === "" ? (
				// image placeholder for case files
				<div
					className="w-60 h-[100px] rounded-lg border border-[#EBECF2] bg-slate-200 cursor-pointer"
					id={id}
					onClick={viewFile}
				></div>
			) : (
				// image placeholder for case folders
				<div id={id} aria-label={navLabel} className="w-60 h-[100px] rounded-lg">
					<img id={id} aria-label={navLabel} src={imgSrc} />
				</div>
			)}
		</>
	);
}

export default CardImage;
