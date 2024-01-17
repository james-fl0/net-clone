import session from 'express-session'
import connectMongo from 'connect-mongo'
import { config as configDotenv } from "dotenv";
configDotenv()

const store = connectMongo.create({
  mongoUrl: process.env.MONGODB_ACCESS_STRING,
  ttl: 24 * 60 * 60 * 10000
})

export const sessions = session({
  store,
  secret: process.env.SECRET_COOKIE_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: process.env.FRONTEND_URL_WHTTP,
    sameSite: 'None',
  },
  credentials: true
})