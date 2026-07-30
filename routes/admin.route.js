import express from 'express'
import { addArticle, deleteArticle, updateArticle } from '../controllers/admin.controller.js'

const route = express.Router()

route.post('/article', addArticle)
route.patch('/article/:id', updateArticle)
route.delete('/artilce/:id', deleteArticle)

export default route