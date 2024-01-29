interface TooltipProps {
	name: string;
}

function Tooltip({ name }: TooltipProps) {
	let tooltipName: string;
	/* 
    Changes the tooltip name from "Create-case" to "Create".
    I figured it would display/look better that way.
  */
	if (name === "/create-case") {
		tooltipName = "Create";
	} else {
		const firstLetter = name.charAt(1).toUpperCase();
		const trailingLetters = name.substring(2);
		tooltipName = firstLetter + trailingLetters;
	}

	return (
		<span className="group-hover/tooltip:scale-100 duration-100 ease-in scale-0 tooltip-arrow-left bg-[#151515] absolute left-[72px] rounded-md h-7 py-1 px-2">
			<h1 className="text-sm text-white">{tooltipName}</h1>
		</span>
	);
}

export default Tooltip;
