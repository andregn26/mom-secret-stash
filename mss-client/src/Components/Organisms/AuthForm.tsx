import React from "react";
import { InputText } from "../Atoms/InputText";

type ValuesRegister = {
    email: string;
    password: string;
    checkPassword: string;
    firstName: string;
    lastName: string;
    file: string | null
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
};

export const AuthForm = ({ handleSubmit, values, handleChange, auth }: Props) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 flex flex-col gap-2">
            {auth === "register" && (
                <>
                    {"firstName" in values && (
                        <InputText handleChange={handleChange} value={values.firstName} id="firstName" type="text" label="First name" />
                    )}
                    {"lastName" in values && (
                        <InputText handleChange={handleChange} value={values.lastName} id="lastName" type="text" label="Last name" />
                    )}

                </>
            )}
            <InputText handleChange={handleChange} value={values.email} id="email" type="email" label="Email" />
            <InputText handleChange={handleChange} value={values.password} id="password" type="password" label="Password" isPasswordInput={true} />

            <div className="relative">
                <button type="submit" className="bg-blue-500 text-white rounded-md px-2 py-1">
                    Submit
                </button>
            </div>
        </form>
    );
};
