import jwt from "jsonwebtoken"

// export const authenticateToken = (req, res, next) => {
//     console.log("authenticate")
//     const authHeader = req.headers.authorization
//     const token = authHeader && authHeader.split(' ')[1]
//     console.log(token);
    

//     if (!token) return res.sendStatus(401)

//     jwt.verify(token, process.env.AUTH_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user // attach user to request
//         next()
//     })
// }

// import jwt from "jsonwebtoken"

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).json({ message: "Token missing" })

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ message: "Token invalid" })
  }
}

