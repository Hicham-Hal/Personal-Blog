import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const getDashArticles = async(req, res) => {
    let articles = []
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
            return res.render('dashboard', { articles: undefined, error: 'No article exist' })
        }
        return res.render('dashboard', { articles, error: undefined })
    }catch(err){
        res.json(err)
    }
}


export const addArticle = async(req, res) => {
    const {title, content} = req.body
    try{
        let date = new Date().toDateString();
        date = date.split(' ').slice(1).join(' ')
        const data = await fs.promises.readdir(path.join('articles'))
        const id = data.length ? Math.max(...data.filter(p => p.endsWith('.json')).map(p => Number(p.split('.')[0]) + 1)) : 1
        if(fs.existsSync(path.join('articles', `${id}.json`))){
            return res.render('dashboard', {error: 'Article id already exist'})

        }
        
        const newArticle = {
            title: title,
            date,
            content: content,
            id
        }
        
        
        await fs.promises.writeFile(path.join('articles', `${id}.json`), JSON.stringify(newArticle))
        return res.redirect('/dashboard')
    }catch(err){
        res.json(err)
    }
}

export const getUpdateArticle = async(req, res) => {
    const {id} = req.params
    try{
        if (!/^\d+$/.test(id)) return res.status(400).send('Invalid id')
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
        if (!/^\d+$/.test(id)) return res.status(400).send('Invalid id')
        let date = new Date().toDateString();
        date = date.split(' ').slice(1).join(' ')
        if(!await fs.existsSync(path.join('articles', `${id}.json`))){
            return res.redirect('/dashboard')
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

        return res.redirect('/dashboard')

    }catch(err){
        res.json(err)
    }
}

export const deleteArticle = async(req, res) => {
    const {id} = req.params
    try{
        if (!/^\d+$/.test(id)) return res.status(400).send('Invalid id')
        if(!fs.existsSync(path.join('articles', `${id}.json`))){
            console.log('Article not found')
            return res.render('/dashboard')
        }

        await fs.promises.rm(path.join('articles', `${id}.json`))
        return res.redirect('/dashboard')
    }catch(err){
        res.json(err)
    }
}