import SidebarLayout from "../layouts/SidebarLayout";

function Test() {
	return (
		<SidebarLayout>
			<div className="flex flex-col items-center justify-center h-full gap-5">
				<h1 className="text-2xl text-white">You weren't supposed to find this page.</h1>
				<p className="text-white">This place is used for testing.</p>
				<p className="text-white">
					You could poke around if you'd like but there's nothing for you, the user, to do here.
				</p>
			</div>
		</SidebarLayout>
	);
}

export default Test;
