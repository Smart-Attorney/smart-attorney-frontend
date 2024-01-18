import Sidebar from "../components/Sidebar/Sidebar";
import StyledBackground from "./StyledBackground";

interface SidebarLayoutProps {
	children: React.ReactNode;
}

function SidebarLayout(props: SidebarLayoutProps) {
	return (
		<div className="flex flex-row">
			<Sidebar />
			<StyledBackground>{props.children}</StyledBackground>
		</div>
	);
}

export default SidebarLayout;
