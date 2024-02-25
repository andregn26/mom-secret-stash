import React, { Dispatch, SetStateAction } from "react";
import { selectCategory, selectUnit } from "@/data";

type IngredientsFormProps = {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	name: string;
	setName: Dispatch<SetStateAction<string>>;
	category: string;
	setCategory: Dispatch<SetStateAction<string>>;
	quantity: number;
	setQuantity: Dispatch<SetStateAction<number>>;
	unit: string;
	setUnit: Dispatch<SetStateAction<string>>;
	calories: number;
	setCalories: Dispatch<SetStateAction<number>>;
	fat: number;
	setFat: Dispatch<SetStateAction<number>>;
	carbs: number;
	setCarbs: Dispatch<SetStateAction<number>>;
	protein: number;
	setProtein: Dispatch<SetStateAction<number>>;
	fiber: number;
	setFiber: Dispatch<SetStateAction<number>>;
	isLoading: boolean;
	btnText: string;
	isDelete?: boolean;
};

export const IngredientsForm = (props: IngredientsFormProps) => {
	return (
		<form
			onSubmit={(e) => props.onSubmit(e)}
			className="p-4 md:p-6 xl:p-8 2xl:p-10 bg-neutral shadow-sm border w-full rounded-md flex flex-col gap-4">
			{/* NAME, CATEGORY  */}
			<div className="flex gap-4">
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Name</span>
					</div>
					<input className="input w-full" id="ingredient-name" type="text" value={props.name} onChange={(e) => props.setName(e.target.value)} />
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Pick category</span>
					</div>
					<select className="select" id="ingredient-category" required value={props.category} onChange={(e) => props.setCategory(e.target.value)}>
						{selectCategory.map((oneCategory, index) => {
							return (
								<option key={index} value={oneCategory}>
									{oneCategory}
								</option>
							);
						})}
					</select>
				</label>
			</div>
			{/* QUANTITY, UNIT  */}
			<div className="flex gap-4">
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Quantity</span>
					</div>
					<input
						className="input w-full"
						id="ingredient-quantity"
						type="number"
						required
						value={props.quantity!}
						onChange={(e) => props.setQuantity(Number(e.target.value))}
						min="0"
					/>
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Choose the unit</span>
					</div>
					<select className="select" id="ingredient-unit" required value={props.unit} onChange={(e) => props.setUnit(e.target.value)}>
						{selectUnit.map((oneUnit, index) => {
							return (
								<option key={index} value={oneUnit}>
									{oneUnit}
								</option>
							);
						})}
					</select>
				</label>
			</div>
			{/* CALORIES, FAT, CARBS, PROTEIN , FIBER */}
			<div className="grid grid-cols-2 xl:grid-cols-6 gap-4">
				<label className="form-control w-full col-span-2">
					<div className="label">
						<span className="label-text">Calories</span>
					</div>
					<input
						className="input w-full"
						id="ingredient-calories"
						type="number"
						required
						value={props.calories!}
						onChange={(e) => props.setCalories(Number(e.target.value))}
						min="0"
					/>
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Fat</span>
					</div>
					<input
						className="input w-full"
						id="ingredient-fat"
						type="number"
						required
						value={props.fat!}
						onChange={(e) => props.setFat(Number(e.target.value))}
						min="0.00"
						step="0.01"
					/>
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Carbs</span>
					</div>
					<input
						className="input w-full"
						id="ingredient-carbs"
						type="number"
						required
						value={props.carbs!}
						onChange={(e) => props.setCarbs(Number(e.target.value))}
						min="0.00"
						step="0.01"
					/>
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Protein</span>
					</div>
					<input
						className="input w-full"
						id="ingredient-protein"
						type="number"
						required
						value={props.protein!}
						onChange={(e) => props.setProtein(Number(e.target.value))}
						min="0.00"
						step="0.01"
					/>
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Fiber</span>
					</div>
					<input
						className="input w-full"
						id="ingredient-fiber"
						type="number"
						required
						value={props.fiber!}
						onChange={(e) => props.setFiber(Number(e.target.value))}
						min="0.00"
						step="0.01"
					/>
				</label>
			</div>
			<div>
				<button className="btn btn-primary w-full lg:max-w-48 self-end mt-8" disabled={props.isLoading} type="submit">
					{props.btnText}
				</button>
			</div>
		</form>
	);
};
