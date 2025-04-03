import {errorResponse} from '../helpers/errorResponse.js'

export const login = (req,res) =>{
    try {
        return res.status(200).json({message:"ok",success:true,data:{name:"Ayush",role:"user",password:"Ayush@1234"}})
    } catch (error) {
        return errorResponse(res,error)
    }
}



