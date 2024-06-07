import { useEffect, useState } from "react";
import { UserIcon } from "../../../assets/smart-attorney-figma/global";
import ModalButton from "../../../components/Buttons/ModalButton";
import ModalDialog from "../../../components/Modal/ModalDialog";
import { COUNTRIES } from "../../../utils/constants/countries";
import { LANGUAGES } from "../../../utils/constants/languages";
import { SEX } from "../../../utils/constants/sex";
import InputField from "./InputField";
import SelectField from "./SelectField";

export interface ClientInfoForm {
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: string;
	sex: string;
	countryOfCitizenship: string;
	primaryLanguage: string;
}

interface ClientInfoModalProps {
	client: ClientInfoForm;
	closeModal: () => void;
}

function ClientModal({ client, closeModal }: ClientInfoModalProps) {
	useEffect(() => {
		setClientForm(client);
	}, []);

	const [clientForm, setClientForm] = useState<ClientInfoForm>({
		firstName: "",
		middleName: "",
		lastName: "",
		dateOfBirth: "",
		sex: "",
		countryOfCitizenship: "",
		primaryLanguage: "",
	});

	const handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
		const { id, value } = event.target as HTMLInputElement;
		setClientForm((prev) => ({ ...prev, [id]: value }));
	};

	const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const { id, value } = event.target as HTMLSelectElement;
		setClientForm((prev) => ({ ...prev, [id]: value }));
	};

	const handleSave = (event: React.FormEvent) => {
		event.preventDefault();
		closeModal();
	};

	return (
		<ModalDialog className="w-[832px]" closeModal={closeModal} enableBackdropClose={true}>
			{/* Close symbol "x" */}
			<span className="cursor-pointer relative -mb-4 text-white left-[380px] bottom-8" onClick={closeModal}>
				&#x2715;
			</span>

			{/* Outer most div contains all of the contents of modal body. */}
			<div id="modal-body" className="flex flex-row justify-between w-full pl-10 pr-14">
				{/* This div contains the icon on the left side. */}
				<div id="left-side">
					<span>
						<img className="w-[134px] relative bottom-2" src={UserIcon} />
					</span>
				</div>

				{/* This div contains the header, form, and button of the right side. */}
				<div id="right-side" className="flex flex-col justify-center gap-8">
					{/* This div contains the header, subtext, and upload button. */}
					<div id="header" className="flex flex-row items-center justify-between">
						<div>
							<h1 className="text-lg text-white">Client Info</h1>
						</div>
					</div>

					{/* This div contains and formats the form input elements. */}
					<form id="form" className="flex flex-col gap-8" onSubmit={handleSave}>
						<div className="grid grid-cols-2 gap-x-20 gap-y-4">
							<InputField
								id="firstName"
								name="First Name"
								type="text"
								value={clientForm.firstName}
								onChange={handleInputChange}
							/>

							<SelectField id="sex" name="Sex" options={SEX} value={clientForm.sex} onChange={handleSelectChange} />

							<InputField
								id="middleName"
								name="Middle Name"
								type="text"
								value={clientForm.middleName}
								onChange={handleInputChange}
							/>

							<SelectField
								id="countryOfCitizenship"
								name="Country of Citizenship"
								options={COUNTRIES}
								value={clientForm.countryOfCitizenship}
								onChange={handleSelectChange}
							/>

							<InputField
								id="lastName"
								name="Last Name"
								type="text"
								value={clientForm.lastName}
								onChange={handleInputChange}
							/>

							<SelectField
								id="primaryLanguage"
								name="Primary Language"
								options={LANGUAGES}
								value={clientForm.primaryLanguage}
								onChange={handleSelectChange}
							/>

							<InputField
								id="dateOfBirth"
								name="Date of Birth"
								type="date"
								value={clientForm.dateOfBirth}
								onChange={handleInputChange}
							/>
						</div>
						{/* This is button. */}
						<ModalButton name="Close" type="button" className="h-[52px] border-[3px]" onClick={closeModal} />
					</form>
				</div>
			</div>
		</ModalDialog>
	);
}

export default ClientModal;
