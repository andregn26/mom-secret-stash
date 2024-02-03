import { InputText } from '@/Components/Atoms/InputText'
import { FormContainer } from '@/Components/Organisms/FormContainer'
import React, { useState } from 'react'



export const PageCreateRecipe = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    return (
        <div>
            <FormContainer title='Create a new recipe'>
                <InputText value={name} id='title' type='text' label='Recipe name' handleChange={(e) => setName(e.target.value)} />
                <InputText value={description} id='title' type='text' label='Description' handleChange={(e) => setDescription(e.target.value)} />
            </FormContainer>

        </div>
    )
}