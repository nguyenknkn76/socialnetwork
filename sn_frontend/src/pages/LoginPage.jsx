import { useEffect, useState } from "react"
import userService from "../services/UserService";
import axios from "axios"
// import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [option, setOption] = useState(null)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    useEffect(() =>{
        userService
        .getAll()
        .then(allUsers =>{
            console.log(allUsers)
            setUsers(allUsers)
        })
    },[])
    
    const handleLogin = (event) => {
        event.preventDefault()
        const foundUser = users.find(user => user.username === username && user.password === password)
        const userId = foundUser.id

        userService
            .getById(userId)
            .then(returnUser => {
                setUser(returnUser)
                setUsername('')
                setPassword('')
                navigate(`/userhomepage/${returnUser.id}`)
            })
    }
    return(
        <div>
            <p>{user === null ? null : `${user.name} logged in`} </p>
            <button onClick={()=> setOption('login')}>login</button>
            <button onClick={() => setOption('register')}>register</button>
            <button onClick={() => setUser(null)}>logout</button>
            <div>
                <LoginForm 
                    handleLogin = {handleLogin} 
                    username = {username} 
                    password = {password} 
                    usernameOnChange = {({target}) => {setUsername(target.value)}}
                    passwordOnChange = {({target}) => {setPassword(target.value)}}
                /> 
            </div>
            
            <div>
                <h2>user list</h2>
                <div>
                <ul>
                {users.map(user => 
                    <li key = {user.id}>{user.name}</li>
                )}
                </ul>
            </div>
        </div>
    </div>
    )
}
export default LoginPage