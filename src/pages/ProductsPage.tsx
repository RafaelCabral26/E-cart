import React, { useState } from "react";
import { CreateAlert } from "../components/AlertModal";
import useLocalStorage from "../components/StorageHandler";
import http from "../services/axios";
import { TCartStorage, TFilter, TLoggedIn } from "../types/ModalTypes";

type TProduct = {
    _id?: string,
    product_name: string,
    product_price: string,
    product_description: string,
    product_photo: string,
}


export function ProductsPage({ productFilter, loggedIn, cartStorage, setCartStorage }: TFilter & TLoggedIn & TCartStorage) {
    const [productList, setProductList] = React.useState<TProduct[]>([]);
    const [confirmPurchaseModal, setConfirmPurchaseModal] = React.useState<{ show: boolean, product: {} }>({ show: false, product: {} })
    const [serverState, setServerState] = useState<string>('fixed')
    React.useEffect(() => {
        http.get("/list_products")
            .then(res => {
                setProductList(res.data.products);
                setServerState("hidden");
            }).catch(err => {
                setServerState("fixed");
                CreateAlert(err.response.data.msg, "alert-warning");
            })
    }, [])



    return (
        <div className="relative flex flex-wrap justify-center items-center xl:container m-auto  mt-10 md:mt-28 gap-4 ">
            <div className={`rounded-lg  ${serverState} m-auto top-52 border-2 shadow-lg py-4 px-8`} >
                Espere 5 segundos e recarregue a página para ativar o servidor
            </div>
            {
                productList.filter(val => {
                    if (productFilter === "") {
                        return val
                    } else if (
                        val.product_name.toLowerCase().includes(productFilter.toLowerCase()) || val.product_description.toLowerCase().includes(productFilter.toLowerCase())
                    ) {

                        return val
                    }
                }).map((e: any) => (
                    <ProductsCard key={e.product_name} name={e.product_name} price={e.product_price} description={e.product_description} photo={e.product_photo} setConfirmPurchaseModal={setConfirmPurchaseModal}></ProductsCard>
                ))
            }
            {confirmPurchaseModal.show ?
                <ConfirmPurchaseWindow cartStorage={cartStorage} setCartStorage={setCartStorage} product={confirmPurchaseModal.product} setConfirmPurchaseModal={setConfirmPurchaseModal} loggedIn={loggedIn}></ConfirmPurchaseWindow> :
                null
            }
        </div>
    );
}

const ProductsCard = ({ name, price, description, photo, setConfirmPurchaseModal }: { name: string, price: string, description: string, photo: string, setConfirmPurchaseModal: any }) => {

    const handleConfirmation = () => {
        setConfirmPurchaseModal({ show: true, product: { name: name, price: price, description: description, photo: photo } })

    }
    return (
        <div onClick={handleConfirmation} className="flex flex-col sm:px-4 sm:py-2 m-auto bg-white rounded-lg shadow-md  basis-[44%]  lg:basis-1/5 cursor-pointer hover:scale-105  ">
            <div className=" m-auto ">
                <img src={photo} />
            </div>
            <div className="text-start px-[3px]">
                <h1 className="">{name}</h1>
                <span>{description}</span>
            </div>
            <div className="p-1 sm:p-2 self-end ">
                <button className="my-btn">
                    R$ <span className="text-neutral">
                        {price}
                    </span>
                </button>

            </div>
        </div>

    );
}

const ConfirmPurchaseWindow = ({ product, setConfirmPurchaseModal, loggedIn, cartStorage, setCartStorage }: any) => {


    const closePurchaseWindow = () => {
        return setConfirmPurchaseModal({ show: false, products: {} })
    }


    const addToCart = () => {

        const repeatedProduct = cartStorage.some((e: any) => {
            if (e.name === product.name) {
                return true
            }
            return false
        })

        if (!repeatedProduct) {
            const productArray = cartStorage
            productArray.push(product)
            setCartStorage(productArray)
            closePurchaseWindow()
            return CreateAlert("Item adicionado no carrinho", "alert-success")

        }
        closePurchaseWindow()
        return CreateAlert("Produto já está no carrinho", "alert-warning")
    }
    return (
        <div onBlur={closePurchaseWindow} className="card bg-white fixed top-[40%]" >
            <div className="card-body gap-4 shadow-lg bg-slate-100 rounded-lg" >
                <div className="card-title">
                    Adicionar <span className="font-extrabold text-neutral"> {product.name}</span> no carrinho?
                </div>
                <div className="flex gap-4 justify-center" autoFocus >
                    <button onClick={addToCart} className="btn btn-accent" autoFocus>Adicionar</button>
                    <button className="btn btn-warning">Voltar</button>
                </div>
                {!loggedIn ? <span>Faça login para não perder seu carrinho!</span> : null}
            </div>
        </div>

    )
}
