import express from 'express'
import cors from 'cors'
import { apiUsers } from './routers/users/apiUsers.js'
import jwt from 'jsonwebtoken'
import { sessions } from './middlewares/sessions.js'
import { membershipRouter } from './routers/membershipRouters/membershipRouter.js'
import { fetchUserPictures } from './routers/awsRouters/fetchUserPictures.js'
import { config as configDotenv } from "dotenv";
import { userManager } from '../db/db.js'
configDotenv()

const app = express()
app.use(express.json())

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));


app.use(sessions)

app.use(apiUsers)
app.use('/api', membershipRouter)
app.use(fetchUserPictures)


app.get('/', async (req, res) => {
  try {
    const token = req.session.token
    if (!token) {
      throw new Error('no hay session')
    }
    jwt.verify(token, 'secret', async (err, decoded) => {
      if (err) {
        throw new Error('fail to decode jwt')
      }
      const user = await userManager.findOne({ _id: decoded })
      res.status(201).json({ status: 'success', message: 'user finded', user: user })
      res.send({ hola: 'bebe' })
    })
  } catch (error) {
    res.status(401).json({ status: 'error', message: error.message })
  }
})
const port = process.env.PORT
app.listen(port, () => {
  console.log(`servidor iniciado en el puerto ${port}`);
})