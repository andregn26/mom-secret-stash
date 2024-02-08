import { useEffect, useState, createContext } from "react";
import { getVerify } from "../api";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/userTypes";
interface AuthContextValue {
	isLoggedIn: boolean, isLoading: boolean, user: User | null, storeToken: (arg: string) => void, authenticateUser: () => void, logoutUser: () => void
}

type Props = {
	children?: React.ReactNode;
};

const AuthContext = createContext<AuthContextValue>(null!);

function AuthProviderWrapper(props: Props) {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [user, setUser] = useState<User | null>(null);

	const navigate = useNavigate()

	useEffect(() => { authenticateUser() }, [])

	const storeToken = (token: string) => {
		localStorage.setItem("authToken", token)
	}

	const logoutUser = () => {
		localStorage.removeItem("authToken")
		authenticateUser()
		navigate("/")
	}

	const authenticateUser = () => {           //  <==  ADD  
		// Get the stored token from the localStorage
		const storedToken = localStorage.getItem('authToken');

		// If the token exists in the localStorage
		if (storedToken) {
			// We must send the JWT token in the request's "Authorization" Headers
			getVerify(storedToken)
				.then((response) => {
					// If the server verifies that JWT token is valid  
					const user = response.data;
					// Update state variables        
					setIsLoggedIn(true);
					setIsLoading(false);
					setUser(user);
				})
				.catch((error: unknown) => {
					// If the server sends an error response (invalid token) 
					// Update state variables         
					setIsLoggedIn(false);
					setIsLoading(false);
					setUser(null);
					console.log(error)
				});
		} else {
			// If the token is not available (or is removed)
			setIsLoggedIn(false);
			setIsLoading(false);
			setUser(null);
		}
	}


	return <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logoutUser }}>{props.children}</AuthContext.Provider>;
}

export { AuthProviderWrapper, AuthContext };
