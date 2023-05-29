import { TUser, UserModel } from "../models/userModel"

export const mountUser = (body: TUser) => {

    const user: TUser = {
        name: body.name,
        email: body.email,
        password: body.password,
    }
    return user
}

export const VerifyEmail = async (email: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        throw new Error("Email inválido")
    }
    const emailExists = await UserModel.exists({ email: email })
    if (emailExists) throw new Error("Email já cadastrado")
}

export const SanitizeCart = (storageArray: any[], dbArray: any[] | undefined) => {
    if (storageArray.length === 0) return dbArray
    storageArray = storageArray.map(({quantity, ...otherKeys}) => otherKeys)
    
    return dbArray
}
