import { useEffect, useState } from "react"
import userService from "../../services/UserService";
import axios from "axios"
// import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LoginForm from "../../components/LoginForm"
import RegisterForm from "../../components/RegisterForm";

const HomePage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [option, setOption] = useState(null)
    const [users, setUsers] = useState([])
    
  
    useEffect(() =>{
      userService
        .getAll()
        .then(allUsers =>{
          console.log(allUsers)
          setUsers(allUsers)
        })
    },[])
  
    const info = () => {
      return(
        <p> some info here</p>
      )
      
    }
    
  
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
        })
    }
    return(
        <div>
            <div>
                <button className="btn btn-primary"><Link to="/login">Login</Link></button>
            </div>
            <div>
                <button className="btn btn-primary"><Link to="/register">Register</Link></button>
            </div>
        </div>
    )
}
export default HomePage