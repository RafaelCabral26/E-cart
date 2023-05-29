import React, { useEffect, useState } from "react";
import { TLoggedIn, TModal, TFilter, TCartStorage } from "../types/ModalTypes";
import { UserContext } from "../App";
import http from "../services/axios";


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
                console.log(res)
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
            <svg tabIndex={0} className="cart w-8 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 2C1.44772 2 1 2.44772 1 3C1 3.55228 1.44772 4 2 4H2.47241C2.92336 4 3.31852 4.30182 3.43717 4.73688L3.85342 6.26312L6 14.1339V16C6 16.6935 6.23533 17.3321 6.63048 17.8402C6.23824 18.2816 6 18.863 6 19.5C6 20.8807 7.11929 22 8.5 22C9.88071 22 11 20.8807 11 19.5C11 19.3288 10.9828 19.1616 10.95 19H14.05C14.0172 19.1616 14 19.3288 14 19.5C14 20.8807 15.1193 22 16.5 22C17.8807 22 19 20.8807 19 19.5C19 19.1715 18.9366 18.8578 18.8215 18.5704C18.934 18.4086 19 18.212 19 18C19 17.4477 18.5523 17 18 17H16.5H9C8.44772 17 8 16.5523 8 16V15H18.236C19.1381 15 19.9285 14.3962 20.1657 13.5258L21.8007 7.52583C22.1473 6.25364 21.1896 5 19.871 5H5.58198L5.3667 4.21065C5.01074 2.90547 3.82526 2 2.47241 2H2ZM16.5 19C16.2239 19 16 19.2239 16 19.5C16 19.7761 16.2239 20 16.5 20C16.7761 20 17 19.7761 17 19.5C17 19.2239 16.7761 19 16.5 19ZM18.236 13H7.7638L6.12743 7H19.871L18.236 13ZM8.5 19C8.22386 19 8 19.2239 8 19.5C8 19.7761 8.22386 20 8.5 20C8.77614 20 9 19.7761 9 19.5C9 19.2239 8.77614 19 8.5 19Z"
                    fill="#ffffff"
                ></path>
            </svg>

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
