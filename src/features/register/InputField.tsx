import GreenCheckCircle from "../../assets/smart-attorney-figma/tick-green-circle.png";

interface InputFieldProps {
	name: string;
	type: string;
}
function InputField(props: InputFieldProps) {
	const { name, type } = props;
	return (
		<div className="flex flex-col">
			<label className="text-2xl text-white" htmlFor={name}>
				{name}
			</label>
			<div className="flex flex-row items-center gap-4">
				<input className="h-8 rounded-md min-w-[300px]" id={name} type={type} />
				<span className="">
					{/* placeholder img to help me position elements properly */}
					<img className="w-6 h-6" src={GreenCheckCircle} />
				</span>
			</div>
		</div>
	);
}

export default InputField;
