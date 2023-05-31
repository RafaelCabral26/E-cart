import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TUser } from "../models/userModel";
import { Request } from "express";
import { IncomingHttpHeaders } from "http";

interface CustomRequest extends Request {
    headers: IncomingHttpHeaders & {
        authcookie?: string;
    };
}
export { CustomRequest };

export const createEncryptedPass = async (oldPassword: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(oldPassword, salt);
};

export const comparePasswords = async (inputPassword: string, DbPassword: string) => {
    const checkedPassword = await bcrypt.compare(inputPassword, DbPassword);
    if (!checkedPassword) throw new Error("Senha inválida");
};

export const createToken = async (user: TUser) => {
    try {
        const secret = process.env.SECRET_KEY as Secret;
        const payload = { id: user._id, email: user.email, profile: user.profile };
        const token = jwt.sign(payload, secret, { expiresIn: "10 days" });
        return token;
    } catch (err) {
        console.log(err);
        throw new Error("Erro ao criar token: " + err);
    }
};

export const checkToken = async (req: CustomRequest) => {
    try {
        const secret = process.env.SECRET_KEY as Secret | GetPublicKeyOrSecret;
        const token = req.cookies.authcookie;
        if (token === undefined) {
            return "Sem token de acesso";
        }
        const   checkedToken =jwt.verify(token, secret)
        return checkedToken
    } catch (err) {
        throw new Error("Erro 500 ao checar token");
    }
};
