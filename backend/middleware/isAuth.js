import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {

  try {

    const token = req.cookies.token

    console.log("TOKEN => ", token)

    if (!token) {

      return res.status(401).json({
        message: "No token found"
      })
    }

    if (typeof token !== "string") {

      return res.status(401).json({
        message: "Invalid token type"
      })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.userId = decoded.userId

    next()

  } catch (error) {

    console.log("isAuth error", error)

    return res.status(401).json({
      message: "Authentication failed"
    })
  }
}

export default isAuth