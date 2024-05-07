import { useParams } from 'react-router-dom'
import userService from '../services/UserService';
import { useState, useEffect } from 'react';

const UserHomePage = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    
    // useEffect(() => {
    //     userService
    //         .getById(id)
    //         .then(returnUser => {
    //             setUser(returnUser)
    //             console.log(user)
    //     })
    // },[])
    useEffect(()=> {
        const loggedUserJSON = window.localStorage.getItem('loggedSocialNetworkUser')
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
    },[])
    
    return(
        <div>
            <p>{user === null ? null : `${user.name} logged in`}</p>
        </div>
    )
}
export default UserHomePage