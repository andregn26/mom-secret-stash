/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { postSignup, postUpload } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthFormContainer } from "@/Components/Organisms/FormContainer";
import { AuthForm } from "@/Components/Organisms/AuthForm";

export const PageRegister = () => {
  const [registerValues, setRegisterValues] = useState({ firstName: "", lastName: "", email: "", password: "", checkPassword: "" });
  const [fileProfileImg, setFileProfileImg] = useState<any>(null);
  const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSelectFileProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    setFileProfileImg(e.target.files[0])
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
      const profileImg = res.data.url
      const { firstName, lastName, email, password } = registerValues;
      const createAccount = await postSignup({ firstName, lastName, email, password, profileImg });
      toast(createAccount.data.message);
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.message);
      } else {
        toast("Something went wrong!");
      }
    } finally {
      setIsCreatingUser(false)
    }
  };

  return (
    <AuthFormContainer title="Great! You're one step closer to find the best recipes">
      <AuthForm
        handleSelectFileProfileImg={handleSelectFileProfileImg}
        handleSubmit={handleRegisterSubmit}
        handleChange={handleRegisterChange}
        values={registerValues}
        auth="register"
        isCreatingUser={isCreatingUser}
      />
    </AuthFormContainer>
  );
};
