import RegisterForm from "../components/RegisterForm"
import { useState, useEffect } from "react"
import userService from "../services/UserService"
const RegisterPage = () => {
    const [newusername, setNewUsername] = useState('')
    const [newpassword, setNewPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() =>{
        userService
          .getAll()
          .then(allUsers =>{
            console.log(allUsers)
            setUsers(allUsers)
          })
      },[])
    
    const handleRegister = (event) => {
        event.preventDefault()
        console.log('register')
        const userObject = {
            username: newusername,
            password: newpassword,
            name: name,
            email: email
        }
        userService
            .create(userObject)
            .then(returnUser => {
                setUsers(users.concat(returnUser))
                console('register success')
            })
    }
    return(
        <div>

            <RegisterForm 
                handleRegister = {handleRegister}
                username = {newusername} 
                password = {newpassword} 
                name = {name}
                email = {email}
                usernameOnChange = {({target}) => {setNewUsername(target.value)}}
                passwordOnChange = {({target}) => {setNewPassword(target.value)}}
                nameOnChange = {({target}) => {setName(target.value)}}
                emailOnChange = {({target}) => {setEmail(target.value)}}
            />
            <div>
                <h2>user list</h2>
                <ul>
                    {users.map(user => 
                        <li key = {user.id}>{user.id} : {user.name}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}
export default RegisterPage