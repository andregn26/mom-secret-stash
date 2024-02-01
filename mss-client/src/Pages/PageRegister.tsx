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
  const [file, setFile] = useState();
  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(false);
  const handleSelectFile = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    try {
      let profileImg
      setLoading(true);
      const data = new FormData();
      data.append("my_file", file);
      const res = await axios.post("http://localhost:5005/api/auth/upload", data);
      profileImg = res.data.url
      console.log("🚀 ~ handleUpload ~ profileImg:", profileImg)
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

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

      setLoading(true);
      const data = new FormData();
      data.append("my_file", file);
      const res = await axios.post("http://localhost:5005/api/auth/upload", data);
      const profileImg = res.data.url
      const { firstName, lastName, email, password } = registerValues;

      const createAccount = await postSignup({ firstName, lastName, email, password, profileImg });
      toast(createAccount.data.message);
      // handleUpload()
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

        <>
          <>
            <label htmlFor="file" className="btn-grey">
              {" "}
              select file
            </label>
            {file && <center> {file.name}</center>}
            <input id="file" type="file" onChange={handleSelectFile} multiple={false} />
            <code>
              {Object.keys(res).length > 0
                ? Object.keys(res).map((key) => (
                  <p className="output-item" key={key}>
                    <span>{key}:</span>
                    <span>
                      {typeof res[key] === "object"
                        ? "object"
                        : res[key]}
                    </span>
                  </p>
                ))
                : null}
            </code>
            {file && (
              <>
                <button onClick={handleUpload} className="btn-green">
                  {loading ? "uploading..." : "upload to cloudinary"}
                </button>
              </>
            )}
          </>
        </>
      </AuthFormContainer>
    </TemplateAuth>
  );
};
