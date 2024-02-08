import React from 'react'

type InputTextProps = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    id: string,
    placeholder?: string
    label: string
    isBgDark?: boolean
}

export const InputText = ({ value, setValue, id, placeholder = "", label, isBgDark = false }: InputTextProps) => {
    return (
        <>
            <input
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id={id}
                type={"text"}
                className={`peer mss-text-input-format ${isBgDark ? "mss-text-input-color-bgDark" : "mss-text-input-color-bgLight"}`}
            />
            <label className={`after:content[''] mss-text-label-format ${isBgDark ? "mss-text-label-color-bgDark" : "mss-text-label-color-bgLight"}`}>
                {label}
            </label>
        </>
    )
}