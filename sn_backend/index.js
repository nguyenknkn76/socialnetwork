const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
// const express = require('express')
// const app = express()

// app.use(express.json())

// const cors = require('cors')
// app.use(cors())

// const morgan = require('morgan')
// morgan.token('body', function (req, res) { 
//     return JSON.stringify(req.body)
// })
// const formatStr = ':method :url :status :res[content-length] - :response-time ms :body'
// app.use(morgan(formatStr))

// // let users = [
// //     {
// //         id: 1,
// //         username: "nguyen",
// //         password: "0123456",
// //         name: "nguyen-name",
// //         email: "nguyen@"
// //     },
// //     {
// //         id: 2,
// //         username: "minh",
// //         password: "0123456",
// //         name: "minh-name",
// //         email: "minh@"
// //     },
// //     {
// //         id: 3,
// //         username: "linh",
// //         password: "0123456",
// //         name: "linh-name",
// //         email: "linh@"
// //     },
// // ]

// app.get(`/`,(req, res) => {
//     console.log(`hello world`)
//     res.json({hello_msg: "hello world"})
// })

// app.post(`/api/login`,(req,res) => {
//     const {username, password} = req.body
//     const user = users.find(user => user.username === username && user.password === password )
//     if (user){
//         res.json(user)
//     }else{
//         res.status(401).json({error: "Invalid username or password"})
//     }
// })
// const generateId = () =>{
//     const maxId = Math.max(...users.map(user => user.id))
//     return maxId + 1
// }
// app.post(`/api/users`,(req,res) => {
//     const {username, password, name, email } = req.body
//     const newUser = {
//         id: generateId(),
//         username: username,
//         password: password,
//         name: name,
//         email: email
//     }
//     users = users.concat(newUser)
//     res.json(newUser)
// })
// app.get(`/api/users`, (req,res) => {
//     res.json(users)
// })
// app.get(`/api/users/:id`, (req,res) => {
//     const id = Number(req.params.id)
//     const user = users.find(user => user.id === id)
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({error: "User not found"});
//     }
// })


// PORT = 3001
// app.listen(PORT, ()=> {
//     console.log(`server running in PORT ${PORT}`)
// })