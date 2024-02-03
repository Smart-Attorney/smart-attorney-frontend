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

interface ClientInfoModalProps {
	closeModal: () => void;
}

function ClientInfoModal({ closeModal }: ClientInfoModalProps) {
	function handleSave() {
		closeModal();
	}

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
						<PillSpecialButton name="Upload" img={UploadPurple} />
					</div>

					{/* This div contains and formats the form input elements. */}
					<div id="form" className="grid grid-cols-2 gap-x-20 gap-y-4">
						<InputField name="First Name" type="text" />
						<InputField name="Last Name" type="text" />
						<InputField name="Date of Birth" type="date" />
						<SelectField name="Sex" options={SEX} />
						<SelectField name="Country of Citizenship" options={COUNTRIES} />
						<SelectField name="Primary Language" options={LANGUAGES} />

						{/* FOR FUTURE FEATURE: */}
						{/* button/option to show additional input field */}
						{/* user decides label of new input */}
					</div>

					{/* This is button. */}
					<ModalButton name="Save" className="h-[52px] border-[3px]" onClick={handleSave} />
				</div>
			</div>

			{/* <div id="modal-body" className="flex flex-col items-center justify-center gap-8 h-fit w-[624px] pb-4">
            <div className="topLeft">
                <img
                    src={UserIcon}
                    style={{
                        top: "0",
                        left: "0",
                        width: "100px",
                        height: "100px",
                        zIndex: "1", 
                    }}
                />
            </div>
            <div>
                <h1 className="text-white">
                    bob
                </h1>
            </div>
            <div>
                <button onClick={handleSave}>
                    <span className="text-white">Save</span>
                </button>
            </div>
        </div> */}
		</ModalDialog>
	);
}

export default ClientInfoModal;
