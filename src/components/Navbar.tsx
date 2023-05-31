import React, { useEffect, useState } from "react";
import { TLoggedIn, TModal, TFilter, TCartStorage } from "../types/ModalTypes";
import { UserContext } from "../App";
import http from "../services/axios";
import { CartSvg } from "../svgs/cart";


export const Navbar = ({ productFilter, setProductFilter, cartStorage, setCartStorage }: TFilter & TCartStorage) => {
    const loginRegisterProps = React.useContext<TLoggedIn & TModal & TFilter | null>(UserContext);
    if (!loginRegisterProps) return null;
    const { loginModal, setLoginModal, registerModal, setRegisterModal, } = loginRegisterProps;

    return (
        <div className="bg-neutral">
            <div className="text-white flex justify-between p-4 items-center   md:container m-auto ">
                <a href="#" className="text-russo text-2xl underline decoration-accent ">E-Cart</a>
                <div className="flex gap-4">
                    <div className="">
                        <input onChange={e => { setProductFilter(e.target.value) }} type="search" placeholder="Pesquisar item..." className="rounded self-center outline-none text-neutral h-full p-2  md:w-96 "></input>
                    </div>
                    <div>
                        <Cart cartStorage={cartStorage} setCartStorage={setCartStorage} setLoginModal={setLoginModal} loginModal={loginModal} registerModal={registerModal} setRegisterModal={setRegisterModal}></Cart>
                    </div>
                </div>

            </div>
        </div>
    );
};

const Cart: React.FC<TModal & TCartStorage> = ({ setLoginModal, loginModal, setRegisterModal, registerModal, cartStorage, setCartStorage }) => {
    const TModal = React.useContext(UserContext);
    const [cartNumber, setCartNumber] = useState<number>()
    const handleLogout = () => {
        http.post("/logout")
            .then(res => {
                window.location.reload();

            })
            .catch(err => {
                console.log(err)
            })

    }
    const handleCartNumber = () => {
        if (cartStorage !== undefined) {
            setCartNumber(cartStorage.length)
            return
        }
        setCartNumber(0)

    }
    useEffect(() => {
        setCartNumber(cartStorage?.length)
        window.addEventListener("storage", handleCartNumber)
        return () => window.removeEventListener("storage", handleCartNumber)

    }, [cartStorage])

    return (
        <div className="dropdown dropdown-end text-neutral cursor-pointer indicator">
            <span className="indicator-item indicator-start badge badge-secondary p-1">{cartNumber}</span>
           <CartSvg/> 
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52">
                <li>
                    <a href="/user_cart">Meu Carrinho</a>
                </li>
                {TModal?.loggedIn ? (
                    <li>
                        <button onClick={handleLogout}>Sair</button>
                    </li>
                ) : (
                    <li>
                        <button onClick={() => {
                            setLoginModal(!loginModal);
                            setRegisterModal(false);
                        }}
                        >
                            Login
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
};

