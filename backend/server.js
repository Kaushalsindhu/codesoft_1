import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose'
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport';
import LocalStrategy from 'passport-local'
import User from './models/user.js'
import Company from './models/company.js'
import userRouter from './routes/user.js'
import jobRouter from './routes/job.js'
import companyRouter from './routes/company.js'


const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DATABASE SETUP
const dbUrl = 'mongodb://127.0.0.1:27017/oppurtunest';
async function main(){
    await mongoose.connect(dbUrl)
}
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// SETTING SESSION AND CONNECT-FLASH
app.use(session({
    secret: 'your-secret-key', // Replace with your secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: false,
    }
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// API ROUTES

app.use('/api/jobs', jobRouter)
app.use('/api/company', companyRouter)
app.use('/api/user', userRouter)


app.listen(port, ()=>{
    console.log(`server listening at port ${port}`);
})
