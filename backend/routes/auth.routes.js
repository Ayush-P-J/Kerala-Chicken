import express from 'express'
import { login } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/login',login)



const authRoute = router

export default authRoute;