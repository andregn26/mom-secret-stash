/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { postSignup, postUpload } from "../../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { FormContainer } from "@/Components/Organisms/FormContainer";
import { AuthForm } from "@/Components/Organisms/AuthForm";

export const PageRegister = () => {
	const [registerValues, setRegisterValues] = useState({ firstName: "", lastName: "", email: "", password: "", checkPassword: "", aboutMe: "" });
	const [fileProfileImg, setFileProfileImg] = useState<any>(null);
	const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleSelectFileProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}
		setFileProfileImg(e.target.files[0]);
	};

	const handleRegisterChange = (e: { target: { id: string; value: string } }) => {
		setRegisterValues((prev) => {
			return {
				...prev,
				[e.target.id]: e.target.value,
			};
		});
	};

	const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsCreatingUser(true);
			const data = new FormData();
			data.append("my_file", fileProfileImg);
			const res = await postUpload(data);
			const profileImg = res.data.url;
			const { firstName, lastName, email, password, aboutMe } = registerValues;
			const createAccount = await postSignup({ firstName, lastName, email, password, profileImg, aboutMe });
			toast.success(createAccount.data.message);
			navigate("/login");
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message);
			} else {
				toast.error("Something went wrong!");
			}
		} finally {
			setIsCreatingUser(false);
		}
	};

	return (
		<div className="">
			<FormContainer title="Great! You're one step closer to find the best recipes">
				<AuthForm
					handleSelectFileProfileImg={handleSelectFileProfileImg}
					handleSubmit={handleRegisterSubmit}
					handleChange={handleRegisterChange}
					values={registerValues}
					auth="register"
					isLoading={isCreatingUser}
				/>
			</FormContainer>
		</div>
	);
};
