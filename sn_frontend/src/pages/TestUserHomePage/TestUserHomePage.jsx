import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [log, setLog] = useState([]);

  const posts = [
    { id: 1, content: 'Nội dung bài post 1' },
    { id: 2, content: 'Nội dung bài post 2' },
  ];

  const users = [
    { id: 1, name: 'Người dùng 1' },
    { id: 2, name: 'Người dùng 2' },
  ];

  const platforms = ['Reddit', 'Twitter', 'Facebook'];

  const handleChoosePost = (post) => {
    setSelectedPost(post);
  };

  const handleChooseUser = (user) => {
    setSelectedUser(user);
  };

  const handleSubmit = () => {
    const now = new Date().toLocaleString();
    const logEntry = `${now} - Người dùng ${selectedUser.id} đăng bài ${selectedPost.id} lên ${selectedPlatform}`;
    setLog([...log, logEntry]);
    setLog([...log, `${now} - Người dùng đăng bài thành công`]);
  };

  return (
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
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
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
          <h2>Chọn nền tảng</h2>
          <select className="form-control" value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
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
          <h2>Option được chọn</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID Người dùng</th>
                <th>Tên Người dùng</th>
                <th>ID Bài post</th>
                <th>Nội dung bài post</th>
                <th>Nền tảng đăng bài</th>
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
          <button className="btn btn-success" onClick={handleSubmit}>Đăng bài</button>
        </div>
      </div>

      {/* Log Section */}
      <div className="row mt-5">
        <div className="col-12">
          <h2>Log</h2>
          <ul className="list-group">
            {log.map((entry, index) => (
              <li key={index} className="list-group-item">{entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
