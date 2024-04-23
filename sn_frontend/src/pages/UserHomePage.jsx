import { useParams } from 'react-router-dom'
import userService from '../services/UserService';
import { useState } from 'react';

const UserHomePage = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    userService
        .getById(id)
        .then(returnUser => {
            setUser(returnUser)
        })
    return(
        <div>
            <p>{user === null ? null : `${user.name} logged in`}</p>
        </div>
    )
}
export default UserHomePage