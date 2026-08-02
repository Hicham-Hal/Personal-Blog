import fs from 'fs'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const signIn = async(req, res) => {
    const {name, pwd} = req.body
    try{
        const file = await fs.promises.readFile(path.join(__dirname, 'dataAuth.json'), 'utf8')
        const adminData = JSON.parse(file)
        if(name !== adminData.name){
            return res.render('auth', { data: undefined, error: 'No user with this name' })
        }
        if(pwd !== adminData.password){
            return res.render('auth', {data: undefined, error: 'please try again'})
        }
        return res.json({ adminData.name })
    }catch(err){
        console.log(err)
    }
}