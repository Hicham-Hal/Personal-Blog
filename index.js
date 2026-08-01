import express from 'express'
import adminRoute from './routes/admin.route.js'
import userRoute from './routes/user.route.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('views', 'views')
app.set('view engine', 'ejs')
app.use('/dashboard/', adminRoute)
app.use('/articles', userRoute)

//Best appreach using .env
app.listen(3000, () => {
    console.log('the server is running on port 3000')
})