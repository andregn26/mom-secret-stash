import { useState } from "react";
import { PreviewOpen, PreviewClose } from "@icon-park/react";
import { ButtonSubmit } from "../Atoms/ButtonSubmit";

type ValuesRegister = {
	email: string;
	password: string;
	checkPassword: string;
	firstName: string;
	lastName: string;
	aboutMe: string;
};
type ValuesLogin = {
	email: string;
	password: string;
};

type Props = {
	handleSubmit: (arg: React.FormEvent<HTMLFormElement>) => void;
	values: ValuesLogin | ValuesRegister;
	handleChange: (arg: { target: { id: string; value: string } }) => void;
	auth: "login" | "register";
	handleSelectFileProfileImg?: (arg: React.ChangeEvent<HTMLInputElement>) => void;
	isLoading?: boolean;
};

export const AuthForm = ({ handleSubmit, values, handleChange, auth, handleSelectFileProfileImg, isLoading }: Props) => {
	const [isSeePassword, setIsSeePassword] = useState(false);

	const seePassword = () => {
		setIsSeePassword((prev) => !prev);
	};
	return (
		<form onSubmit={(e) => handleSubmit(e)} className="py-8 text-base leading-6 space-y-4  sm:text-lg sm:leading-7 flex flex-col gap-2">
			{auth === "register" && (
				<div className="flex gap-4">
					{"firstName" in values && (
						<>
							<label className="form-control w-full">
								<div className="label">
									<span className="label-text">First name*</span>
								</div>
								<input className="input w-full" id="firstName" type="text" value={values.firstName} onChange={handleChange} />
							</label>
							{/* <InputText handleChange={handleChange} value={values.firstName} id="firstName" type="text" label="First name" /> */}
						</>
					)}
					{"lastName" in values && (
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">Last name*</span>
							</div>
							<input className="input w-full" id="lastName" type="text" value={values.lastName} onChange={handleChange} />
						</label>
					)}
				</div>
			)}
			<label className="form-control w-full">
				<div className="label">
					<span className="label-text">Email*</span>
				</div>
				<input required className="input w-full" id="email" type="email" value={values.email} onChange={handleChange} />
			</label>
			<div className="relative">
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Password*</span>
					</div>
					<input
						required
						className="input w-full"
						id="password"
						type={!isSeePassword ? "password" : "text"}
						value={values.password}
						onChange={handleChange}
					/>
				</label>
				<div className="absolute bottom-2.5 right-3 cursor-pointer" onClick={seePassword}>
					{isSeePassword ? (
						<PreviewClose className="text-neutral-content/40 hover:text-neutral-content/80" theme="outline" size="24" />
					) : (
						<PreviewOpen theme="outline" size="24" className="text-neutral-content/40 hover:text-neutral-content/80" />
					)}
				</div>
			</div>

			{auth === "register" && (
				<>
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text">Photo (optional)</span>
						</div>
						<input className="file-input   w-full " id="file" type="file" onChange={handleSelectFileProfileImg} multiple={false} />
					</label>
					{"aboutMe" in values && (
						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">About me (optional)</span>
							</div>

							<textarea id="aboutMe" value={values.aboutMe} onChange={handleChange} className="textarea  h-24"></textarea>
						</label>
					)}
				</>
			)}

			<div className="relative flex justify-end">
				<ButtonSubmit status={isLoading ? "submitting" : "idle"} buttonText={auth === "login" ? "Log In" : "Create Account"} />
			</div>
		</form>
	);
};
