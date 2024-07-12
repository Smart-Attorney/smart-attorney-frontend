import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as BtnIcon from "../assets/smart-attorney-figma/buttons";
import { UserIcon } from "../assets/smart-attorney-figma/global";
import PillButton from "../components/Buttons/PillButton";
import PillSpecialButton from "../components/Buttons/PillSpecialButton";
import SearchBar from "../components/SearchBar/SearchBar";
import SortBar from "../components/SortBar/SortBar";
import DocumentCards from "../features/case-folder/DocumentCards";
import ViewDocumentModal from "../features/case-folder/ViewDocumentModal";
import GenerateModal from "../features/case-folder/ai-generate/GenerateModal";
import { getCase } from "../features/case-folder/api/get-case";
import { getClient } from "../features/case-folder/api/get-client";
import { getDocument } from "../features/case-folder/api/get-document";
import {
	updateCaseLastOpenedDate,
	UpdateCaseLastOpenedDateDTO,
} from "../features/case-folder/api/update-case-last-opened-date";
import { updateCaseName, UpdateCaseNameDTO } from "../features/case-folder/api/update-case-name";
import ClientModal from "../features/case-folder/client-modal/ClientModal";
import UploadModal from "../features/case-folder/file-upload/UploadModal";
import PageHeader from "../layouts/PageHeader";
import SidebarLayout from "../layouts/SidebarLayout";
import SortBarWithButtons from "../layouts/SortBarWithButtons";
import { ClientObj, DashboardCaseCardObj, DocumentObj } from "../types/api";
import { CASE_FOLDER } from "../utils/constants/sort-options";
import { DateUtils } from "../utils/date-utils";

