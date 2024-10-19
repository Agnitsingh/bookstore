import express from 'express'
import { Admin } from '../models/Admin.js';
import { User } from '../models/Student.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const router = express.Router();

const saltRounds = 10

router.post('/register', async (req, res) => {
    try{
        const { email, password } = req.body;
        console.log(req.body)
        const validPassword = await bcrypt.hash(password, saltRounds)
        const user = await User.create({ email: email, password: validPassword })
        
        const token = jwt.sign({email: user.email, role: 'student'}, process.env.Student_Key)

        res.cookie('token', token, {httpOnly: true, secure: true})
        return res.json({ login:true, role: 'student' })
    } catch(er) {
        res.json(er)
        console.log("Register error: ", er)
    }
})

router.post('/login', async (req, res) => {
    try{
    const {email, password, role} = req.body;
    if(role === 'admin') {
        const admin = await Admin.findOne({email})
        if(!admin) {
            return res.json({message: "admin not registered"})
        }
        const validPassword = await bcrypt.compare(password, admin.password)
        if(!validPassword) {
            return res.json({message: "wrong password"})
        }
        const token = jwt.sign({email: admin.email, role: 'admin'}, process.env.Admin_Key)
        res.cookie('token', token, {httpOnly: true, secure: true})
        return res.json({login:true, role: 'admin'})
    } else if (role === 'student') {
        const student = await User.findOne({email})
        if(!student) {
            return res.json({message: "student not registered"})
        }
        const validPassword = await bcrypt.compare(password, student.password)
        if(!validPassword) {
            return res.json({message: "wrong password"})
        }
        const token = jwt.sign({email: student.email, role: 'student'}, process.env.Student_Key)
        res.cookie('token', token, {httpOnly: true, secure: true})
        return res.json({login:true, role: 'student'})
    } else {

    }
    } catch(er) {
        res.json(er)
        console.log(er)
    }
})

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({message : "Invalid Admin"})
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if(err) {
                return res.json({message: "Invalid token"})
            } else {
                req.email = decoded.email;
                req.role = decoded.role;
                next()
            }
        })
    }
}

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({message : "Invalid User"})
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if(err) {
                jwt.verify(token, process.env.Student_Key, (err, decoded) => {
                    if(err) {
                        return res.json({message: "Invalid token"})
                    } else {
                        req.username = decoded.username;
                        req.role = decoded.role;
                        next()
                    }
                })
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next()
            }
        })
    }
}

router.get('/verify',verifyUser, (req, res) => {
    return res.json({login: true, role: req.role})
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({logout : true})
})

export {router as AdminRouter, verifyAdmin}