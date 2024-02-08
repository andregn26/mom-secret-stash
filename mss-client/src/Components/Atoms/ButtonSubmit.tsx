import React from 'react'

type ButtonSubmitProps = {
    status: "idle" | "submitting"
    buttonText: string
}

export const ButtonSubmit = ({ status, buttonText }: ButtonSubmitProps) => {

    let disabled = false

    if (status === "submitting") {
        disabled = true
        buttonText = "Submitting"
    }

    return (
        <button disabled={disabled} type="submit" className={`btn btn-sm btn-primary w-[150px] ${status === "submitting" ? "btn-disabled" : "btn-active"}`}>
            {buttonText}
        </button>
    )
}