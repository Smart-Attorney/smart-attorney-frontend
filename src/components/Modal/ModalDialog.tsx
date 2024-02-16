import { useEffect, useRef } from "react";

interface ModalDialogProps {
	children: React.ReactNode;
	className?: string;
	closeModal: (event?: React.MouseEvent<HTMLDivElement>) => void;
	enableBackdropClose: boolean;
}

function ModalDialog({ children, className, closeModal, enableBackdropClose }: ModalDialogProps) {
	const modalRef = useRef<HTMLDivElement | null>(null);

	// Adds an scroll listener to the mouse when modal mounts.
	// Removes scroll listener when modal unmounts.
	useEffect(() => {
		modalRef.current?.addEventListener("wheel", handlePreventScroll, { passive: false });
		return () => {
			modalRef.current?.removeEventListener("wheel", handlePreventScroll);
		};
	}, []);

	// Stops the user from using the scroll wheel.
	const handlePreventScroll = (event: { preventDefault: () => void }) => {
		event.preventDefault();
	};

	const handleModalBackdropClickToClose = (event: React.MouseEvent<HTMLDivElement>): void => {
		if (!enableBackdropClose) return;
		const { id } = event.target as HTMLDivElement;
		if (id === "modal-backdrop") {
			closeModal();
		}
	};

	return (
		<div
			id="modal-backdrop"
			className="bg-[#00000040] justify-center flex items-center backdrop-blur-[2px] fixed h-screen top-0 w-[calc(100%-80px)] overflow-hidden"
			ref={modalRef}
			onClick={(event) => handleModalBackdropClickToClose(event)}
		>
			<div
				id="modal-container"
				className={`${className} border border-[#9C9DA4] rounded-[32px] py-14 h-fit bg-gradient-custom flex flex-col items-center justify-center`}
			>
				{children}
			</div>
		</div>
	);
}

export default ModalDialog;
