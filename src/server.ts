import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import './database/config'
import routes from './routes'
import { config } from 'dotenv'; config()

const app = express()


// Middlewares
app.use(cors())
app.use(express.json())
app.use(routes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`CORS-enabled server listening on port ${PORT}`))