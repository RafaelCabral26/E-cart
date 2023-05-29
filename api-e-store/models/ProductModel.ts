import mongoose from "mongoose";

export type TProduct = {
    _id?:string,
    product_name:string,
    product_price:string,
    product_description:string,
    product_photo:string,
}

const ProductSchema = new mongoose.Schema<TProduct>({
    product_name:{
        type:String,
        required:[true, "Insira o nome do produto"]
    },
    product_price:{
        type:String,
        required:[true, "Insira o preço do produto"]
    },
    product_description:{
        type:String,
        required:[true, "Insira a descrição do produto"]
    },
    product_photo:{ type:String}
})

export const ProductModel = mongoose.model<TProduct>("Product", ProductSchema);