function CaseFolder() {
	const navigate = useNavigate();

	const { id: idFromParams } = useParams();
	const caseId = useRef(idFromParams);

	const documentId = useRef<string>("");
	const documentName = useRef<string>("");
	const documentUrl = useRef<string>("");

	const caseNameRef = useRef<HTMLHeadingElement>(null);
	const newCaseName = useRef<string>("");
	const [isCaseNameEditable, setIsCaseNameEditable] = useState<boolean>(false);

	const [isClientModalOpen, setIsClientModalOpen] = useState<boolean>(false);
	const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
	const [isDocumentModalOpen, setIsDocumentModalOpen] = useState<boolean>(false);
	const [isGenerateModalOpen, setIsGenerateModalOpen] = useState<boolean>(false);

	const [caseFolder, setCaseFolder] = useState<DashboardCaseCardObj>({
		id: "",
		name: "",
		createdDate: 0,
		lastOpenedDate: 0,
		isOpen: true,
		urgentDocumentDeadline: 0,
		labels: [],
		documents: [],
	});

	const [client, setClient] = useState<ClientObj>({
		id: "",
		firstName: "",
		middleName: "",
		lastName: "",
		sex: "Other",
		primaryLanguage: "",
		countryOfCitizenship: "",
		dateOfBirth: 0,
	});

	useEffect(() => {
		if (isCaseNameEditable) {
			caseNameRef.current?.focus();
		}
	}, [isCaseNameEditable]);

	useEffect(() => {
		if (caseId.current === undefined) {
			navigate("/404");
			return;
		}
		handleGetCase();
		handleGetClient();
		return () => {
			handleUpdateCaseLastOpenedDate();
		};
	}, []);

	/************************************************************/

	const handleGetCase = async () => {
		try {
			const response = await getCase(caseId.current!);
			if (response.ok) {
				const data: DashboardCaseCardObj = await response.json();
				setCaseFolder(data);
				newCaseName.current = data.name;
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleGetClient = async () => {
		try {
			const response = await getClient(caseId.current!);
			if (response.ok) {
				const data: ClientObj = await response.json();
				setClient(data);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleGetDocument = async (event: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
		const { id } = event.target as HTMLParagraphElement;
		try {
			const response = await getDocument(caseId.current!, id);
			if (response.ok) {
				const document: DocumentObj = await response.json();
				documentName.current = document.name;
				documentId.current = document.id;
				documentUrl.current = document.url;
				setIsDocumentModalOpen(true);
			}
		} catch (error) {
			alert(error);
		}
	};

	/************************************************************/

	const closeClientModal = (): void => {
		setIsClientModalOpen(false);
	};

	const toggleClientModal = (): void => {
		setIsClientModalOpen((prev) => !prev);
	};

	const closeGenerateModal = (): void => {
		setIsGenerateModalOpen(false);
	};

	const toggleGenerateModal = (): void => {
		setIsGenerateModalOpen((prev) => !prev);
	};

	const closeUploadModal = (): void => {
		setIsUploadModalOpen(false);
	};

	const toggleUploadModal = (): void => {
		setIsUploadModalOpen((prev) => !prev);
	};

	const closeViewDocumentModal = (): void => {
		setIsDocumentModalOpen(false);
	};

	/************************************************************/

	const handleUpdateCaseName = async (caseId: string, newCaseName: string) => {
		const data: UpdateCaseNameDTO = { id: caseId, name: newCaseName };
		try {
			const response = await updateCaseName(caseId, data);
			if (response.ok) {
				const data: DashboardCaseCardObj = await response.json();
				setCaseFolder(data);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleCaseNameClick = () => {
		setIsCaseNameEditable(true);
	};

	const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLHeadingElement>): void => {
		if (event.key !== "Enter") return;
		const { innerHTML } = event.target as HTMLHeadingElement;
		if (innerHTML.trim().length === 0) {
			document.getElementById("case-name")!.innerHTML = caseFolder.name;
		}
		caseNameRef.current?.blur();
	};

	const handleCaseNameBlur = (event: React.FocusEvent<HTMLHeadingElement>) => {
		const { innerHTML: newFolderName } = event.target;
		setIsCaseNameEditable(false);
		if (newFolderName === caseFolder.name) {
			return;
		}
		handleUpdateCaseName(caseId.current!, newFolderName);
	};

	/************************************************************/

	const handleUpdateCaseLastOpenedDate = async (): Promise<void> => {
		const data: UpdateCaseLastOpenedDateDTO = { id: caseId.current! };
		try {
			const response = await updateCaseLastOpenedDate(caseId.current!, data);
			if (response.ok) {
				// for the future, maybe add a toast or something to confirm successful update
			}
		} catch (error) {
			alert(error);
		}
	};

	/************************************************************/

	const addNewDocumentToArray = (newDocument: DocumentObj): void => {
		const updatedDocuments = [...caseFolder.documents, newDocument];
		setCaseFolder((prev) => ({ ...prev, documents: [...updatedDocuments] }));
	};

	const updateDocumentArray = (newDocuments: DocumentObj[]) => {
		setCaseFolder((prev) => ({ ...prev, documents: newDocuments }));
	};

	/************************************************************/

	return (
		<SidebarLayout>
			<PageHeader className="gap-4">
				<img
					className="h-[58px] cursor-pointer"
					title="Click to view client info"
					src={UserIcon}
					onClick={toggleClientModal}
				/>
				<h1
					id="case-name"
					className="text-3xl font-bold text-white cursor-pointer"
					title="Click to edit folder name"
					contentEditable={isCaseNameEditable}
					suppressContentEditableWarning={true}
					ref={caseNameRef}
					onClick={handleCaseNameClick}
					onBlur={handleCaseNameBlur}
					onKeyDown={handleEnterKeyPress}
				>
					{newCaseName.current}
				</h1>
			</PageHeader>

			<SearchBar cards={caseFolder.documents} />

			<SortBarWithButtons>
				<SortBar
					initialWidth={450}
					minWidth={1111}
					options={CASE_FOLDER}
					documentCards={caseFolder.documents}
					updateDocumentCards={updateDocumentArray}
				/>

				<div className="flex flex-row flex-wrap justify-end gap-3 w-fit">
					<PillButton name="Create" type="button" img={BtnIcon.PenPurple} />
					<PillButton name="Upload" type="button" img={BtnIcon.UploadPurple} onClick={toggleUploadModal} />
					<PillButton name="Translate" type="button" img={BtnIcon.SphereLatticePurple} />
					<PillSpecialButton
						name="Generate"
						type="button"
						img={BtnIcon.LightBulbPurple}
						onClick={toggleGenerateModal}
					/>

					{/* <PillButton name="Save" type="button" img={BtnIcon.SavePurple} onClick={handleSaveChanges} /> */}
				</div>
			</SortBarWithButtons>

			<DocumentCards
				documents={caseFolder.documents}
				onClick={(event) => handleGetDocument(event)}
				updateDocuments={updateDocumentArray}
			/>

			{isUploadModalOpen && (
				<UploadModal
					caseId={idFromParams!}
					closeUploadModal={closeUploadModal}
					addNewDocumentToArray={addNewDocumentToArray}
				/>
			)}

			{isDocumentModalOpen && (
				<ViewDocumentModal
					documentName={documentName.current}
					documentId={documentId.current}
					documentUrl={documentUrl.current}
					closeModal={closeViewDocumentModal}
				/>
			)}

			{isGenerateModalOpen && <GenerateModal closeModal={closeGenerateModal} documents={caseFolder.documents} />}

			{isClientModalOpen && (
				<ClientModal
					client={{
						firstName: client.firstName,
						middleName: client.middleName,
						lastName: client.lastName,
						dateOfBirth: DateUtils.formatToYMD(client.dateOfBirth),
						sex: client.sex!,
						countryOfCitizenship: client.countryOfCitizenship,
						primaryLanguage: client.primaryLanguage,
					}}
					closeModal={closeClientModal}
				/>
			)}
		</SidebarLayout>
	);
}

export default CaseFolder;
