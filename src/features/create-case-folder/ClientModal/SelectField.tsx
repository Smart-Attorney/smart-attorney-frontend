interface SelectFieldProps {
	name: string;
	options: string[];
}

function SelectField({ name, options }: SelectFieldProps) {
	const optionsElements = options.map((option) => {
		return (
			<option className="text-base" value={option}>
				{option}
			</option>
		);
	});

	return (
		<div className="flex flex-col gap-1 w-60">
			<label htmlFor={name} className="text-white">
				{name}
			</label>
			<select id={name} className="h-8 px-2 text-sm rounded">
				<option value="" className="text-base">
					-- Select --
				</option>
				{optionsElements}
			</select>
		</div>
	);
}

export default SelectField;
