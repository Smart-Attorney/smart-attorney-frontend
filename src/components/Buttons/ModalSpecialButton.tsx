import { ButtonProps } from "../../utils/types";

function ModalSpecialButton(props: ButtonProps) {
	const { name, type, className, onClick, disabled, style } = props;

	return (
		<button
			name={name}
			type={type}
			disabled={disabled}
			style={style}
			className={`${className} modal-special-btn-border border-[5px] border-transparent h-[72px] w-full flex items-center justify-center rounded-xl`}
			onClick={onClick}
		>
			<span className="text-xl font-semibold text-white">{name}</span>
		</button>
	);
}

export default ModalSpecialButton;
