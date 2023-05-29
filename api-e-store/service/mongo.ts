import mongoose from "mongoose"
import { sanitizedConfig } from "../config/configEnv"

export async function connect() {

    try {
        mongoose.set("strictQuery", true)
        const connect = await mongoose.connect(sanitizedConfig.DB_URI)
        console.log("Conectado ao DB")
    }catch(err) {
       console.log(err)     
    }
}