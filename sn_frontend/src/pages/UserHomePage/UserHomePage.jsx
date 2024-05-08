import { useNavigate, useParams } from 'react-router-dom'
import userService from '../../services/UserService';
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
            <div>
                <h2>User Table</h2>
                <table class="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Choose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>User 1</td>
                            <td><button class="choose-btn">Choose</button></td>
                        </tr>
                        <tr>
                            <td>User 2</td>
                            <td><button class="choose-btn">Choose</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Post Table</h2>
                <table class="post-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Message</th>
                            <th>Choose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>This is a post message.</td>
                            <td><button class="choose-btn">Choose</button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>This is another post message.</td>
                            <td><button class="choose-btn">Choose</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Select Platform</h2>
                <input type="radio" id="facebook" name="platform" value="facebook"/>
                <label for="facebook">Facebook</label><br/>
                <input type="radio" id="twitter" name="platform" value="twitter"/>
                <label for="twitter">Twitter</label><br/>
                <input type="radio" id="reddit" name="platform" value="reddit"/>
                <label for="reddit">Reddit</label><br/>
            </div>
            
        </div>
    )
}
export default UserHomePage