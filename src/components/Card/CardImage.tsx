interface CardImageProps {
	id?: string;
	fileId?: string;
	viewFile?: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
	imgSrc: string;
}

function CardImage({ id, fileId, viewFile, imgSrc }: CardImageProps) {
	return (
		<>
			{imgSrc === "" ? (
				// image placeholder for case files
				<div
					className="w-60 h-[100px] rounded-lg border border-[#EBECF2] bg-slate-200 cursor-pointer"
					id={fileId}
					onClick={viewFile}
				></div>
			) : (
				// image placeholder for case folders
				<div id={id} className="w-60 h-[100px] rounded-lg">
					<img id={id} src={imgSrc} />
				</div>
			)}
		</>
	);
}

export default CardImage;
