import fs from 'fs'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const getArticles = async(req, res) => {
    let articles = []
    let isAdmin = true
    try{
        const files = await fs.promises.readdir(path.join('articles'));
        await Promise.all(files.map(async (p) => {
            try{
                const fileData = await fs.promises.readFile(path.join('articles', p), 'utf8')
                const article = JSON.parse(fileData)
                return articles.push(article)
            }catch(err){
                console.log(err)
            }
        }))
        if(articles.length === 0){
            if(isAdmin){
                return res.render('dashboard', { articles: undefined, error: 'No article exist' })
            }else{
                return res.render('home', { articles: undefined, error: 'No article exist' })
            }
        }
        if(isAdmin){
            return res.render('dashboard', { articles })
        }else{
            return res.render('home', { articles })
        }
    }catch(err){
        res.json(err)
    }
}

export const getSingleArticle = async(req, res) => {
    const {id} = req.params
    try{
        if(!fs.existsSync(path.join('articles', `${id}.json`))){
            res.render('article', {article: undefined, error:'No article found'})
            return
        }
        const file = await fs.promises.readFile(path.join('articles', `${id}.json`), 'utf8')
        const fileData = JSON.parse(file)
        return res.render('article', { article: fileData, error: undefined })
    }catch(err){
        res.json(err)
    }
}