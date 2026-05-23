import isEmail from "validator/lib/isEmail.js"
import User from "../model/userModel.js"

export const getCurrentUser = async (req, res) => {

    try {

        let user = await User.findById(req.userId).select("-password")

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {

        console.log("Get Current User Error => ", error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getAdmin = async (req, res) => {
  try {
    if (!req.adminEmail) {
      return res.status(401).json({ message: "Admin not found" });
    }

    return res.status(200).json({
      email: req.adminEmail,
      role: "admin",
    });
  } catch (error) {
    console.log(error);
  }
};
