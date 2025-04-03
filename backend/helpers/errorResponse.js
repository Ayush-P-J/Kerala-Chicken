export const errorResponse = (res, error, statusCode=500, message="Internal Server Error") => {

    if(process.env.NODE_ENV!=='production'){
        console.log(error)
    }

  res.status(statusCode).json({ error, message ,success:false});
};
