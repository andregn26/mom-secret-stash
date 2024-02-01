import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'


export const PageProfile = () => {

    const { user } = useContext(AuthContext)
    console.log("🚀 ~ PageProfile ~ user:", user)

    return (
        <div>
            {user?.firstName} {user?.lastName}
            <img src={user?.profileImg} alt="" />
        </div>
    )
}