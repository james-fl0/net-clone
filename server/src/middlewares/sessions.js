import session from 'express-session'
import connectMongo from 'connect-mongo'
import { config as configDotenv } from "dotenv";
configDotenv()

const store = connectMongo.create({
  mongoUrl: process.env.MONGODB_ACCESS_STRING,
  ttl: 24 * 60 * 60 * 10000
})

export const sessions = session({
  secret: process.env.SECRET_COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    httpOnly: true,
    domain: 'https://net-clone-iota.vercel.app/',
    sameSite:'none'
  },
  credentials:true
})