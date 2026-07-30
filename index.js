import express from 'express'
import adminRoute from './routes/admin.route.js'

const app = express()
app.use(express.json())
app.use('/dashboard/', adminRoute)


//Best appreach using .env
app.listen(3000, () => {
    console.log('the server is running on port 3000')
})