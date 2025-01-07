import { SmartAttorneyLogo } from "../assets/smart-attorney-figma/global";
import StyledBackground from "../layouts/StyledBackground";
import { signInUrl, signUpUrl } from "../services/aws/managed-login-endpoints";

function Home() {
	/************************************************************/

	/* TODO
     Figma wireframe does not give accurate linear gradient.
     Fix the style to match the wireframe background gradient.
  */
	const formBackgroundStyle = {
		background: "linear-gradient(180deg, #5E35FF 0%, rgba(217, 217, 217, 0) 100%)",
	};

	return (
		<StyledBackground>
			<div className="flex flex-col items-center py-20">
				<img className="h-32" src={SmartAttorneyLogo} />
			</div>

			<div className="flex flex-col items-center">
				<div className=" h-min w-[545px] rounded-3xl px-20 py-14 border border-[#302c7c]" style={formBackgroundStyle}>
					<div className="flex flex-col items-center w-full h-full gap-y-4">
						<div className="mb-14">
							<h1 className="text-4xl font-normal text-white ">Welcome back!</h1>
						</div>

						<a
							className="flex items-center justify-center w-full bg-white border-2 border-white rounded-lg hover:bg-slate-300 h-14"
							href={signInUrl}
							target="_self"
						>
							<span className="text-xl text-black">Sign in</span>
						</a>

						<p className="text-white">or</p>

						<a
							className="flex items-center justify-center w-full bg-transparent border-2 border-white rounded-lg hover:bg-indigo-700 h-14"
							href={signUpUrl}
							target="_self"
						>
							<span className="text-xl text-white">Create an account</span>
						</a>

						{/* <p className="text-white">or</p>

						<a
							className="flex items-center justify-center w-full bg-purple-700 border-2 border-white rounded-lg h-14 hover:bg-purple-500"
							href={signOutUrl}
							target="_self"
						>
							<span className="text-xl text-white">Logout</span>
						</a> */}
					</div>
				</div>
			</div>
		</StyledBackground>
	);
}

export default Home;
