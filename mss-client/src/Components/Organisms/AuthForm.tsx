import React from "react";
import { InputText } from "../Atoms/InputText.old";
import { ButtonSubmit } from "../Atoms/ButtonSubmit";

type ValuesRegister = {
    email: string;
    password: string;
    checkPassword: string;
    firstName: string;
    lastName: string;
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
    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 flex flex-col gap-2">
            {auth === "register" && (
                <>
                    {"firstName" in values && (
                        <InputText
                            handleChange={handleChange}
                            value={values.firstName}
                            id="firstName"
                            type="text"
                            label="First name"
                        />
                    )}
                    {"lastName" in values && (
                        <InputText
                            handleChange={handleChange}
                            value={values.lastName}
                            id="lastName"
                            type="text"
                            label="Last name"
                        />
                    )}
                </>
            )}
            <InputText handleChange={handleChange} value={values.email} id="email" type="email" label="Email" />
            <InputText
                handleChange={handleChange}
                value={values.password}
                id="password"
                type="password"
                label="Password"
                isPasswordInput={true}
            />

            {auth === "register" && (
                <>
                    <div className="relative pt-2">
                        <input
                            className="file-input file-input-ghost file-input-sm file-input-bordered w-full bg-white"
                            id="file"
                            type="file"
                            onChange={handleSelectFileProfileImg}
                            multiple={false}
                        />
                    </div>
                </>
            )}

            <div className="relative ">
                <ButtonSubmit status={isLoading ? "submitting" : "idle"} buttonText={auth === "login" ? "Log In" : "Create Account"} />
            </div>
        </form>
    );
};
