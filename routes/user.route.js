import express from "express";
import fs from 'fs'
import path from 'path'
import { getArticles, getSingleArticle } from "../controllers/user.controller.js";
const app = express()
const route = express.Router()

route.get('/', getArticles)
route.get('/article/:id', getSingleArticle)

export default route