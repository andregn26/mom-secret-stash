import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { selectCategory, selectUnit } from "@/data";
import { NavigationHeader } from "@/Components/Molecules/NavigationHeader";
import { InputsIngredient } from "@/types/ingredientTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSingleIngredient } from "@/hooks/useFetchSingleIngredient";
import { BackendError } from "@/Components/Molecules/BackendError";
import { putEditIngredient } from "@/api";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

export const PageEditIngredient = () => {
	const navigate = useNavigate();
	const { ingredientId } = useParams();
	if (!ingredientId) throw Error("Ingredient Id not defined!");

	const { singleIngredientFromDB, isLoadingSingleIngredientFromDB, errorFromAxios } = useFetchSingleIngredient(ingredientId);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<InputsIngredient>();

	const onSubmit: SubmitHandler<InputsIngredient> = async (data) => {
		console.log(data);

		try {
			const postRequest = await putEditIngredient(ingredientId, data);
			toast.success(postRequest.data.message);
			navigate("/ingredients/all");
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response) {
					toast.error(error.response.data.message);
				}
			}
			console.warn(error);
		}
	};

	if (!singleIngredientFromDB && !isLoadingSingleIngredientFromDB) return <BackendError errorFromAxios={errorFromAxios} />;

	return (
		<>
			<NavigationHeader pageName="Create Ingredient" />
			{!isLoadingSingleIngredientFromDB && singleIngredientFromDB ? (
				<div className="grow flex flex-col justify-center">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="p-4 md:p-6 xl:p-8 2xl:p-10 bg-neutral shadow-sm border w-full rounded-md flex flex-col gap-4 max-w-screen-md mx-auto">
						{/* NAME, CATEGORY  */}
						<div className="flex gap-4">
							<div className="w-full">
								<input
									defaultValue={singleIngredientFromDB.name}
									placeholder="Ingredient Name"
									{...register("name", { required: "Name of the ingredient is required" })}
									className="input w-full"
								/>
								{errors.name && <p className="pt-2 text-xs text-error">{errors.name.message}</p>}
							</div>
							<div className="w-full">
								<Controller
									name="category"
									control={control}
									defaultValue={singleIngredientFromDB.category}
									rules={{ required: "Category is required" }}
									render={({ field }) => (
										<select {...field} className="select w-full">
											<option value="">Select Category</option>
											{selectCategory.map((oneCategory, index) => {
												return (
													<option key={index} value={oneCategory}>
														{oneCategory}
													</option>
												);
											})}
										</select>
									)}
								/>
								{errors.category && <p className="pt-2 text-xs text-error">{errors.category.message}</p>}
							</div>
						</div>

						{/* QUANTITY, UNIT  */}
						<div className="flex gap-4">
							<div className="w-full">
								<input
									type="number"
									defaultValue={singleIngredientFromDB.quantity}
									placeholder="Quantity"
									{...register("quantity")}
									className="input w-full"
								/>
							</div>
							<div className="w-full">
								<Controller
									name="unit"
									control={control}
									defaultValue={singleIngredientFromDB.unit}
									render={({ field }) => (
										<select {...field} className="select w-full">
											<option value="">Select Unit</option>
											{selectUnit.map((oneUnit, index) => {
												return (
													<option key={index} value={oneUnit}>
														{oneUnit}
													</option>
												);
											})}
										</select>
									)}
								/>
							</div>
						</div>

						{/* CALORIES, FAT, CARBS, PROTEIN , FIBER */}
						<div className="grid grid-cols-2 xl:grid-cols-6 gap-4">
							<input
								defaultValue={singleIngredientFromDB.calories}
								min={0}
								type="number"
								placeholder="Calories"
								{...register("calories", { min: 0 })}
								className="input w-full col-span-2"
							/>
							<input
								defaultValue={singleIngredientFromDB.fat}
								min="0.00"
								step="0.01"
								type="number"
								placeholder="Fat"
								{...register("fat", { min: 0 })}
								className="input w-full"
							/>
							<input
								defaultValue={singleIngredientFromDB.carbs}
								min="0.00"
								step="0.01"
								type="number"
								placeholder="Carbs"
								{...register("carbs", { min: 0 })}
								className="input w-full"
							/>
							<input
								defaultValue={singleIngredientFromDB.protein}
								min="0.00"
								step="0.01"
								type="number"
								placeholder="Protein"
								{...register("protein", { min: 0 })}
								className="input w-full"
							/>
							<input
								defaultValue={singleIngredientFromDB.fiber}
								min="0.00"
								step="0.01"
								type="number"
								placeholder="Fiber"
								{...register("fiber", { min: 0 })}
								className="input w-full"
							/>
						</div>

						<input className="btn btn-primary" type="submit" />
					</form>
				</div>
			) : (
				<p>Loading</p>
			)}
		</>
	);
};
