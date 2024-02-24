import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AlarmClock, EveryUser } from "@icon-park/react";
import { useFetchSingleRecipe } from "@/hooks/useFetchSingleRecipe";
import { ButtonFavorite } from "@/Components/Atoms/ButtonFavorite";
import "react-lazy-load-image-component/src/effects/blur.css";

export const PageSingleRecipe = () => {
	const { recipeId } = useParams();
	if (!recipeId) throw Error("Recipe Id not defined!");
	const { singleRecipeFromAPI, singleRecipeCaloriesStatsFromAPI, isLoadingSingleRecipe, isDataFetchingSuccess } = useFetchSingleRecipe(recipeId);
	const isLoading = isLoadingSingleRecipe || !singleRecipeFromAPI || !singleRecipeCaloriesStatsFromAPI;

	if (!isDataFetchingSuccess) {
		return <div>Something went wrong while fetching the data</div>;
	}

	return (
		<div>
			<NavigationHeader isLoading={isLoading} pageName={singleRecipeFromAPI?.name} />

			<div className="flex flex-col w-full mt-10 items-center">
				<div className="flex w-full flex-col h-full md:h-[300px]  md:flex-row-reverse">
					<figure className="relative w-full  md:max-w-[400px] h-[300px]  rounded-sm overflow-hidden">
						{!isLoading ? (
							<>
								<img
									loading="lazy"
									height={400}
									width={300}
									className="object-cover  h-[300px] w-full md:max-w-[400px]"
									src={singleRecipeFromAPI.imageUrl}
									alt={`${singleRecipeFromAPI.name}`}
								/>
								<div className="absolute bottom-2 left-2 z-10">
									<Link to={"/"} className="badge badge-accent  ">
										{singleRecipeFromAPI.foodType.name}
									</Link>
								</div>
								<div className="absolute top-2 left-2  max-w-xs bg-base-200/80 px-4 py-2 rounded-sm border mx-auto">
									<Link
										className="flex items-center gap-8 flex-row-reverse justify-between"
										to={`../../profile/${singleRecipeFromAPI.createdBy._id}`}>
										<figure className="hidden sm:block w-10 h-10 overflow-hidden rounded-full">
											<img
												className="object-cover w-full h-full"
												src={singleRecipeFromAPI.createdBy.profileImg}
												alt={`singleRecipeFromAPI-creator-${singleRecipeFromAPI.createdBy.firstName}-${singleRecipeFromAPI.createdBy.lastName}`}
											/>
										</figure>
										<div className="flex flex-col">
											<span className="text-xs text-neutral-content/60">Created by</span>
											<span className="text-sm font-semibold text-neutral-content/80">
												{singleRecipeFromAPI.createdBy.firstName} {singleRecipeFromAPI.createdBy.lastName}
											</span>
										</div>
									</Link>
								</div>
							</>
						) : (
							<div className="skeleton h-full w-full"></div>
						)}
					</figure>
					{!isLoading ? (
						<div className=" py-4 px-6 flex w-full text-center flex-col bg-base-200  rounded-b-sm h-full justify-between">
							{/* FAVORITE FUNCTIONALITY */}
							<div className="flex justify-between w-full">
								<div className="flex gap-4 w-full">
									<span className="flex gap-1 items-center text-base mt-2 text-accent font-bold">
										<AlarmClock theme="outline" size="18" />
										<span className="tooltip tooltip-accent" data-tip="minutes">
											{singleRecipeFromAPI.prepTime}
										</span>
									</span>
									<span className="flex gap-1 items-center text-base mt-2 text-accent font-bold">
										<EveryUser theme="outline" size="18" />
										<span className="tooltip tooltip-accent" data-tip="servings">
											{singleRecipeFromAPI.servings}
										</span>
									</span>
								</div>{" "}
								<div className=" flex justify-end px-4 py-4 ">
									<ButtonFavorite recipeId={recipeId} />
								</div>
							</div>

							<p className="overflow-y-scroll text-left h-24  font-semibold text-sm text-neutral-content/80 ">{singleRecipeFromAPI.description}</p>
							<div className="grid grid-cols-8 md:grid-cols-10 w-full py-4 gap-8 md:gap-0 text-sm">
								<div className="col-span-8 md:col-span-2 md:border-r-2 md:text-left flex flex-col md:items-start">
									<span className="tooltip tooltip-accent" data-tip="per serving">
										<h4 className="text-xs font-semibold text-accent/80">Calories</h4>
									</span>
									<span>{singleRecipeFromAPI.totalCaloriesPerServing}</span>
								</div>
								<div className="col-span-4 md:col-span-2">
									<h4 className="text-xs font-semibold text-accent/80">fat</h4>
									<span>{singleRecipeCaloriesStatsFromAPI.totalFat}</span>
								</div>
								<div className="col-span-4 md:col-span-2">
									<h4 className="text-xs font-semibold text-accent/80">Carbs</h4>
									<span>{singleRecipeCaloriesStatsFromAPI.totalCarbs}</span>
								</div>
								<div className="col-span-4 md:col-span-2">
									<h4 className="text-xs font-semibold text-accent/80">Protein</h4>
									<span>{singleRecipeCaloriesStatsFromAPI.totalProtein}</span>
								</div>
								<div className="col-span-4 md:col-span-2">
									<h4 className="text-xs font-semibold text-accent/80">Fiber</h4>
									<span>{singleRecipeCaloriesStatsFromAPI.totalFiber}</span>
								</div>
							</div>
						</div>
					) : (
						<div className="skeleton w-full h-full mr-6 "></div>
					)}
				</div>

				{/* COL 2 */}

				<div className="w-full flex flex-col gap-6 mt-10 lg:gap-24 lg:grid lg:grid-cols-6">
					{/* INGREDIENTS */}
					<div className="lg:col-span-2 w-full">
						{!isLoading ? (
							<>
								<h3 className="text-accent text-lg font-semibold mb-2">Ingredients</h3>
								<ul className="list-disc list-inside marker:text-neutral-400">
									{singleRecipeFromAPI.ingredients.map((ingredient) => {
										return (
											<li key={ingredient._id}>
												<span className="font-semibold text-neutral-content/80">
													{ingredient.quantityForRecipe} {ingredient.ingredient.unit}
												</span>{" "}
												- {ingredient.ingredient.name}
											</li>
										);
									})}
								</ul>
							</>
						) : (
							<>
								{[...Array(10)].map((_, i) => {
									return <div key={i} className="skeleton mb-2 w-full h-4"></div>;
								})}
							</>
						)}
					</div>
					{/* INSTRUCTIONS */}
					<div className="lg:col-span-4">
						{!isLoading ? (
							<>
								<h3 className="text-accent text-lg font-semibold mb-2">Instructions</h3>
								<ul>
									{singleRecipeFromAPI.instructions.map((instruction) => {
										return (
											<li key={instruction._id}>
												<span className="font-semibold mr-1 text-neutral-content/80">{instruction.step} -</span> {instruction.instruction}
											</li>
										);
									})}
								</ul>
							</>
						) : (
							<>
								{[...Array(10)].map((_, i) => {
									return <div key={i} className="skeleton w-full h-4 mb-2"></div>;
								})}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
