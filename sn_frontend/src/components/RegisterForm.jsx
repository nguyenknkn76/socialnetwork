const RegisterForm = ({handleRegister, username, password, name, email,usernameOnChange, passwordOnChange, nameOnChange, emailOnChange}) => {
    return(
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <p>enter some field here to register</p>
        <div>
          username: <input type="text" value={username} name="Username" onChange={usernameOnChange}/>
        </div>
        <div>
          password <input type="password" value={password} name="Password" onChange={passwordOnChange}/>
        </div>
        <div>
          name <input type="name" value={name} name="Name" onChange={nameOnChange}/>
        </div>
        <div>
          email <input type="email" value={email} name="Email" onChange={emailOnChange}/>
        </div>
        <button type="submit">register</button>
      </form>
    )
  }

export default RegisterForm