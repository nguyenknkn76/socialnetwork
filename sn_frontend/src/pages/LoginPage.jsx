import { useEffect, useState } from "react"
import userService from "../services/UserService";
import axios from "axios"
// import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from 'react-router-dom'
import LoginService from "../services/LoginService";
import './LoginPage.css'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({})
    // const [errorMessage, setErrorMessage] = useState(null)
    const [option, setOption] = useState(null)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('try login')
        const user = await LoginService.login({username, password})
        window.localStorage.setItem('loggedSocialNetworkUser', JSON.stringify(user))
        console.log(user)
        setUser(user)
        setUsername('')
        setPassword('')
        
        // navigate(`/userhomepage/${user.id}`)
    }
    return(
        <div>
            <LoginForm
                handleLogin={handleLogin}
                username={username}
                password={password}
                usernameOnChange={({ target }) => { setUsername(target.value) }}
                passwordOnChange={({ target }) => { setPassword(target.value) }}
            />
        </div>
        
    )
}
export default LoginPage