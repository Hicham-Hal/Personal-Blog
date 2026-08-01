import express from 'express'
import { addArticle, deleteArticle, getUpdateArticle, updateArticle } from '../controllers/admin.controller.js'

const route = express.Router()

route.post('/article', addArticle)
route.get('/add', (req, res) => {
    res.render('add', {msg: undefined})
})

route.post('/article/:id', updateArticle)
route.get('/update/:id', getUpdateArticle)
route.post('/delete/:id', deleteArticle)

export default route