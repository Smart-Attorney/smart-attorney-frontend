import { SmartAttorneyLogo } from "../assets/smart-attorney-figma/global";
import { cognitoAuthConfig } from "../config/aws-cognito";
import StyledBackground from "../layouts/StyledBackground";

function Home() {
	const isDevEnv = import.meta.env.DEV;
	const { cognito_domain, client_id, response_type, scope, redirect_uri_local, redirect_uri_hosted } =
		cognitoAuthConfig;
	const redirectUri = isDevEnv ? redirect_uri_local : redirect_uri_hosted;

	/************************************************************/

	const signInRedirect = () => {
		window.location.href =
			`${cognito_domain}` +
			`/login` +
			`?client_id=${client_id}` +
			`&response_type=${response_type}` +
			`&scope=${scope}` +
			`&redirect_uri=${encodeURIComponent(redirectUri)}`;
	};

	const signUpRedirect = () => {
		window.location.href =
			`${cognito_domain}` +
			`/signup` +
			`?client_id=${client_id}` +
			`&response_type=${response_type}` +
			`&scope=${scope}` +
			`&redirect_uri=${encodeURIComponent(redirectUri)}`;
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
							className="w-full border-2 border-white rounded-lg h-14 hover:bg-indigo-700"
							type="button"
							onClick={signUpRedirect}
						>
							<span className="text-xl text-white">Create an account</span>
						</button>
					</div>
				</div>
			</div>
		</StyledBackground>
	);
}

export default Home;
