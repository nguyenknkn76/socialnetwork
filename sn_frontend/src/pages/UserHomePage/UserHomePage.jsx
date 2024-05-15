import { useNavigate, useParams } from 'react-router-dom'
import userService from '../../services/UserService';
import { useState, useEffect } from 'react';
import './UserHomePage.css'
import PostService from '../../services/PostService';
import UserService from '../../services/UserService';
// import { info } from '../../../../sn_backend/utils/logger';

const UserHomePage = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [log, setLog] = useState([]);
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
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

    // const handleChoosePost = (post) => {
    //     setSelectedPosts(selectedPosts.concat(post));
    // };
    const handleChoosePost = (post) => {
        const postIndex = selectedPosts.findIndex(p => p.id === post.id);
        if (postIndex > -1) {
            // Post is already selected, remove it from the array
            setSelectedPosts(selectedPosts.filter(p => p.id !== post.id));
        } else {
            // Post is not selected, add it to the array
            setSelectedPosts([...selectedPosts, post]);
        }
    };

    const handleChooseUser = (user) => {
        setSelectedUser(user);
    };


    // const handleSubmit = async () => {
    //     const now = new Date().toLocaleString();
    //     const loggedUserJSON = window.localStorage.getItem('loggedSocialNetworkUser');
    //     const user = JSON.parse(loggedUserJSON);
    //     const apikey = user.apikey;
    
    //     // Assume PostService.upload can handle an array of posts
    //     await PostService.upload({selectedPlatforms, selectedUser, selectedPosts, apikey});
    //     setLog([...log, `${now} - Posted successfully`]);
    //     handleCancel(); // Optionally clear selections after posting
    // };
    const handleSubmit = async () => {
        const now = new Date().toLocaleString();
        const loggedUserJSON = window.localStorage.getItem('loggedSocialNetworkUser');
        const user = JSON.parse(loggedUserJSON);
        const apikey = user.apikey;
    
        try {
            const response = await PostService.upload({ selectedPlatforms, selectedUser, selectedPosts, apikey });
            // Assuming response.data is an array of results
            const newLogEntries = response.data.flatMap(entry => {
                if (entry.status === "error") {
                    return `Error: ${entry.message}`;
                } else {
                    return entry.postIds.map(data => `Status: ${data.status}, Platform: ${data.platform}`);
                }
            });
            setLog(prevLog => [...prevLog, ...newLogEntries]);
        } catch (error) {
            console.error('Posting failed:', error);
            setLog(prevLog => [...prevLog, `${now} - Posting failed: ${error.message}`]);
        }
        handleCancel(); // Optionally clear selections after posting
    };

    
    const handleCancel = () => {
        setSelectedPlatforms([])
        setSelectedUser(null)
        setSelectedPosts([])
    }



    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedNoteAppUser')
        navigate(`/login`)
    }
    const handleTogglePlatform = (platform) => {
        const currentIndex = selectedPlatforms.indexOf(platform);
        const newChecked = [...selectedPlatforms];

        if (currentIndex === -1) {
            newChecked.push(platform);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelectedPlatforms(newChecked);
    };
    return(
        <div>
            <br/><br/>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br/><br/> 
                        <p>{user === null ? `nothing or logout` : `${user.name} logged in`}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div> 
            </div>

            <div className="container mt-5">
                <div className="row">
                    {/* Posts Table */}
                    <div className="col-md-6">
                        <h2>Posts</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Content</th>
                                    <th>Choose</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.content}</td>
                                    {/* <td><button className="btn btn-primary" onClick={() => handleChoosePost(post)}>Chọn</button></td> */}
                                    <td>
                                        <button
                                            className={`btn ${selectedPosts.find(p => p.id === post.id) ? "btn-secondary" : "btn-primary"}`}
                                            onClick={() => handleChoosePost(post)}
                                        >
                                            {selectedPosts.find(p => p.id === post.id) ? "Cancel" : "Choose"}
                                        </button>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

             {/* Users Table */}
            <div className="col-md-6">
                <h2>Users</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Choose</th>
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
                        <h2>Choose Platforms</h2>
                        {platforms.map((platform, index) => (
                            <div key={index} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={platform}
                                    checked={selectedPlatforms.includes(platform)}
                                    onChange={() => handleTogglePlatform(platform)}
                                    id={`platform-${index}`}
                                />
                                <label className="form-check-label" htmlFor={`platform-${index}`}>
                                    {platform}
                                </label>
                            </div>
                        ))}
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
                {selectedPosts.map((selectedPost) => (
                    <tr key={selectedPost.id}>
                        <td>{selectedUser?.id}</td>
                        <td>{selectedUser?.name}</td>
                        <td>{selectedPost.id}</td>
                        <td>{selectedPost.content}</td>
                        <td>{selectedPlatforms.join(', ')}</td>
                    </tr>
                ))}
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