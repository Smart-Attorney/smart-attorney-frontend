import { MessageSquare, Paperclip } from "../../assets/smart-attorney-figma/stock";

interface CardFooterProps {
	id?: string;
	navLabel?: string;
	hasFooter: boolean;
}

function CardFooter({ id, navLabel, hasFooter }: CardFooterProps) {
	return (
		<div id={id} aria-label={navLabel} className="flex flex-row items-center justify-between h-6 w-60">
			{hasFooter && (
				<>
					<div aria-label={navLabel} className="flex flex-row gap-3">
						<div aria-label={navLabel} className="flex flex-row items-center justify-center gap-1">
							<img aria-label={navLabel} className="h-[14px] w-[14px]" src={MessageSquare} />
							<p aria-label={navLabel} className="text-[#5A5A5A] text-xs">
								12
							</p>
						</div>
						<div aria-label={navLabel} className="flex flex-row items-center justify-center gap-0.5">
							<img aria-label={navLabel} className="h-[14px] w-[14px]" src={Paperclip} />
							<p aria-label={navLabel} className="text-[#5A5A5A] text-xs">
								4
							</p>
						</div>
					</div>
					<p aria-label={navLabel} className="text-xs text-[#5A5A5A] mr-11">
						Assigned to
					</p>
				</>
			)}
		</div>
	);
}

export default CardFooter;
