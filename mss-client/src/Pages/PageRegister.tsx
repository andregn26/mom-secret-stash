import { useState } from "react";
import { TemplateAuth } from "../Templates/TemplateAuth";
import { postSignup } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthFormContainer } from "@/Components/Organisms/AuthFormContainer";
import { AuthForm } from "@/Components/Organisms/AuthForm";

export const PageRegister = () => {
  const [registerValues, setRegisterValues] = useState({ firstName: "", lastName: "", email: "", password: "", checkPassword: "" });

  const navigate = useNavigate();

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
      const { firstName, lastName, email, password } = registerValues;
      const createAccount = await postSignup({ firstName, lastName, email, password });
      toast(createAccount.data.message);
      navigate("/login");
      console.log("created account! -->", createAccount);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.message);
      } else {
        toast("Something went wrong!");
      }
      console.log(error);
    }
  };

  return (
    <TemplateAuth>
      <AuthFormContainer title="Great! You're one step closer to find the best recipes">
        <AuthForm
          handleSubmit={handleRegisterSubmit}
          handleChange={handleRegisterChange}
          values={registerValues}
          auth="register"
        />
      </AuthFormContainer>
      <div className="flex flex-col">
        Register
        <form onSubmit={handleRegisterSubmit} className="flex flex-col bg-gray-100 gap-4 py-6 px-4">
          <label className="flex flex-col">
            First name
            <input
              type="text"
              id="firstName"
              required
              placeholder="First name"
              value={registerValues.firstName}
              onChange={handleRegisterChange}
            />
          </label>

          {/* <label className="flex flex-col">
            Last name
            <input
              type="text"
              required
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            Your email
            <input
              type="email"
              required
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            Password
            <input
              type="password"
              required
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            Check password
            <input
              type="password"
              placeholder="password"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />
          </label> */}

          <button type="submit">Submit</button>
        </form>
      </div>
    </TemplateAuth>
  );
};
