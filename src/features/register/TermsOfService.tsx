interface TermsOfServiceProps {
	tos: {
		termsOfService: boolean;
		privacyPolicy: boolean;
	};
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function TermsOfService({ tos, onChange }: TermsOfServiceProps) {
	return (
		<div className="flex flex-col gap-1">
			<p className="pb-4 text-2xl text-white ">
				Please accept the Terms of Service and Privacy Policy below to continue
			</p>

			<div className="flex flex-row gap-4">
				<input
					className="ml-1 cursor-pointer"
					id="box1"
					type="checkbox"
					name="termsOfService"
					checked={tos.termsOfService}
					onChange={onChange}
				/>
				<label className="text-2xl text-white cursor-pointer" htmlFor="box1">
					I accept the terms of service and privacy policy
				</label>
			</div>

			<div className="flex flex-row gap-4 ">
				<input
					className="ml-1 cursor-pointer"
					id="box2"
					type="checkbox"
					name="privacyPolicy"
					checked={tos.privacyPolicy}
					onChange={onChange}
				/>
				<label className="text-2xl text-white cursor-pointer" htmlFor="box2">
					I confirm that I am a licensed legal professional
				</label>
			</div>
		</div>
	);
}

export default TermsOfService;
