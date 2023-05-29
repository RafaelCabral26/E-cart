import * as React from "react";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { ProductsPage } from "./pages/ProductsPage";
import { LoginWindow } from "./components/login_register/LoginWindow";
import { TLoggedIn, TModal, TFilter } from "./types/ModalTypes";
import http from "./services/axios";
import useLocalStorage from "./components/StorageHandler";
export const UserContext = React.createContext<TModal & TLoggedIn & TFilter | null>(null)


export const App: React.FC = () => {
    const [loginModal, setLoginModal] = React.useState<boolean>(false);
    const [registerModal, setRegisterModal] = React.useState<boolean>(false)
    const [loggedIn, setLogin] = React.useState(false);
    const [productFilter, setProductFilter] = React.useState("");
    const [cartStorage, setCartStorage] = useLocalStorage("cart",[])
    React.useEffect(() => {
        http.post("/check_user", cartStorage)
            .then((res) => {
                setLogin(res.data.loggedIn)
                if (res.data.cart) setCartStorage(res.data.cart)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="bg-gray-100">
            <UserContext.Provider value={{ loginModal, setLoginModal, registerModal, setRegisterModal, loggedIn, setLogin, productFilter, setProductFilter }}>
                <Navbar productFilter={productFilter} setProductFilter={setProductFilter} cartStorage={cartStorage} setCartStorage={setCartStorage}></Navbar>
                <div className="relative">
                    <ProductsPage cartStorage={cartStorage} setCartStorage={setCartStorage} productFilter={productFilter} setProductFilter={setProductFilter} loggedIn={loggedIn} setLogin={setLogin}></ProductsPage>
                    <LoginWindow></LoginWindow>
                </div>
                <div id="alert-container" className="absolute top-20 right-2 h-16 w-[80%] sm:w-96">

                </div>
            </UserContext.Provider>
        </div>
    );
};


