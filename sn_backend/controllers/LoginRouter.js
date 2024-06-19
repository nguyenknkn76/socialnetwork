const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel')
const PostRouter = require('../controllers/PostRouter')
const { error } = require('../utils/logger')

// const social = new SocialPost("RQTDH4Z-JYBMP53-KMD8M5D-ZNVQ8XN");
const apikeys = ["0ANT0VV-ERJMS1N-PAVWMVJ-NG9G29Q","EE3QDJT-MPAM0WA-Q8PCV90-WQRGZ37"]
let apiKey = ''

loginRouter.post('/', async (req, res) => {
    const {username , password} = req.body
    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && passwordCorrect)){
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }
    if (user.name === "nguyen"){
        apiKey = apikeys[0]
    } else{
        apiKey = apikeys[1]
    }
    
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(
        userForToken, 
        process.env.SECRET, 
        {expiresIn: 60*60}
    )
    
    
    res.status(200).send({token, username: user.username, name: user.name, id: user.id, apikey: apiKey})

})

module.exports = loginRouter