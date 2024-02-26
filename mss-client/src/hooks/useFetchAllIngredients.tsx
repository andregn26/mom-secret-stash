import { getAllIngredients } from "@/api";
import { IngredientFromDB } from "@/types/ingredientTypes";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useFetchAllIngredients = () => {
	const [allIngredientsFromDB, setAllIngredientsFromDB] = useState<IngredientFromDB[] | null>(null);
	const [isLoadingAllIngredientsFromDB, setIsLoadingAllIngredientsFromDB] = useState<boolean>(false);
	const [isAllIngredientsFromDBSuccess, setIsAllIngredientsFromDBSuccess] = useState<boolean>(true);
	const [errorFromAxios, setErrorFromAxios] = useState<AxiosError | null>(null);

	useEffect(() => {
		setIsLoadingAllIngredientsFromDB(true);
		const callAPIAllIngredients = async () => {
			try {
				const fetchedAllIngredients = await getAllIngredients();
				setAllIngredientsFromDB(fetchedAllIngredients.data.data);
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					setErrorFromAxios(error);
				}
				console.warn(error);
				setIsAllIngredientsFromDBSuccess(false);
			} finally {
				setIsLoadingAllIngredientsFromDB(false);
			}
		};
		callAPIAllIngredients();
		// const timer = setTimeout(() => {
		// 	setIsLoadingAllIngredientsFromDB(false);
		// }, 4000);
		// return () => clearTimeout(timer);
	}, []);

	return { allIngredientsFromDB, isLoadingAllIngredientsFromDB, isAllIngredientsFromDBSuccess, errorFromAxios };
};
