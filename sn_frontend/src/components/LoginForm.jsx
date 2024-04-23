const LoginForm = ({handleLogin, username, password, usernameOnChange, passwordOnChange}) => {
    return(
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
          username: <input type="text" value={username} name="Username" onChange={usernameOnChange}/>
        </div>
        <div>
          password <input type="password" value={password} name="Password" onChange={passwordOnChange}/>
        </div>
        <button type="submit">login</button>
      </form>
    )
  }
export default LoginForm