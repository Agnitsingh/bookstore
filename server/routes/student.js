import express from 'express'
import { User } from '../models/Student.js';
import bcrypt from 'bcrypt'
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/register',verifyAdmin, async (req, res) => {
    try {
        const {email, password, roll, grade} = req.body;
        const student = await User.findOne({email})
        if(student) {
            return res.json({message: "student is registered"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newstudent = new User({
            email,
            password: hashPassword,
            roll: roll,
            grade
        })
        await newstudent.save()
        return res.json({registered: true})
    } catch(err) {
        console.log(err)
        return res.json({message: "Error in registring student"})
    }
})

export {router as studentRouter}