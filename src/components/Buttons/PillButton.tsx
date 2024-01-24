import { ButtonProps } from "../../utils/types";

function PillButton(props: ButtonProps) {
	const { name, className, onClick, disabled, style, img } = props;

	return (
		<button
			type="button"
			className={`${className} px-3 flex items-center h-9 justify-center border-4 border-[#2D2F8C] bg-white rounded-[30px]`}
			onClick={onClick}
			disabled={disabled}
			style={style}
		>
			<span className="flex flex-row items-center gap-1">
				<img style={{ display: img ? "block" : "none" }} className="w-[22px] h-[22px]" src={img} />
				<p className="text-[#2D2F8C] font-semibold text-base">{name}</p>
			</span>
		</button>
	);
}

export default PillButton;
