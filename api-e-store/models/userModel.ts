import mongoose, { Schema } from "mongoose";

export type TUser =  {
    _id?:string,
    name?:string,
    password?:string,
    email:string,
    cart?: string[],
    profile?:number,
    active?:boolean
}


const UserSchema = new mongoose.Schema<TUser>({
    name:{
        type:String,
        required:[true, "Insira o seu nome."]
    },
    password: {
        type:String,
        required:[true, "Digite sua senha."],
        min:[6,"Senha deve conter no mínimo 6 dígitos."],
        max:[18, "Senha deve conter no máximo 18 dígitos."]
    },
    email: {
        type:String,
        required:[true, "Insira seu email."],
        unique:true,
    },
    cart: {
        type:[Schema.Types.Mixed]
    },
    profile: {
        type:Number,
        default:0,
    },
    active: {
        type:Boolean,
        default:true,
    }
})

export const UserModel = mongoose.model<TUser>("User", UserSchema)

