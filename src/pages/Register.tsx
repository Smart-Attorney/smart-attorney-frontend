import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SmartAttorneyLogo } from "../assets/smart-attorney-figma/global";
import InputField from "../features/register/InputField";
import TermsOfService from "../features/register/TermsOfService";
import { RegisterCredentialsDTO, registerNewUser } from "../features/register/api/register";
import StyledBackground from "../layouts/StyledBackground";

// keep these consistent with credentials object property names
const INPUT = Object.freeze({
	FIRST_NAME: "firstName",
	LAST_NAME: "lastName",
	FIRM_NAME: "firmName",
	COMPANY_EMAIL: "companyEmail",
	PASSWORD: "password",
	CONFIRM_PASSWORD: "confirmPassword",
});

function Register() {
	const navigate = useNavigate();

	const [user, setUser] = useState<RegisterCredentialsDTO>({
		firstName: "",
		lastName: "",
		firmName: "",
		companyEmail: "",
		password: "",
	});

	const [confirmPassword, setConfirmPassword] = useState({ confirmPassword: "" });

	const [tos, setTos] = useState({
		termsOfService: false,
		privacyPolicy: false,
	});

	/************************************************************/

	const handleRegistration = async () => {
		// temp: checks whether password and confirm-password match
		if (user.password !== confirmPassword.confirmPassword) {
			alert("Passwords do not match.");
			return;
		}

		const fNameBlank = user.firstName.trim().length === 0;
		const lNameBlank = user.lastName.trim().length === 0;
		const firmNameBlank = user.firmName.trim().length === 0;
		const emailBlank = user.companyEmail.trim().length === 0;
		const passwordBlank = user.password.trim().length === 0;

		if (fNameBlank || lNameBlank || firmNameBlank || emailBlank || passwordBlank) {
			alert("Please fill out all fields.");
			return;
		}

		if (!tos.termsOfService || !tos.privacyPolicy) {
			alert("Please accept the terms of service and privacy policy.");
			return;
		}

		// sending "user" state object also includes the "confirmPassword" field despite that field not being a property of "user"
		// create newUser object to circumvent the bug described above
		const newUser: RegisterCredentialsDTO = {
			firstName: user.firstName,
			lastName: user.lastName,
			firmName: user.firmName,
			companyEmail: user.companyEmail,
			password: user.password,
		};

		try {
			const response = await registerNewUser(newUser);
			if (response.ok) {
				navigate("/signin");
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target;
		if (id === INPUT.CONFIRM_PASSWORD) {
			setConfirmPassword((prev) => ({ ...prev, [id]: value }));
		}
		setUser((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleToggleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		setTos((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	/************************************************************/

	return (
		<StyledBackground>
			<div className="pt-8 pl-14">
				<img className="h-12" src={SmartAttorneyLogo} />
			</div>

			<div className="flex justify-center py-10">
				<h1 className="text-3xl text-white">Get Started</h1>
			</div>

			<div className="flex justify-center py-10">
				{/* Input Fields Grid Layout */}
				<div className="grid grid-cols-2 grid-rows-3 gap-y-7 gap-x-16">
					<InputField
						id={INPUT.FIRST_NAME}
						name="First Name"
						type="text"
						onChange={(event) => handleInputChange(event)}
					/>
					<InputField
						id={INPUT.LAST_NAME}
						name="Last Name"
						type="text"
						onChange={(event) => handleInputChange(event)}
					/>
					<InputField
						id={INPUT.FIRM_NAME}
						name="Firm Name"
						type="text"
						onChange={(event) => handleInputChange(event)}
					/>
					<InputField
						id={INPUT.COMPANY_EMAIL}
						name="Company Email"
						type="email"
						onChange={(event) => handleInputChange(event)}
					/>
					<InputField
						id={INPUT.PASSWORD}
						name="Password"
						type="password"
						onChange={(event) => handleInputChange(event)}
					/>
					<InputField
						id={INPUT.CONFIRM_PASSWORD}
						name="Re-enter Password"
						type="password"
						onChange={(event) => handleInputChange(event)}
					/>
				</div>
			</div>

			{/* Terms of Service */}
			<div className="flex flex-col items-center py-10">
				<TermsOfService tos={tos} onChange={(event) => handleToggleCheckBox(event)} />
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
		</StyledBackground>
	);
}

export default Register;
