import { ButtonProps } from "../../utils/types";

function PillSpecialButton({ img, title, name, type, className, style, isDisabled, onClick }: Partial<ButtonProps>) {
	return (
		<button
			title={title}
			type={type}
			className={`${className} px-3 pill-special-btn-border border-[3px] border-transparent h-9 flex items-center justify-center rounded-[30px]`}
			style={style}
			disabled={isDisabled}
			onClick={onClick}
		>
			<span className="flex flex-row items-center gap-1">
				<img style={{ display: img ? "block" : "none" }} className="w-[22px] h-[22px]" src={img} />
				<p className="text-[#2D2F8C] font-semibold text-base">{name}</p>
			</span>
		</button>
	);
}

export default PillSpecialButton;
