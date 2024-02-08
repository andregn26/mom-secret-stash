import { useState } from "react"
import { getRecipe, putEditRecipe } from '@/api'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FormContainer } from "@/Components/Organisms/FormContainer"
import { InputText } from "@/Components/Atoms/InputText.old"
import { ButtonSubmit } from "@/Components/Atoms/ButtonSubmit"
import toast from "react-hot-toast"



export const PageEditRecipe = () => {
    const { recipeId } = useParams()
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        getRecipe(recipeId!).then((fetchedRecipe) => {
            return fetchedRecipe.data.recipeFounded
        }).then((recipeFound) => {
            setName(recipeFound.name)
            setDescription(recipeFound.description)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [recipeId])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()
        putEditRecipe(recipeId!, { name, description })
            .then((editedRecipe) => {
                console.log("🚀 ~ putEditRecipe ~ editedRecipe:", editedRecipe)
                toast.success(editedRecipe.data.message)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                console.log(error)
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <FormContainer title='Edit recipe'>
            <form onSubmit={(e) => handleSubmit(e)} className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 flex flex-col gap-2'>
                <InputText value={name} id='title' type='text' label='Recipe name' handleChange={(e) => setName(e.target.value)} />
                <InputText value={description} id='title' type='text' label='Description' handleChange={(e) => setDescription(e.target.value)} />
                <ButtonSubmit status={isLoading ? "submitting" : "idle"} buttonText='Create recipe' />
            </form>
        </FormContainer>
    )
}