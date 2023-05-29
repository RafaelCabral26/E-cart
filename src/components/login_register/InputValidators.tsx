export const ValidateRegister = (registerInput: { name: string; email: string; password: string; confirmPassword: string }): { valid: boolean; message: string } => {
    const ri = registerInput;
    let key: keyof typeof registerInput;
    for (key in ri) {
        if (ri[key] === "") {
            return { valid: false, message: "Não deixe nenhum campo em branco." };
        }
    }
    if (registerInput.password !== registerInput.confirmPassword) {
        return { valid: false, message: "Confirmação de senha inválida." };
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registerInput.email) === false) {
        return { valid: false, message: "Formato de email inválido" };
    } else if(registerInput.password.length < 6) {
        return { valid:false, message:"Senha mínima de 6 digitos"}
    }

    return { valid: true, message: "Cadastro efetuado!" };
};

export const ValidateLogin = (loginInput: { email:string, password:string }) => {
    if(loginInput.email.length <= 0 || loginInput.password.length <= 0) {
        return {valid:false, message:"Preencha todos os campos"};
    }
    return {valid:true, message:"Login Efetuado!"};
}
