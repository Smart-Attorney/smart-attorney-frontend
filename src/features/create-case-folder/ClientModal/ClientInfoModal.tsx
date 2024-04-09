import { useEffect, useRef, useState } from "react";
import { UploadPurple } from "../../../assets/smart-attorney-figma/buttons";
import { UserIcon } from "../../../assets/smart-attorney-figma/global";
import ModalButton from "../../../components/Buttons/ModalButton";
import PillSpecialButton from "../../../components/Buttons/PillSpecialButton";
import ModalDialog from "../../../components/Modal/ModalDialog";
import { COUNTRIES } from "../../../utils/constants/countries";
import { LANGUAGES } from "../../../utils/constants/languages";
import { SEX } from "../../../utils/constants/sex";
import InputField from "./InputField";
import SelectField from "./SelectField";

export interface ClientInfoForm {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	sex: string;
	countryOfCitizenship: string;
	primaryLanguage: string;
}

interface ClientInfoModalProps {
	client: ClientInfoForm;
	setClient: React.Dispatch<React.SetStateAction<ClientInfoForm>>;
	closeModal: () => void;
	createCase: () => void;
}

function ClientInfoModal({ client, setClient, closeModal, createCase }: ClientInfoModalProps) {
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		setClientForm(client);
	}, []);

	const [clientForm, setClientForm] = useState<ClientInfoForm>({
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		sex: "",
		countryOfCitizenship: "",
		primaryLanguage: "",
	});

	const [disableCreateButton, setDisableCreateButton] = useState(false);

	const handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
		const { id, value } = event.target as HTMLInputElement;
		setClientForm((prev) => ({ ...prev, [id]: value }));
	};

	const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const { id, value } = event.target as HTMLSelectElement;
		setClientForm((prev) => ({ ...prev, [id]: value }));
	};

	// allows user to exit out of the client modal before filling it out
	// saves any input that user has already provided
	const handleCloseIconClick = () => {
		setClient(clientForm);
		closeModal();
	};

	const handleCreateButtonClick = () => {
		const clientInfoFilled = formRef.current?.checkValidity();
		setClient(clientForm);
		if (!clientInfoFilled) {
			formRef.current?.reportValidity();
			return;
		}
		// prevents repeated clicks of the create button which results in duplicate folders
		setDisableCreateButton(true);
		createCase();
	};

	return (
		<ModalDialog className="w-[832px]" closeModal={closeModal} enableBackdropClose={false}>
			{/* Close symbol "x" */}
			<span className="cursor-pointer relative -mb-4 text-white left-[380px] bottom-8" onClick={handleCloseIconClick}>
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
							<p className="text-xs text-white">
								Manually input your client's information or upload an ID for to be analyzed.
							</p>
						</div>
						<PillSpecialButton name="Upload" type="button" img={UploadPurple} />
					</div>

					{/* This div contains and formats the form input elements. */}
					<form id="form" ref={formRef} className="flex flex-col gap-8">
						<div className="grid grid-cols-2 gap-x-20 gap-y-4">
							<InputField
								id="firstName"
								name="First Name"
								type="text"
								value={clientForm.firstName}
								onChange={handleInputChange}
							/>
							<InputField
								id="lastName"
								name="Last Name"
								type="text"
								value={clientForm.lastName}
								onChange={handleInputChange}
							/>
							<InputField
								id="dateOfBirth"
								name="Date of Birth"
								type="date"
								value={clientForm.dateOfBirth}
								onChange={handleInputChange}
							/>
							<SelectField id="sex" name="Sex" options={SEX} value={clientForm.sex} onChange={handleSelectChange} />
							<SelectField
								id="countryOfCitizenship"
								name="Country of Citizenship"
								options={COUNTRIES}
								value={clientForm.countryOfCitizenship}
								onChange={handleSelectChange}
							/>
							<SelectField
								id="primaryLanguage"
								name="Primary Language"
								options={LANGUAGES}
								value={clientForm.primaryLanguage}
								onChange={handleSelectChange}
							/>
						</div>

						{/* POTENTIAL FUTURE FEATURE
						button/option to show additional input field
					  user decides label of new input */}

						{/* This is button. */}
						<ModalButton
							title="Click Save to create the case folder"
							name="Save"
							type="button"
							disabled={disableCreateButton}
							className="h-[52px] border-[3px]"
							onClick={handleCreateButtonClick}
						/>
					</form>
				</div>
			</div>
		</ModalDialog>
	);
}

export default ClientInfoModal;
