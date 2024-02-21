import { useEffect, useState, createContext } from "react";
import { getVerify } from "../api";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/userTypes";
interface AuthContextValue {
	isLoggedIn: boolean;
	isLoading: boolean;
	userInSession: User | null;
	storeToken: (arg: string) => void;
	authenticateUser: () => void;
	logoutUser: () => void;
}

type Props = {
	children?: React.ReactNode;
};

const AuthContext = createContext<AuthContextValue>(null!);

function AuthProviderWrapper(props: Props) {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [userInSession, setUserInSession] = useState<User | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		authenticateUser();
	}, []);

	const storeToken = (token: string) => {
		localStorage.setItem("authToken", token);
	};

	const logoutUser = () => {
		localStorage.removeItem("authToken");
		authenticateUser();
		navigate("/");
	};

	const authenticateUser = async () => {
		const storedToken = localStorage.getItem("authToken");

		if (storedToken) {
			try {
				// We must send the JWT token in the request's "Authorization" Headers
				const verifiedUser = await getVerify(storedToken);
				const user = verifiedUser.data;
				// Update state variables
				setIsLoggedIn(true);
				setIsLoading(false);
				setUserInSession(user);
			} catch (error) {
				// If the server sends an error response (invalid token)
				// Update state variables
				setIsLoggedIn(false);
				setIsLoading(false);
				setUserInSession(null);
				console.log(error);
			}
		} else {
			// If the token is not available (or is removed)
			setIsLoggedIn(false);
			setIsLoading(false);
			setUserInSession(null);
		}
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, isLoading, userInSession, storeToken, authenticateUser, logoutUser }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthProviderWrapper, AuthContext };
