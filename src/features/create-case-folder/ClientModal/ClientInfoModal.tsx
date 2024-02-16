import { useRef } from "react";
import { UploadPurple } from "../../../assets/smart-attorney-figma/buttons";
import { UserIcon } from "../../../assets/smart-attorney-figma/global";
import ModalButton from "../../../components/Buttons/ModalButton";
import PillSpecialButton from "../../../components/Buttons/PillSpecialButton";
import ModalDialog from "../../../components/Modal/ModalDialog";
import { COUNTRIES } from "../../../utils/constants/countries";
import { LANGUAGES } from "../../../utils/constants/languages";
import { SEX } from "../../../utils/constants/sex";
import { ClientInfoObj, SexOptions } from "../../../utils/types";
import InputField from "./InputField";
import SelectField from "./SelectField";

interface ClientInfoModalProps {
	closeModal: () => void;
}

function ClientInfoModal({ closeModal }: ClientInfoModalProps) {
	/* Maintains consistency between switch case names and input field names. */
	const FORM = {
		FIRST_NAME: "First Name",
		LAST_NAME: "Last Name",
		BIRTHDAY: "Date of Birth",
		SEX: "Sex",
		COUNTRY: "Country of Citizenship",
		LANGUAGE: "Primary Language",
	};

	const firstName = useRef("");
	const lastName = useRef("");
	const sex = useRef<SexOptions | null>(null);
	const language = useRef("");
	const country = useRef("");
	const birthday = useRef("");

	const handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
		const { name, value } = event.target as HTMLInputElement;
		switch (name) {
			case FORM.FIRST_NAME:
				firstName.current = value;
				break;
			case FORM.LAST_NAME:
				lastName.current = value;
				break;
			case FORM.BIRTHDAY:
				birthday.current = value;
				break;
			default:
				break;
		}
	};

	const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const { name, value } = event.target as HTMLSelectElement;
		switch (name) {
			case FORM.SEX:
				sex.current = value as unknown as SexOptions;
				break;
			case FORM.COUNTRY:
				country.current = value;
				break;
			case FORM.LANGUAGE:
				language.current = value;
				break;
			default:
				break;
		}
	};

	const handleSave = () => {
		const clientInfoForm: ClientInfoObj = {
			firstName: firstName.current,
			lastName: lastName.current,
			dateOfBirth: birthday.current,
			sex: sex.current,
			countryOfCitizenship: country.current,
			primaryLanguage: language.current,
		};

		closeModal();
		// console.log(clientInfoForm);
		return clientInfoForm; // returns form info to parent
	};

	return (
		<ModalDialog className="w-[832px]" closeModal={closeModal} enableBackdropClose={false}>
			{/* Close symbol "x" */}
			<span className="cursor-pointer relative -mb-4 text-white left-[380px] bottom-8" onClick={closeModal}>
				&#x2715;
			</span>

			{/* Outer most div contains all of the contents of modal body. */}
			<div id="modal-body" className="flex flex-row justify-between w-full pl-10 pr-14">
				{/* This div contains the icon on the left side. */}
				<div id="left-side" className="">
					<span className="">
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
					<form id="form" className="grid grid-cols-2 gap-x-20 gap-y-4">
						<InputField name={FORM.FIRST_NAME} type="text" onChange={handleInputChange} />
						<InputField name={FORM.LAST_NAME} type="text" onChange={handleInputChange} />
						<InputField name={FORM.BIRTHDAY} type="date" onChange={handleInputChange} />
						<SelectField name={FORM.SEX} options={SEX} onChange={handleSelectChange} />
						<SelectField name={FORM.COUNTRY} options={COUNTRIES} onChange={handleSelectChange} />
						<SelectField name={FORM.LANGUAGE} options={LANGUAGES} onChange={handleSelectChange} />

						{/* FOR FUTURE FEATURE: */}
						{/* button/option to show additional input field */}
						{/* user decides label of new input */}
					</form>

					{/* This is button. */}
					<ModalButton name="Save" type="button" className="h-[52px] border-[3px]" onClick={handleSave} />
				</div>
			</div>
		</ModalDialog>
	);
}

export default ClientInfoModal;

// <div id="modal-body" className="flex flex-col items-center justify-center gap-8 h-fit w-[624px] pb-4">
// 	<div className="topLeft">
// 		<img
// 			src={UserIcon}
// 			style={{
// 				top: "0",
// 				left: "0",
// 				width: "100px",
// 				height: "100px",
// 				zIndex: "1",
// 			}}
// 		/>
// 	</div>
// 	<div>
// 		<h1 className="text-white">bob</h1>
// 	</div>
// 	<div>
// 		<button onClick={handleSave}>
// 			<span className="text-white">Save</span>
// 		</button>
// 	</div>
// </div>;
