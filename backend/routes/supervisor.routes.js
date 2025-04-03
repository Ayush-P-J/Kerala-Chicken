import express from 'express'
import { addSupervisor, editSupervisor, getSupervisor } from '../controllers/supervisor.controller.js'

const router = express.Router()


router.post('/addSupervisor',addSupervisor)
router.get('/getSupervisor',getSupervisor)
router.post('/editSupervisor',editSupervisor)



const supervisorRoute = router

export default supervisorRoute;