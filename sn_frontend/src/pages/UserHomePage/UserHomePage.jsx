import { useNavigate, useParams } from 'react-router-dom'
import userService from '../../services/UserService';
import { useState, useEffect } from 'react';
import './UserHomePage.css'
import PostService from '../../services/PostService';
import UserService from '../../services/UserService';

const UserHomePage = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [log, setLog] = useState([]);
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    // const posts = [
    //     { id: 1, content: 'Nội dung bài post 1' },
    //     { id: 2, content: 'Nội dung bài post 2' },
    // ];

    // const users = [
    //     { id: 1, name: 'Người dùng 1' },
    //     { id: 2, name: 'Người dùng 2' },
    // ];

    const platforms = ['Reddit', 'Twitter', 'Facebook'];

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedSocialNetworkUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
            setUser(user)
        }
    },[])

    useEffect(() => {
        console.log('effect')
        PostService
            .getAll()
            .then(listPosts => {
                setPosts(listPosts)
                console.log(listPosts)
                console.log(posts)
            })
    },[])

    useEffect(() => {
        UserService
            .getAll()
            .then(listUsers => {
                setUsers(listUsers)
            })
    },[])

    const handleChoosePost = (post) => {
        setSelectedPost(post);
    };

    const handleChooseUser = (user) => {
        setSelectedUser(user);
    };

    const handleSubmit = async () => {
        const now = new Date().toLocaleString();
        const logEntry = `${now} - Người dùng ${selectedUser.id} đăng bài ${selectedPost.id} lên ${selectedPlatform}`;
        setLog([...log, `${now} - Người dùng ${selectedUser.id} đăng bài ${selectedPost.id} lên ${selectedPlatform}`]);
        // setLog([...log, `${now} - Người dùng đăng bài thành công`]);
    };

    const handleCancel = () => {
        setSelectedPlatform(null)
        setSelectedUser(null)
        setSelectedPost(null)
    }
    // const navigate = useNavigate()
    // useEffect(() => {
    //     userService
    //         .getById(id)
    //         .then(returnUser => {
    //             setUser(returnUser)
    //             console.log(user)
    //     })
    // },[])

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedNoteAppUser')
        navigate(`/login`)
    }
    return(
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br/><br/> 
                        <p>{user === null ? `nothing or logout` : `${user.name} logged in`}</p>
                        <button onClick={handleLogout}>logout</button>
                    </div>
                </div> 
            </div>

            <div className="container mt-5">
                <div className="row">
                    {/* Posts Table */}
                    <div className="col-md-6">
                        <h2>Bài Post</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nội dung</th>
                                    <th>Chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post,index) => (
                                    <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{post.content}</td>
                                    <td><button className="btn btn-primary" onClick={() => handleChoosePost(post)}>Chọn</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

             {/* Users Table */}
            <div className="col-md-6">
                <h2>Người dùng</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Chọn</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td><button className="btn btn-primary" onClick={() => handleChooseUser(user)}>Chọn</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Platform Selection */}
        <div className="row mt-5">
            <div className="col-md-6">
                <label htmlFor="platform">Choose platform</label>
                <select className="form-control" id = "platform" value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
                    <option value="">Chọn nền tảng</option>
                    {platforms.map((platform, index) => (
                        <option key={index} value={platform}>{platform}</option>
                    ))}
                </select>
            </div>
        </div>

      {/* Selected Options */}
        <div className="row mt-5">
            <div className="col-md-12">
                <h2>Option</h2>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Post Id</th>
                        <th>Content</th>
                        <th>Platform</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{selectedUser?.id}</td>
                        <td>{selectedUser?.name}</td>
                        <td>{selectedPost?.id}</td>
                        <td>{selectedPost?.content}</td>
                        <td>{selectedPlatform}</td>
                    </tr>
                    </tbody>
                </table>
                <button className="btn btn-success" onClick={handleSubmit}>Post</button>
                <button className='btn btn-danger' onClick={handleCancel}>Cancel</button>
            </div>
        </div>

        {/* Log Section */}
        <div className="row mt-5">
            <div className="col-12">
                <h2>Upload Post Logger</h2>
                <div className='log-container'>
                    <ul className="list-group">
                        {log.map((entry, index) => (
                        <li key={index} className="list-group-item">{entry}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>        
</div>
)}
export default UserHomePage