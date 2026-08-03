import express from 'express'
import { addArticle, deleteArticle, getDashArticles, getUpdateArticle, updateArticle } from '../controllers/admin.controller.js'
import { requiredAdmin } from '../lib/auth.js'

const route = express.Router()

route.post('/article', requiredAdmin, addArticle)
route.post('/article/:id', requiredAdmin, updateArticle)
route.get('/update/:id', requiredAdmin, getUpdateArticle)
route.post('/delete/:id', requiredAdmin, deleteArticle)
route.get('/', requiredAdmin, getDashArticles)

route.get('/add', requiredAdmin, (req, res) => {
    res.render('add', {msg: undefined})
})


export default route