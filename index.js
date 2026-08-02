import express from 'express'
import adminRoute from './routes/admin.route.js'
import userRoute from './routes/user.route.js'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

//auto-create the articles folder
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

if(!fs.existsSync(path.join(__dirname, 'articles'))){
    fs.mkdirSync(path.join(__dirname, 'articles'))
    console.log('Created articles/ directory')
}

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: '123fasdfkj452093rf23rf90_fadkjf',
    resave: false,
    saveUinitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2 // 2 hours
    }
}))

app.set('views', 'views')
app.set('view engine', 'ejs')
app.use('/dashboard/', adminRoute)
app.use('/articles', userRoute)

//Best appreach using .env
app.listen(3000, () => {
    console.log('the server is running on port 3000')
})