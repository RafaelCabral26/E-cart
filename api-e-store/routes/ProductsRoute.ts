import { Router } from "express";
import { ProductModel } from "../models/ProductModel";
import { checkToken } from "../service/auth";


const router = Router()

router.post("/add_product", async (req,res) => {
    try {
        const user = await checkToken(req);
        const productExists = await ProductModel.exists({product_name:req.body.product_name})
        if(productExists) return res.status(200).json({msg:"Esse produto já existe"})
        if(typeof user === 'object' && user['profile'] === 1) {
            await ProductModel.create(req.body)
            return res.status(200).json({msg:"Produto Adicionado"})
        }
            
        return res.status(200).json({msg:"Usuário sem permissão"})
    }catch(err) {
        return res.status(400).json({msg:"Erro no catch", error:err})
    }
})

router.get("/list_products", async (req,res) => {
    try {
        const products = await ProductModel.find({});
        return res.status(200).json({products:products});
    } catch (err) {
        return res.status(400).json({msg:"Erro ao buscar produtos."})
    }
    
})


export {router}
