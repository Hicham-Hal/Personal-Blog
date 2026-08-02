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
        const data = await fs.promises.readdir(path.join('articles'))
        console.log(data.length)
        const id = data.length ? Math.max(...data.filter(p => p.endsWith('.json')).map(p => Number(p.split('.')[0]) + 1)) : 1
        if (!/^\d+$/.test(id)) return res.status(400).send('Invalid id')
        if(fs.existsSync(path.join('articles', `${id}.json`))){
            console.log('Article title already exist')
            return
        }
        
        const newArticle = {
            title: title,
            date,
            content: content,
            id
        }
        
        
        await fs.promises.writeFile(path.join('articles', `${id}.json`), JSON.stringify(newArticle))
        return res.redirect('/articles')
    }catch(err){
        res.json(err)
    }
}

export const getUpdateArticle = async(req, res) => {
    const {id} = req.params
    try{
        if(!fs.existsSync(path.join('articles', `${id}.json`))){
            res.render('update', {article: undefined, error:'No article found'})
            return
        }
        const file = await fs.promises.readFile(path.join('articles', `${id}.json`), 'utf8')
        const fileData = JSON.parse(file)
        return res.render('update', { article: fileData, error: undefined })
    }catch(err){
        res.json(err)
    }
}

export const updateArticle = async(req, res) => {
    const {id} = req.params
    const {title, content} = req.body
    try{
        let date = new Date().toDateString();
        date = date.split(' ').slice(1).join(' ')
        if(!await fs.existsSync(path.join('articles', `${id}.json`))){
            console.log('articles not found')
            return
        }

        let data = await fs.promises.readFile(path.join('articles', `${id}.json`), 'utf8')
        data = JSON.parse(data)

        if(data.content === content && data.title=== title){
            res.render('update', {article: data})
            return
        }
        data.title = title || data.title;
        data.content = content || data.content
        data.date = date


        await fs.promises.writeFile(path.join('articles', `${id}.json`), JSON.stringify(data))

        return res.redirect('/articles')

    }catch(err){
        res.json(err)
    }
}

export const deleteArticle = async(req, res) => {
    const {id} = req.params
    try{
        if(!fs.existsSync(path.join('articles', `${id}.json`))){
            console.log('Article not found')
            res.render('dashboard', {msg: 'article not found'})
            return
        }

        await fs.promises.rm(path.join('articles', `${id}.json`))
        await getArticles()
        return res.redirect('/articles')
        // res.json('article deleted successfully')
    }catch(err){
        res.json(err)
    }
}