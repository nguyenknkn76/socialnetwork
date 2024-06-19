const LoginForm = ({handleLogin, username, password, usernameOnChange, passwordOnChange}) => {
    return(
      
      <div className= "login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label for="username">Username</label>
            <input type="text" id = "username" value={username} name="Username" onChange={usernameOnChange}/>
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input type="password" id = "password" value={password} name="Password" onChange={passwordOnChange}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
      
    )
  }
export default LoginForm