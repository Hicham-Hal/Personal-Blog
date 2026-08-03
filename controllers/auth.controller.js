import fs from 'fs'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const isSignin = async(req, res) => {
    try{
        if(req.session && req.session.isAdmin){
            return res.redirect('/dashboard')
        }
        return res.render('login', { error: undefined })
    }catch(err){
        console.log(err)
    }
}

export const signIn = async(req, res) => {
    const {name, pwd} = req.body
    try{
        const file = await fs.promises.readFile(path.resolve('dataAuth.json'), 'utf8')
        const adminData = JSON.parse(file)
        if(name !== adminData.name){
            return res.status(401).render('login', {error: 'No user with this name' })
        }
        if(pwd !== adminData.password){
            return res.render('login', {error: 'please try again'})
        }
        req.session.isAdmin = true
        return res.redirect('/dashboard')
    }catch(err){
        console.log(err)
    }
}

export const signOut = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}