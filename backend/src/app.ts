import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import 'dotenv/config'

import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import session from 'express-session'

config()

const port = process.env.PORT
const session_secret = process.env.SESSION_SECRET

if (!session_secret) throw new Error('Отсутствует SESSION_SECRET в .env!')

const app = express()

const limiter = rateLimit({
    windowMs: 1000,
    max: 50,
    message: 'Too much requests',
    standardHeaders: true,
    legacyHeaders: false
})


declare module "express-session" {
    interface SessionData {
        userId?: number,
        auth?: boolean,
        email?: string,
        username?: string
    }
}

app.use(limiter)
app.use(helmet)
app.use(cors())
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost'],
    credentials: true
}))

const sessions = session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 14,
        secure: false,
        httpOnly: true
    }
})

app.use(sessions)
app.use(express.json())


app.use("/ping", (req, res) => {
    res.json({message: "ping"})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


