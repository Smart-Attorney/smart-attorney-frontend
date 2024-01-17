import { useNavigate } from "react-router-dom";
import SmartAttorneyLogo from "../assets/smart-attorney-figma/typeface-white-v1.png";
import PageBody from "../layouts/PageBody";
import InputField from "../features/register/InputField";
import TermsOfService from "../features/register/TermsOfService";

function Register() {
	const navigate = useNavigate();

	const handleRegistration = () => {
		navigate("/signin");
	};

	return (
		<PageBody>
			<div className="pt-8 pl-14">
				<img className="h-12" src={SmartAttorneyLogo} />
			</div>

			<div className="flex justify-center py-10">
				<h1 className="text-3xl text-white">Get Started</h1>
			</div>

			<div className="flex justify-center py-10">
				{/* Input Fields Grid Layout */}
				<div className="grid grid-cols-2 grid-rows-3 gap-y-7 gap-x-16">
					<InputField name="First Name" type="text" />
					<InputField name="Last Name" type="text" />
					<InputField name="Firm Name" type="text" />
					<InputField name="Company Email" type="email" />
					<InputField name="Password" type="password" />
					<InputField name="Re-enter Password" type="password" />
				</div>
			</div>

			{/* Terms of Service */}
			<div className="flex flex-col items-center py-10">
				<TermsOfService />
			</div>

			<div className="flex flex-col items-center py-10">
				<button
					className="h-12 bg-white border-2 border-white rounded-lg w-96"
					type="button"
					onClick={handleRegistration}
				>
					<span className="text-xl text-black">Register</span>
				</button>
			</div>
		</PageBody>
	);
}

export default Register;
