import jwt from "jsonwebtoken"

export const gneratetoken = (userId) => {

    return jwt.sign(

        { userId },

        process.env.JWT_SECRET,

        { expiresIn: "7d" }
    )
}

export const gneratetoken1 = (email) => {

    return jwt.sign(

        { email },

        process.env.JWT_SECRET,

        { expiresIn: "7d" }
    )
}