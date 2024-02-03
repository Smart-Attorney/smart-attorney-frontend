interface SelectFieldProps {
	name: string;
	options: string[];
	onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
}

function SelectField({ name, options, onChange }: SelectFieldProps) {
	const optionsElements = options.map((option, index) => {
		return (
			<option className="text-base" key={index} value={option}>
				{option}
			</option>
		);
	});

	return (
		<div className="flex flex-col gap-1 w-60">
			<label htmlFor={name} className="text-white">
				{name}
			</label>
			<select
				id={name}
				name={name}
				className="h-8 px-2 overflow-hidden text-base rounded whitespace-nowrap text-ellipsis"
				onChange={onChange}
			>
				<option value="" className="text-base">
					-- Select --
				</option>
				{optionsElements}
			</select>
		</div>
	);
}

export default SelectField;
