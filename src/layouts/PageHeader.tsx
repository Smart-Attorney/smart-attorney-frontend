import SignedInUser from "../components/User/SignedInUser";

interface PageHeaderProps {
	children: React.ReactNode;
	className?: string;
}

function PageHeader({ children, className }: PageHeaderProps) {
	return (
		<>
			<SignedInUser />
			<div className="flex justify-start w-full pl-20 h-[152px]">
				<div className={`${className} flex flex-row items-center w-fit`}>{children}</div>
			</div>
		</>
	);
}

export default PageHeader;
