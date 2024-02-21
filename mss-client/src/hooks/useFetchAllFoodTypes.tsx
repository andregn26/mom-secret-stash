import { getAllFoodTypes } from "@/api";
import { FoodTypeFromDB } from "@/types/foodTypes";
import { useEffect, useState } from "react";

export const useFetchAllFoodTypes = () => {
	const [allFoodTypesFromDB, setAllFoodTypesFromDB] = useState<FoodTypeFromDB[] | null>(null);
	const [isLoadingFoodTypesFromDB, setIsLoadingFoodTypesFromDB] = useState<boolean>(false);
	const [isFoodTypesFetchingSuccess, setIsFoodTypesFetchingSuccess] = useState<boolean>(true);

	useEffect(() => {
		setIsLoadingFoodTypesFromDB(true);
		const getFoodTypesFromAPI = async () => {
			try {
				const foodTypesFetched = await getAllFoodTypes();
				setAllFoodTypesFromDB(foodTypesFetched.data.foodType);
				setIsFoodTypesFetchingSuccess(true);
			} catch (error) {
				console.log(error);
				setIsFoodTypesFetchingSuccess(false);
			} finally {
				setIsLoadingFoodTypesFromDB(false);
			}
		};
		getFoodTypesFromAPI();
		// const timer = setTimeout(() => {
		// 	setIsLoadingFoodTypesFromDB(false);
		// }, 1000);
		// return () => clearTimeout(timer);
	}, []);

	return { allFoodTypesFromDB, isLoadingFoodTypesFromDB, isFoodTypesFetchingSuccess };
};
