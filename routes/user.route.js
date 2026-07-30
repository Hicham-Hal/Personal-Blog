import express from "express";
import { getArticles, getSingleArticle } from "../controllers/user.controller.js";

const route = express.Router()

route.get('/', getArticles)
route.get('/article/:id', getSingleArticle)

export default route