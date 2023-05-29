export type TModal = {
    loginModal: boolean;
    setLoginModal: (val: boolean) => void;
    registerModal:boolean,
    setRegisterModal:(val:boolean) => void
};

export type TLoggedIn = {
    loggedIn:boolean,
    setLogin:(val:boolean) => void
    
}

export type TFilter = {
        productFilter:string,
        setProductFilter:(val:string) => void
    }

export type TCartStorage = {
    cartStorage?:string[],
    setCartStorage:(val:string[]) =>void

}
