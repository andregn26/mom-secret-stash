import { useContext, useEffect, useState } from "react"
import { deleteRecipe, getMyRecipes } from "@/api";
import { AuthContext } from "@/context/auth.context";
import { Recipe } from "@/types/recipeTypes";
import { Link, useParams } from "react-router-dom";
import { ButtonDelete } from "@/Components/Atoms/ButtonDelete";
import toast from "react-hot-toast";



export const PageMyRecipes = () => {
    const { user } = useContext(AuthContext)
    const [isUser, setIsUser] = useState<boolean>(false)
    const [renderAfterDelete, setRenderAfterDelete] = useState<boolean>(false)
    const [allRecipesFromUser, setAllRecipesFromUser] = useState<Recipe[]>([]);
    const { userId } = useParams();
    useEffect(() => {
        setRenderAfterDelete(false)
        if (userId === user?._id) {
            setIsUser(true)
            getMyRecipes(userId!).then((allRecipesFromUser) => {
                console.log("🚀 ~ getMyRecipes ~ allRecipesFromUser:", allRecipesFromUser)
                setAllRecipesFromUser(allRecipesFromUser.data.recipes);
            });
        }
    }, [userId, renderAfterDelete]);

    const handleDelete = (recipeId: string) => {
        deleteRecipe(recipeId).then((deletedRecipe) => {
            toast.success("deleted recipe")
            console.log("🚀 ~ deleteRecipe ~ deletedRecipe:", deletedRecipe)
            setRenderAfterDelete(true)
        })
    }

    return (
        <>
            {isUser ? <div className="gap-8 border_red_2 grid grid-cols-6 w-full">
                {allRecipesFromUser.map((recipe) => (

                    <div key={recipe._id} className="w-full col-span-6 flex flex-col justify-center items-center bg-slate-100 min-w-[250px]">
                        <h1>{recipe.name}</h1>
                        <p>{recipe.description}</p>
                        <p>{recipe.createdBy.firstName} {recipe.createdBy.lastName}</p>
                        <div className="flex gap-6 mt-6">
                            <Link to={`/recipe/${recipe._id}/edit`}>Edit</Link>
                            <ButtonDelete btnText="Delete" recipeName={recipe.name} handleDelete={() => handleDelete(recipe._id)} />

                            <Link to={`/recipe/${recipe._id}`} >view</Link>
                        </div>

                    </div>

                ))}
            </div> : <p>You don't have permission tho access this page</p>}

        </>

    );
};
