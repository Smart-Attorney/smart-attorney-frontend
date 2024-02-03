import ModalDialog from "../../components/Modal/ModalDialog";
import { UserIcon } from "../../assets/smart-attorney-figma/global"
import ModalButton from "../../components/Buttons/ModalButton";


interface ClientModalInputProps {
    name: string;
    type: string;
}

function ClientModalInput({ name, type }: ClientModalInputProps) {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="text-white">{name}</label>
            <input id={name} type={type} className="rounded"/>    
        </div>
    )
}

interface ClientInfoModalProps {
    closeModal: () => void;
}

function ClientInfoModal({closeModal}: ClientInfoModalProps) {

    function handleSave () {
        closeModal();
    }
    return (<ModalDialog closeModal={closeModal} enableBackdropClose={false}>
        {/* Outer most div contains all of the contents of modal body. */}
        <div id="modal-body" className="flex flex-row justify-between w-full px-16">
            
            {/* This div contains the icon on the left side. */}
            <div id="left-side" className="">
                <span className="">
                    <img className="w-[134px]" src={UserIcon}/>
                </span>
            </div>

            {/* This div contains the header, form, and button of the right side. */}
            <div id="right-side" className="flex flex-col justify-center gap-8">

                {/* This div contains the header and the text. */}
                <div id="header" className="">
                    <h1 className="text-lg text-white">Client Info</h1>
                    <p className="text-xs text-white">Manually input your client’s information or upload an ID for to be analyzed.</p>
                </div>

                {/* This div contains and formats the form input elements. */}
                <div id="form" className="grid grid-cols-2 gap-x-16 gap-y-4">
                    <ClientModalInput name="First Name" type="text"/>
                    <ClientModalInput name="Last Name" type="text"/>
                    <ClientModalInput name="Date of Birth" type="text"/>
                    <ClientModalInput name="Sex" type="text"/>
                    <ClientModalInput name="Country of Citizenship" type="text"/>
                    <ClientModalInput name="Primary Language" type="text" />
                    {/* FOR FUTURE FEATURE: */}
                    {/* button/option to show additional input field */}
                    {/* user decides label of new input */}
                </div>

                {/* This is button. */}
                <ModalButton name="Save" onClick={handleSave}/>
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

    </ModalDialog>)
}

export default ClientInfoModal