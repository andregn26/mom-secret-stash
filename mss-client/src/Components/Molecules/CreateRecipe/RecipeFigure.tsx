import React from 'react'

type RecipeFigureProps = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>

}

export const RecipeFigure = ({value, setValue }: RecipeFigureProps) => {
    return (
        <figure className="relative w-full h-64  rounded-sm overflow-hidden">
            <img
                className="object-cover h-64 w-full"
                src={
                    "https://res.cloudinary.com/dia3czrcq/image/upload/t_w_400/bwgqzebwzh9wqg4zrdae.jpg"
                }
                alt=""
            />

            <div className="absolute flex bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-950/90 from-10%">
                <div className="absolute bottom-2 left-2 w-[50%]">
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            placeholder="Name"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            id="name"
                            type={"text"}
                            className={`peer mss-text-input-format mss-text-input-color-bgDark`}
                        />
                        <label className={`after:content[''] mss-text-label-format mss-text-label-color-bgDark`}>
                            Name
                        </label>
                    </div>
                </div>
            </div>
        </figure>
    )
}