import { ChangeEventHandler } from "react";
import { CheckIcon } from "../../assets/smart-attorney-figma/global";

interface InputFieldProps {
	id?: string;
	name: string;
	type: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}
function InputField(props: InputFieldProps) {
	const { id, name, type, onChange } = props;
	return (
		<div className="flex flex-col">
			<label className="text-2xl text-white" htmlFor={name}>
				{name}
			</label>
			<div className="flex flex-row items-center gap-4">
				<input className="h-8 rounded-md min-w-[300px]" id={id} type={type} onChange={onChange} />
				<span className="">
					{/* placeholder img to help me position elements properly */}
					<img className="w-6 h-6" src={CheckIcon} />
				</span>
			</div>
		</div>
	);
}

export default InputField;
