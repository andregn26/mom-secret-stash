import { ButtonDelete } from "@/Components/Atoms/ButtonDelete";
import { RecipeFromDB } from "@/types/recipeTypes";
import { AlarmClock, Delete, EditOne } from "@icon-park/react";
import { Link } from "react-router-dom";

type RecipeCardProps = {
	isEditable?: boolean;
	handleDelete?: (recipeId: string) => void;
	data: RecipeFromDB;
};

export const RecipeCard = ({ handleDelete, data, isEditable = false }: RecipeCardProps) => {
	return (
		<div className="flex flex-col justify-center items-center bg-neutral h-full rounded-md w-[250px] overflow-hidden shadow-sm border">
			<figure className="relative w-full min-h-64 p-4 ">
				<img src={data.imageUrl} alt="" className="object-cover w-full h-full rounded-sm" />
				<div className="absolute bottom-6 left-6 z-10">
					<Link to={"/"} className="badge badge-accent shadow-sm text-xs">
						{data.foodType.name}
					</Link>
				</div>
			</figure>
			<div className="px-4 pt-2 pb-2 h-full w-full flex flex-col gap-2">
				<Link to={`/recipe/${data._id}`} className="text-left w-full">
					<h1 className="w-full font-semibold text-neutral-content/90 text-left text-sm h-8">{data.name}</h1>
				</Link>
				<div className="flex justify-between text-sm mt-2 text-accent">
					<p className="flex gap-1 items-center ">
						<AlarmClock theme="outline" size="12" />
						<span className="tooltip tooltip-accent" data-tip="minutes">
							{data.prepTime}
						</span>
					</p>
					<span className="tooltip tooltip-accent" data-tip="by serving">
						{data.totalCaloriesPerServing} Calories
					</span>
				</div>
			</div>
			{isEditable && handleDelete && (
				<div className="w-full flex justify-around p-4">
					<Link className="btn btn-transparent  w-24" to={`/recipe/${data._id}/edit`}>
						<EditOne theme="outline" size="16" className="text-accent" />
					</Link>
					<ButtonDelete
						btnClassName="btn btn-transparent  w-24"
						renderComponent="deleteButton"
						btnTextOrElement={<Delete theme="outline" size="16" className="text-error" />}
						nameOfItemToDelete={data.name}
						handleDelete={() => handleDelete(data._id)}
					/>
				</div>
			)}
		</div>
	);
};
