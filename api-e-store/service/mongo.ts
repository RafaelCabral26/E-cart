import mongoose from "mongoose"

export async function connect() {

    try {
        mongoose.set("strictQuery", true)
        const connect = await mongoose.connect(process.env.DB_URI || "")
        console.log("Conectado ao DB")
    }catch(err) {
       console.log(err)     
    }
}
