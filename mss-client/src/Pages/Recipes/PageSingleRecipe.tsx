import { getRecipe } from '@/api'
import { Recipe } from '@/types/recipeTypes'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



export const PageSingleRecipe = () => {
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const { recipeId } = useParams()
    useEffect(() => {

        getRecipe(recipeId!).then((fetchedRecipe) => {
            console.log(fetchedRecipe)
            setRecipe(fetchedRecipe.data.recipeFounded)
        })
    }, [recipeId])

    return (
        <div>{recipe?.name}</div>
    )
}