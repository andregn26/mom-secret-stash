import { getUserDetails, putAddRecipeToFavorites, putRemoveRecipeFromFavorites } from "@/api";
import { AuthContext } from "@/context/auth.context";
import { Like } from "@icon-park/react";
import { useEffect, useContext, useState } from "react";
import toast from "react-hot-toast";

type Props = {
	recipeId: string;
	size?: string;
	className?: string;
};

export const ButtonFavorite = ({ className = "", recipeId, size = "24" }: Props) => {
	const { userInSession } = useContext(AuthContext);
	const [isRecipeIdInUserFavoriteList, setIsRecipeIdInUserFavoriteList] = useState<boolean>(false);
	const [renderAgain, setRenderAgain] = useState<boolean>(false);
	console.log("🚀 ~ ButtonFavorite ~ isRecipeIdInUserFavoriteList:", isRecipeIdInUserFavoriteList);

	useEffect(() => {
		if (userInSession) {
			setRenderAgain(false);
			const callGetUserDetails = async () => {
				const userDetails = await getUserDetails(userInSession._id);
				console.log("🚀 ~ callGetUserDetails ~ userDetails:", userDetails);
				if (userDetails) {
					setIsRecipeIdInUserFavoriteList((userDetails.data.data.favoriteRecipes as string[]).includes(recipeId));
				}
			};
			callGetUserDetails();
		}
	}, [userInSession, recipeId, renderAgain]);

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
		<>
			{userInSession ? (
				<button>
					<Like
						theme={!isRecipeIdInUserFavoriteList ? "outline" : "filled"}
						size={size}
						className={`${className} text-error`}
						onClick={handleRecipeInFavorites}
					/>
				</button>
			) : (
				<span className="tooltip tooltip-accent " data-tip="Login to add to favorites">
					<Like theme={"outline"} size={size} className="" />
				</span>
			)}
		</>
	);
};
