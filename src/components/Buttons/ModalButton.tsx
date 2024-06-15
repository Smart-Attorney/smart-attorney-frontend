import { ButtonProps } from "../../utils/types";

function ModalButton(props: ButtonProps) {
	const { title, name, type, isDisabled, style, className, onClick } = props;

	return (
		<button
			title={title}
			name={name}
			type={type}
			disabled={isDisabled}
			style={style}
			className={`${className} w-full rounded-xl border-solid border-[#3141e4] bg-[#2a2c84]`}
			onClick={onClick}
		>
			<span className="text-xl font-semibold text-white">{name}</span>
		</button>
	);
}

export default ModalButton;
