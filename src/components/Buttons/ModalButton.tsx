import { ButtonProps } from "../../types/button";

function ModalButton({ title, name, type, className, style, isDisabled, onClick }: Partial<ButtonProps>) {
	return (
		<button
			title={title}
			name={name}
			type={type}
			className={`${className} w-full rounded-xl border-solid border-[#3141e4] bg-[#2a2c84]`}
			style={style}
			disabled={isDisabled}
			onClick={onClick}
		>
			<span className="text-xl font-semibold text-white">{name}</span>
		</button>
	);
}

export default ModalButton;
