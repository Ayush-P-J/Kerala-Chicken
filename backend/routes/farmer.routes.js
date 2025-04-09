import express from 'express'
import { addFarmer, deleteFarmer, editFarmer, getFarmers } from '../controllers/farmer.controller.js'

const router = express.Router()


router.post('/addFarmer',addFarmer)
router.get('/getFarmer',getFarmers)
router.post('/editFarmer',editFarmer)
router.put('/deleteFarmer/:id',deleteFarmer)




const farmerRoute = router

export default farmerRoute;