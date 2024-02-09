import { useNavigate } from 'react-router-dom'

type NavigationHeaderProps = {
    pageName: string,
}

export const NavigationHeader = ({pageName}: NavigationHeaderProps) => {
    const navigate = useNavigate()
    return (
        <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl lg:text-2xl font-semibold text-neutral-content'>{pageName}</h2>
            <button className='btn btn-sm btn-outline btn-primary' onClick={() => navigate(-1)}>Go back</button>
        </div>
    )
}