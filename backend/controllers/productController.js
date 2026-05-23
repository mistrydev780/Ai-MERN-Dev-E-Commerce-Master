import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"

export const addProduct = async (req, res) => {
    try {


        console.log(req.files)

        let { name, description, price, category, subCategory, sizes, bestSeller } = req.body

     if (!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({ message: "Images not uploaded" })
        }
        let image1 = req.files?.image1 ? await uploadOnCloudinary(req.files.image1[0].path) : ""
        let image2 = req.files?.image2 ? await uploadOnCloudinary(req.files.image2[0].path) : ""
        let image3 = req.files?.image3 ? await uploadOnCloudinary(req.files.image3[0].path) : ""
        let image4 = req.files?.image4 ? await uploadOnCloudinary(req.files.image4[0].path) : ""
        let productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true",
            date: Date.now(),
            image1,
            image2,
            image3,
            image4
        }

        const product = await Product.create(productData)

        res.status(201).json(product)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Product Add Error" })
    }
} 

export const listProduct = async (req,res) =>{
        
    try {
        const product = await Product.find({})
        return res.status(201).json(product)
    } catch (error) {
        console.log("ListProduct error");
        return res.status(500).json({message:`ListProduct error ${error}`})
        
    }
}

export const removeProduct = async (req,res) =>{
    try {
        let {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        return res.status(201).json(product)

    } catch (error) {
         console.log("RemoveProduct error");
        return res.status(500).json({message:`RemoveProduct error ${error}`})
        
    }
}


export const updateProduct = async (req, res) => {

    try {

        const { id } = req.params

        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestSeller
        } = req.body

        const updatedProduct = await Product.findByIdAndUpdate(

            id,

            {
                name,
                description,
                price,
                category,
                subCategory,
                sizes,
                bestSeller
            },

            { new: true }

        )

        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            updatedProduct
        })

    } catch (error) {

        console.log("Update Product Error => ", error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}