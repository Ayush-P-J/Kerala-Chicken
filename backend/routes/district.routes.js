import express from 'express'
import { addDistrict, editDistrict, getDistrict } from '../controllers/district.controller.js'

const router = express.Router()


router.post('/addDistrict',addDistrict)

router.get('/getDistrict',getDistrict)

router.post('/editDistrict',editDistrict)

const districtRoute = router

export default districtRoute;