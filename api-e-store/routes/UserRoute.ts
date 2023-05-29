import { Router } from "express";
import { VerifyEmail, mountUser } from "../controller/UserController";
import { checkToken, comparePasswords, createEncryptedPass, createToken } from "../service/auth";
import { UserModel } from "../models/userModel";
import { TUser } from "../models/userModel";
const router = Router()


router.post("/check_user", async (req, res) => {
    try {
        const userToken = await checkToken(req);
        let storageArrayCart: any[] = req.body
        storageArrayCart = storageArrayCart.map(({ quantity, ...otherKeys }) => otherKeys)
        let checker = false;
        if (typeof userToken === 'object') {
            checker = true
            storageArrayCart.forEach(async (e: any) => {
                await UserModel.findOneAndUpdate({ _id: userToken.id }, { $addToSet: { cart:e } }, )
            })
            const user = await UserModel.findById(userToken.id)
            return res.status(200).json({loggedIn:checker, cart:user?.cart})
        }

        return res.status(200).json({ loggedIn: checker });
    } catch (err) {
        return res.status(400).send("" + err);
    }
})

router.post("/delete_product", async (req,res) => {
    try {
        const userToken = await checkToken(req);
        if (typeof userToken === 'object') {
            await UserModel.findOneAndUpdate({_id:userToken.id}, {$pull : {cart:req.body}})
            return res.status(200).json({msg:"Produto Deletado"});
        }
    } catch (err) {
        return res.status(200).send(""+err)
    }
})
router.post("/register", async (req, res) => {
    try {
        const userInput = mountUser(req.body);
        await VerifyEmail(userInput.email);
        if (userInput.password) userInput.password = await createEncryptedPass(userInput.password);
        await UserModel.create(userInput);

        return res.status(200).json({ msg: "Cadastro concluído" });
    } catch (err) {
        res.status(400).send("" + err);
    }
})

router.post("/login", async (req, res) => {
    try {
        const userInput: TUser = req.body;
        if (!userInput.email || !userInput.password) throw new Error("Preencha todos os campos")
        const user = await UserModel.findOne({ email: userInput.email });
        if (!user)
            throw new Error("Usuário não existe")
        if (user.password)
            await comparePasswords(userInput.password, user.password);
        const token = await createToken(user);
        res.cookie('authcookie', token, { httpOnly: true, maxAge: 36000 * 60 });
        return res.status(200).json({ token: token });
    } catch (err) {
        res.status(400).send("" + err);
    }
})

router.post("/logout", async (req, res) => {
    try {
        res.clearCookie('authcookie');
        res.status(200).json({ msg: "Usuário deslogado" });

    } catch (err) {
        return res.status(400).json({ msg: "Erro ao tentar sair" })
    }
})
export { router }
