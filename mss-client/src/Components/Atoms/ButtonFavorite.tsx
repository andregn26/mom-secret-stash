import { getUserDetails, putAddRecipeToFavorites, putRemoveRecipeFromFavorites } from "@/api";
import { AuthContext } from "@/context/auth.context";
import { Like } from "@icon-park/react";
import { useEffect, useContext, useState } from "react";
import toast from "react-hot-toast";

type Props = {
	recipeId: string;
};

export const ButtonFavorite = ({ recipeId }: Props) => {
	const { user } = useContext(AuthContext);
	const [isRecipeIdInUserFavoriteList, setIsRecipeIdInUserFavoriteList] = useState<boolean>(false);
	const [renderAgain, setRenderAgain] = useState<boolean>(false);
	console.log("🚀 ~ ButtonFavorite ~ isRecipeIdInUserFavoriteList:", isRecipeIdInUserFavoriteList);

	useEffect(() => {
		setRenderAgain(false);
		if (!user) throw Error("userId not defined!");
		const callGetUserDetails = async () => {
			const userDetails = await getUserDetails(user._id);
			console.log("🚀 ~ callGetUserDetails ~ userDetails:", userDetails);
			if (userDetails) {
				setIsRecipeIdInUserFavoriteList((userDetails.data.userDetails.favoriteRecipes as string[]).includes(recipeId));
			}
		};
		callGetUserDetails();
	}, [user, recipeId, renderAgain]);

	const handleRecipeInFavorites = async () => {
		try {
			if (!isRecipeIdInUserFavoriteList) {
				await putAddRecipeToFavorites(recipeId);
				toast.success("Added to favorites");
				return;
			}
			await putRemoveRecipeFromFavorites(recipeId);
			toast.success("Removed from favorites");
		} catch (error) {
			console.log(error);
		} finally {
			setRenderAgain(true);
		}
	};

	return (
		<div className="">
			<Like
				theme={!isRecipeIdInUserFavoriteList ? "outline" : "filled"}
				size="24"
				className="text-error btn btn-ghost"
				onClick={handleRecipeInFavorites}
			/>
		</div>
	);
};
