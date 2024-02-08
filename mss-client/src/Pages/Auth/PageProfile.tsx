import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { EditName } from '@icon-park/react'
import { NavigationHeader } from '@/Components/Molecules/NavigationHeader'


export const PageProfile = () => {
    const { user } = useContext(AuthContext)

    return (
        <>
            <NavigationHeader pageName='My Profile' />
            <div className='overflow-hidden rounded-md  bg-neutral shadow-sm border'>
                <div className='px-4 py-6 md:py-10 text-center '>
                    <div className='relative flex justify-center w-32 h-32 mx-auto'>
                        <figure className='relative overflow-hidden rounded-full'>
                            <img className="object-cover w-32 h-32" id='profilePic' src={user?.profileImg} alt="" />
                        </figure>
                        <label htmlFor="profilePic" className='absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary '>
                            <EditName theme="outline" size="16" className='text-neutral/80' />
                        </label>
                    </div>
                    <div className='mt-4'>
                        <h3 className='mb-2 text-2xl font-semibold text-neutral-content'>{user?.firstName} {user?.lastName}</h3>
                        <p className='font-medium text-neutral-content/80'>{user?.email}</p>
                        <div className='mx-auto mt-4 mb-5 grid max-w-96 grid-cols-2 rounded-md border border-stroke py-2'>
                            <div className='flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 sm:flex-row'>
                                <span className='font-semibold text-neutral-content'>20</span>
                                <span className='text-sm'>Recipes created</span>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-1 px-4 sm:flex-row'>
                                <span className='font-semibold text-neutral-content'>300</span>
                                <span className='text-sm'>Favorites</span>
                            </div>
                        </div>
                        <div className='mx-auto max-w-screen-sm'>
                            <h4 className='font-semibold text-neutral-content'>About me</h4>
                            <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro molestiae, tempore voluptatibus dolorum mollitia, ex illum dicta quasi, incidunt eaque eius. Mollitia ut tenetur, exercitationem reiciendis laborum incidunt eligendi expedita.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}