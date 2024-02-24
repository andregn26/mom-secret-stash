import { getUserDetails } from "@/api";
import { AuthContext } from "@/context/auth.context";
import { User } from "@/types/userTypes";
import axios, { AxiosError } from "axios";
import { useEffect, useState, useContext } from "react";

export const useFetchProfile = (userId: string | undefined) => {
	const { userInSession } = useContext(AuthContext);
	const [profileFromDB, setProfileFromDB] = useState<User | null>(null);
	const [isLoadingProfileFromDB, setIsLoadingProfileFromDB] = useState<boolean>(false);
	const [errorFromAxios, setErrorFromAxios] = useState<AxiosError | null>(null);
	const [isProfileFetchingSuccess, setIsProfileFetchingSuccess] = useState<boolean>(true);

	useEffect(() => {
		setIsLoadingProfileFromDB(true);
		const callAPIProfile = async () => {
			if (!userId) {
				setIsLoadingProfileFromDB(false);
				setIsProfileFetchingSuccess(false);
				throw Error("Incorrect user ID");
			}
			try {
				const profileFetched = await getUserDetails(userId);
				setProfileFromDB(profileFetched.data.data);
				setIsProfileFetchingSuccess(true);
				console.info(profileFetched.data.debugMessage);
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					setErrorFromAxios(error);
				}
				console.warn(error);
				setIsProfileFetchingSuccess(false);
			} finally {
				setIsLoadingProfileFromDB(false);
			}
		};
		callAPIProfile();
		// const timer = setTimeout(() => {
		// 	setIsLoadingProfileFromDB(false);
		// }, 3000);
		// return () => clearTimeout(timer);
	}, [userInSession?._id, userId]);

	return { profileFromDB, isLoadingProfileFromDB, isProfileFetchingSuccess, errorFromAxios };
};
