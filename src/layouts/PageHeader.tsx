interface PageHeaderProps {
	children: React.ReactNode;
}

function PageHeader({ children }: PageHeaderProps) {
	return (
		<div className="flex justify-start pl-20 w-full py-[52px] h-fit">
			<div className="flex flex-row items-center gap-2 w-fit">{children}</div>
		</div>
	);
}

export default PageHeader;
