import { useState, useContext } from "react";
import { postLogin } from "../../api";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginSuccessToast } from "@/Components/Molecules/Toasts/LoginSuccessToast";
import { AuthForm } from "@/Components/Organisms/AuthForm";
import { FormContainer } from "@/Components/Organisms/FormContainer";

export const PageLogin = () => {
	const [loginValues, setLoginValues] = useState({ email: "", password: "" });

	const navigate = useNavigate();

	const { storeToken, authenticateUser } = useContext(AuthContext);

	const handleLoginChange = (e: { target: { id: string; value: string } }): void => {
		setLoginValues((prev) => {
			return {
				...prev,
				[e.target.id]: e.target.value,
			};
		});
	};

	const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		postLogin(loginValues)
			.then((response) => {
				console.log("🚀 ~ .then ~ response:", response);
				storeToken(response.data.authToken);
				authenticateUser();
				toast.custom((t) => {
					return <LoginSuccessToast t={t} user={response.data.payload} />;
				});
				navigate("/explore");
			})
			.catch((error) => {
				toast.error(error.response.data.message);
				console.log(error);
			});
	};

	return (
		<FormContainer title="Discover the best recipes">
			<AuthForm handleSubmit={handleLoginSubmit} values={loginValues} handleChange={handleLoginChange} auth="login" />
		</FormContainer>
	);
};
