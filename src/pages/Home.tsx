import { SmartAttorneyLogo } from "../assets/smart-attorney-figma/global";
import StyledBackground from "../layouts/StyledBackground";
import { signInUrl, signOutUrl, signUpUrl } from "../services/aws/managed-login-endpoints";

function Home() {
	const signUpRedirect = () => {
		window.location.href = signUpUrl;
	};

	const signInRedirect = () => {
		window.location.href = signInUrl;
	};

	const signOutRedirect = () => {
		window.location.href = signOutUrl;
	};

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
					<div className="flex flex-col items-center w-full h-full">
						<div className="mb-14">
							<h1 className="text-4xl font-normal text-white ">Welcome back!</h1>
						</div>

						<button
							className="w-full mb-4 bg-white rounded-lg h-14 hover:bg-slate-300"
							type="button"
							onClick={signInRedirect}
						>
							<span className="text-xl">Sign in</span>
						</button>

						<p className="mb-4 text-white">or</p>

						<button
							className="w-full mb-4 border-2 border-white rounded-lg h-14 hover:bg-indigo-700"
							type="button"
							onClick={signUpRedirect}
						>
							<span className="text-xl text-white">Create an account</span>
						</button>

						<p className="mb-4 text-white">or</p>

						<button
							className="w-full bg-purple-700 border-2 border-white rounded-lg h-14 hover:bg-purple-500"
							type="button"
							onClick={signOutRedirect}
						>
							<span className="text-xl text-white">Sign out</span>
						</button>
					</div>
				</div>
			</div>
		</StyledBackground>
	);
}

export default Home;
