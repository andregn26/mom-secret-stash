import React, { useState } from 'react'
import { PreviewOpen, PreviewClose } from '@icon-park/react';

type Props = {
    handleChange: (arg: { target: { id: string; value: string } }) => void,
    value: string,
    id: string,
    type: string,
    label: string,
    isPasswordInput?: boolean
}

export const InputText = ({ handleChange, value, id, type, label, isPasswordInput = false }: Props) => {
    const [isSeePassword, setIsSeePassword] = useState(false)

    const seePassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setIsSeePassword(prev => !prev)
    }

    return (
        <div className="relative">
            <input
                value={value}
                onChange={handleChange}
                id={id}
                type={!isSeePassword ? type : "text"}
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-slate-600"
                placeholder={label}
            />
            <label
                htmlFor={id}
                className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm">
                {label}
            </label>
            {isPasswordInput && <><button className='absolute bottom-2 right-0' onClick={(e) => seePassword(e)}>
                {isSeePassword ? <PreviewClose className='text-slate-400' theme="outline" size="24" /> : <PreviewOpen theme="outline" size="24" className='text-slate-400' />}
            </button></>}
        </div>
    )
}