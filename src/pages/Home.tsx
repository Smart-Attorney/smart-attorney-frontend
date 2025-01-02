import { useAuth } from "react-oidc-context";
import { SmartAttorneyLogo } from "../assets/smart-attorney-figma/global";
import StyledBackground from "../layouts/StyledBackground";

function Home() {
  const auth = useAuth();

	/************************************************************/

  const signInRedirect = "";
  const signUpRedirect = "";

	const signInUrl =
		`https://us-east-2rzbg9wm8w.auth.us-east-2.amazoncognito.com/login?client_id=lkfl0igiketrigb6pk7r4di9f&redirect_uri=https%3A%2F%2Fsmartattorney.netlify.app%2Fdashboard&response_type=token&scope=email+openid+phone`;

	const createAnAccountUrl =
		`https://us-east-2rzbg9wm8w.auth.us-east-2.amazoncognito.com/signup?client_id=lkfl0igiketrigb6pk7r4di9f&redirect_uri=https%3A%2F%2Fsmartattorney.netlify.app%2Fdashboard&response_type=token&scope=email+openid+phone`;

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

						<a
							className="w-full mb-4 text-xl/[3.5rem] text-center bg-white rounded-lg font h-14 hover:bg-slate-300"
							href={signInUrl}
						>
							Sign in
						</a>

						<p className="mb-4 text-white">or</p>

						<a
							className="w-full text-xl/[3.5rem] text-center text-white border-2 border-white rounded-lg h-14 hover:bg-indigo-700"
							href={createAnAccountUrl}
						>
							Create an account
						</a>
					</div>
				</div>
			</div>
		</StyledBackground>
	);
}

export default Home;
