import { IconMenu } from "@/Components/Icons/Base";



export const ButtonMenu = ({ setIsAsideOpen }) => {
    return (
        <button className="z-[99999] block rounded-sm border bg-white p-1.5 shadow-sm lg:hidden">
            <span onClick={() => setIsAsideOpen(true)} className="relative block h-5.5 w-5.5 cursor-pointer">
                <IconMenu />
            </span>
        </button>
    )
}