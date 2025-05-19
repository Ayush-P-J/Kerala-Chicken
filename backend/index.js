import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.routes.js'
import cors from 'cors'
import { connectDB } from './db.js'
import districtRoute from './routes/district.routes.js'
import supervisorRoute from './routes/supervisor.routes.js'
import farmerRoute from './routes/farmer.routes.js'
import credentialsRoute from './routes/credentials.routes.js'


dotenv.config()

const app = express()

const port = process.env.PORT || 8080

app.use(cors());
// Middleware for parsing JSON requests
app.use(express.json())

connectDB();

app.get('/', (req, res) => {
    res.send("Hello There")
})

// Enable authentication routes

app.use('/api/auth',authRoute)
app.use('/api/',districtRoute)
app.use('/api/',supervisorRoute)
app.use('/api/',farmerRoute)
app.use('/api/',credentialsRoute)

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
