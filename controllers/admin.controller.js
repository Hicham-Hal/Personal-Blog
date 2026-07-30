import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const addArticle = async(req, res) => {
    const {title, content} = req.body
    try{
        let date = new Date().toDateString();
        date = date.split(' ').slice(1).join(' ')

        if(fs.existsSync(path.join('articles', `${title}.json`))){
            console.log('Article title already exist')
            return
        }

        const newArticle = {
            title: title,
            date,
            content: content
        }
        

        fs.promises.writeFile(path.join('articles', `${title}.json`), JSON.stringify(newArticle))
        res.json({ msg: 'article added successfully' })
    }catch(err){
        console.log(err)
    }
}

export const updateArticle = async(req, res) => {

}

export const deleteArticle = (req, res) => {

}