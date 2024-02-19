import "./App.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { PageRegister } from "./Pages/Auth/PageRegister";
import { PageLogin } from "@/Pages/Auth/PageLogin";
import { PageProfile } from "./Pages/Auth/PageProfile";
import { TemplateNavigation } from "./Templates/TemplateNavigation";
import { PageCreateRecipe } from "./Pages/Recipes/PageCreateRecipe";
import { PageMyRecipes } from "./Pages/Recipes/PageMyRecipes";
import { PrivateRoute } from "./Components/Atoms/PrivateRoute";
import { PageSingleRecipe } from "./Pages/Recipes/PageSingleRecipe";
import { PageEditRecipe } from "./Pages/Recipes/PageEditRecipe";
import { PageAllIngredients } from "./Pages/Ingredients/PageAllIngredients";
import { PageCreateIngredients } from "./Pages/Ingredients/PageCreateIngredients";
import { PageEditIngredient } from "./Pages/Ingredients/PageEditIngredient";
import { PageExplore } from "./Pages/Recipes/PageExplore";
import { PageFavorites } from "./Pages/Recipes/PageFavorites";

function App() {
	return (
		<div className="relative bg-base-100 w-full h-screen overflow-hidden lg:flex font-barlow">
			<TemplateNavigation>
				<main className="mx-auto max-w-screen-xl w-full  pt-12 px-4 pb-4 md:px-6 md:pb-6 xl:px-12 xl:pb-12 2xl:px-16">
					<Routes>
						<Route index element={<Navigate to="/explore" />} />
						<Route path="explore" element={<PageExplore />} />
						<Route path={"login"} element={<PageLogin />} />
						<Route path={"register"} element={<PageRegister />} />
						<Route
							path={"profile/:userId"}
							element={
								<PrivateRoute>
									<PageProfile />
								</PrivateRoute>
							}
						/>
						<Route
							path="/:userId/my-recipes"
							element={
								<PrivateRoute>
									<PageMyRecipes />
								</PrivateRoute>
							}
						/>
						<Route path={"recipe"}>
							<Route
								path="create"
								element={
									<PrivateRoute>
										<PageCreateRecipe />
									</PrivateRoute>
								}
							/>
							<Route
								path="favorites"
								element={
									<PrivateRoute>
										<PageFavorites />
									</PrivateRoute>
								}
							/>
							<Route path=":recipeId" element={<PageSingleRecipe />} />
							<Route path=":recipeId/edit" element={<PageEditRecipe />} />
						</Route>
						<Route path="ingredients">
							<Route path="all" element={<PageAllIngredients />} />
							<Route path=":ingredientId" element={<PageEditIngredient />} />
							<Route
								path="create"
								element={
									<PrivateRoute>
										<PageCreateIngredients />
									</PrivateRoute>
								}
							/>
						</Route>
					</Routes>
				</main>
			</TemplateNavigation>

			<Toaster position="bottom-right" />
		</div>
	);
}

export default App;
