import React, { ChangeEvent, FormEvent } from "react";
import { TFilter, TLoggedIn, TModal } from "../../types/ModalTypes";
import { MyInput } from "./MyInput";
import { ValidateLogin, ValidateRegister } from "./InputValidators";
import { CreateAlert } from "../AlertModal";
import { useOnClickOutside } from "../ClickOutsideHook";
import { UserContext } from "../../App";
import http from "../../services/axios";

export const LoginWindow = () => {
    const loginRegisterProps = React.useContext<TLoggedIn & TModal & TFilter | null>(UserContext);
    if (!loginRegisterProps) return null;
    const { loginModal, setLoginModal, registerModal, setRegisterModal } = loginRegisterProps;

    return (
        <div>
            {loginModal ? (
                <div className="absolute top-0 left-0 h-full w-full  bg-transparent backdrop-blur-sm ">
                    <LoginModal registerModal={registerModal} setRegisterModal={setRegisterModal} setLoginModal={setLoginModal} loginModal={loginModal}></LoginModal>
                </div>
            ) : null}
            {registerModal ? (
                <div className="absolute top-0 left-0 h-full w-full  bg-transparent backdrop-blur-sm ">
                    <RegisterModal registerModal={registerModal} setRegisterModal={setRegisterModal} loginModal={loginModal} setLoginModal={setLoginModal}></RegisterModal>
                </div>
            ) : null}
        </div>
    );
};

const LoginModal: React.FC<TModal> = ({ loginModal, setLoginModal, registerModal, setRegisterModal }) => {
    const [loginInput, setLoginInput] = React.useState({ email: "", password: "" });
    const clickOutsiteRef = React.useRef<HTMLElement>(null);
    const user = React.useContext(UserContext);
    useOnClickOutside(clickOutsiteRef, () => {
        setLoginModal(!loginModal);
    });

    const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginInput((previousData) => {
            return { ...previousData, [name]: value };
        });
    };

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const check = ValidateLogin(loginInput);
        if (check.valid === false) {
            return CreateAlert(check.message, "alert-warning");
        }
        http.post("/login", loginInput)
            .then((res) => {
                user?.setLogin(!user.loggedIn)
                window.location.reload()

            })
            .catch((err) => {
                const cleanError = err.response.data.replace("Error:", "");
                CreateAlert(cleanError, "alert-warning");
            });
    };

    return (
        <div
            ref={clickOutsiteRef as React.LegacyRef<HTMLDivElement>}
            className="relative z-10 top-[10%] lg:top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-80 sm:w-96 h-96 rounded-xl shadow-xl bg-white "
        >
            <form tabIndex={-1} onSubmit={handleLogin} className="flex flex-col gap-4 p-10">
                <MyInput inputType={"email"} name_id_htmlFor={"email"} placeholder={"Insira seu email aqui..."} labelText={"Email"} handleLoginInput={handleLoginInput}></MyInput>
                <MyInput inputType="password" name_id_htmlFor="password" placeholder="Senha..." labelText="Senha" handleLoginInput={handleLoginInput}></MyInput>
                <div className="flex gap-4">
                    <input type="submit" className="my-btn cursor-pointer" value="Login" />
                    <button
                        onClick={() => {
                            setLoginModal(!loginModal);
                        }}
                        className="my-btn "
                    >
                        Sair
                    </button>
                </div>
            </form>
            <a
                onClick={() => {
                    setLoginModal(!loginModal);
                    setRegisterModal(!registerModal);
                }}
                className="text-xs text-info p-2 cursor-pointer underline float-right"
            >
                Não é cadastrado? Cadastre-se aqui!
            </a>
        </div>

    );
};

const RegisterModal: React.FC<TModal> = ({ setRegisterModal, registerModal, setLoginModal, loginModal }) => {
    const [registerInput, setRegisterInput] = React.useState({ name: "", email: "", password: "", confirmPassword: "" });
    const clickOutsiteRef = React.useRef<HTMLElement>(null);
    useOnClickOutside(clickOutsiteRef, () => {
        setRegisterModal(!registerModal);
    });
    const handleRegisterInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const name = e.target.name;
        const value = e.target.value;

        setRegisterInput((previousData) => {
            return { ...previousData, [name]: value };
        });
    };

    const submitRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const check = ValidateRegister(registerInput);
        if (check.valid === false) {
            CreateAlert(check.message, "alert-warning");
            return;
        }
        const userData = JSON.stringify(registerInput);
        http.post("/register", userData)
            .then((res) => {
                setRegisterModal(!registerModal)
                CreateAlert("Usuário Cadastrado!", "alert-success");
            })
            .catch((err) => {
                const cleanError = err.response.data.replace("Error:", "");
                CreateAlert(cleanError, "alert-warning");
            });
    };

    return (
        <div
            ref={clickOutsiteRef as React.LegacyRef<HTMLDivElement>}
            className=" relative z-10 top-[15%]  lg:top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit  rounded-xl shadow-xl bg-white"
        >
            <form onSubmit={submitRegister} className="flex flex-col p-10 sm:w-96">
                <h1>Cadastro</h1>

                <MyInput name_id_htmlFor="name" inputType="text" placeholder="Seu Nome..." labelText="Nome" handleRegisterInput={handleRegisterInput}></MyInput>
                <MyInput name_id_htmlFor="email" inputType="email" placeholder="Digite seu email..." labelText="Email" handleRegisterInput={handleRegisterInput}></MyInput>
                <MyInput name_id_htmlFor="password" inputType="password" placeholder="Sua senha..." labelText="Senha" handleRegisterInput={handleRegisterInput}></MyInput>
                <MyInput name_id_htmlFor="confirmPassword" inputType="password" placeholder="Repita a senha..." labelText="Confirme sua senha" handleRegisterInput={handleRegisterInput}></MyInput>

                <div className="flex gap-4 py-2 self-start">
                    <input className="my-btn cursor-pointer" type="submit" value="Cadastrar" />
                    <button
                        onClick={() => {
                            setRegisterModal(!registerModal);
                            setLoginModal(!loginModal);
                        }}
                        className="my-btn"
                    >
                        Voltar
                    </button>
                </div>
            </form>
        </div>
    );
};
