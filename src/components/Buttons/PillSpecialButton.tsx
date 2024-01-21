import { ButtonProps } from "../../utils/types";

function PillSpecialButton(props: ButtonProps) {
	const { name, className, onClick, disabled, style, img } = props;

	return (
		<button
			type="button"
			className={`${className} px-3 pill-special-btn-border border-4 border-transparent h-9 flex items-center justify-center rounded-[30px]`}
			onClick={onClick}
			disabled={disabled}
			style={style}
		>
			<span className="flex flex-row items-center gap-1">
				<img style={{ display: img ? "block" : "none" }} className="w-[22px] h-[22px]" src={img} />
				<p className="text-[#2D2F8C] font-[600] text-base pb-[2px]">{name}</p>
			</span>
		</button>
	);
}

export default PillSpecialButton;
