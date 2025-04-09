import express from 'express'
import { addDistrict, deleteDistrict, editDistrict, getDistrict } from '../controllers/district.controller.js'

const router = express.Router()


router.post('/addDistrict',addDistrict)

router.get('/getDistrict',getDistrict)

router.post('/editDistrict',editDistrict)

router.put('/deleteDistrict/:id',deleteDistrict)

const districtRoute = router

export default districtRoute;