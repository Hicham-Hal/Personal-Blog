import express from 'express'
import { signIn, signOut } from '../controllers/auth.controller.js'

const route = express.Router()

route.get('/login', (req, res) => {
    res.render('login', { error: undefined })
})


route.post('/signin', signIn)
route.post('/logout', signOut)


export default route