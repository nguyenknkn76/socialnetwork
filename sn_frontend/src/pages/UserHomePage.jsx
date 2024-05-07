import { useNavigate, useParams } from 'react-router-dom'
import userService from '../services/UserService';
import { useState, useEffect } from 'react';
const UserHomePage = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    // const navigate = useNavigate()
    // useEffect(() => {
    //     userService
    //         .getById(id)
    //         .then(returnUser => {
    //             setUser(returnUser)
    //             console.log(user)
    //     })
    // },[])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedSocialNetworkUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
            setUser(user)
        }
    },[])

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedNoteAppUser')
        navigate(`/login`)
    }
    return(
        <div>
            <div>
                <p>{user === null ? `nothing or logout` : `${user.name} logged in`}</p>
                <button onClick={handleLogout}>logout</button>
            </div>
            
        </div>
    )
}
export default UserHomePage