import { MessageSquare, Paperclip } from "../../assets/smart-attorney-figma/stock";

interface CardFooterProps {
	id?: string;
	hasFooter: boolean;
}

function CardFooter({ id, hasFooter }: CardFooterProps) {
	return (
		<div id={id} className="flex flex-row items-center justify-between h-6 w-60">
			{hasFooter && (
				<>
					<div id="enable-nav" className="flex flex-row gap-3">
						<div id="enable-nav" className="flex flex-row items-center justify-center gap-1">
							<img id="enable-nav" className="h-[14px] w-[14px]" src={MessageSquare} />
							<p id="enable-nav" className="text-[#5A5A5A] text-xs">
								12
							</p>
						</div>
						<div id="enable-nav" className="flex flex-row items-center justify-center gap-0.5">
							<img id="enable-nav" className="h-[14px] w-[14px]" src={Paperclip} />
							<p id="enable-nav" className="text-[#5A5A5A] text-xs">
								4
							</p>
						</div>
					</div>
					<p id="enable-nav" className="text-xs text-[#5A5A5A] mr-11">
						Assigned to
					</p>
				</>
			)}
		</div>
	);
}

export default CardFooter;
