import RegisterForm from "../../components/RegisterForm"
import { useState, useEffect } from "react"
import userService from "../../services/UserService"
import 'bootstrap/dist/css/bootstrap.min.css'
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
        <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {/* <h5 className="card-title">Register</h5> */}
              <RegisterForm
                handleRegister={handleRegister}
                username={newusername}
                password={newpassword}
                name={name}
                email={email}
                usernameOnChange={({ target }) => { setNewUsername(target.value) }}
                passwordOnChange={({ target }) => { setNewPassword(target.value) }}
                nameOnChange={({ target }) => { setName(target.value) }}
                emailOnChange={({ target }) => { setEmail(target.value) }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User List</h5>
              <ul className="list-group">
                {users.map(user =>
                  <li className="list-group-item" key={user.id}>
                    ID: {user.id}, Name: {user.name}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default RegisterPage