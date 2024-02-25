import { getIngredient } from "@/api";
import { IngredientFromDB } from "@/types/ingredientTypes";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useFetchSingleIngredient = (paramIngredientId: string) => {
	const [singleIngredientFromDB, setSingleIngredientFromDB] = useState<IngredientFromDB | null>(null);
	const [isLoadingSingleIngredientFromDB, setIsLoadingSingleIngredientFromDB] = useState<boolean>(false);
	const [isSingleIngredientFetchingSuccess, setIsSingleIngredientFetchingSuccess] = useState<boolean>(true);
	const [errorFromAxios, setErrorFromAxios] = useState<AxiosError | null>(null);

	useEffect(() => {
		setIsLoadingSingleIngredientFromDB(true);
		const callAPISingleIngredient = async () => {
			if (paramIngredientId) {
				try {
					const ingredientFetched = await getIngredient(paramIngredientId);
					setSingleIngredientFromDB(ingredientFetched.data.data);
					setIsSingleIngredientFetchingSuccess(true);
				} catch (error: unknown) {
					if (axios.isAxiosError(error)) {
						setErrorFromAxios(error);
					}
					console.warn(error);
					setIsSingleIngredientFetchingSuccess(false);
				}
				// finally {
				// 	setIsLoadingSingleIngredientFromDB(false);
				// }
			}
		};
		callAPISingleIngredient();
		const timer = setTimeout(() => {
			setIsLoadingSingleIngredientFromDB(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [paramIngredientId]);

	return { singleIngredientFromDB, isLoadingSingleIngredientFromDB, isSingleIngredientFetchingSuccess, errorFromAxios };
};
