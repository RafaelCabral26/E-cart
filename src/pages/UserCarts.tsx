import { useEffect, useState } from "react"
import { currencyFormatter, currencyUnformat } from "../components/products_service/currencyFormatter"
import { Link } from "react-router-dom"
import useLocalStorage from "../components/StorageHandler"
import http from "../services/axios"
import { CreateAlert } from "../components/AlertModal"

export const UserCart = () => {
    const [storageProducts, setStorageProducts] = useLocalStorage("cart", [])
    const [totalCartPrice, setTotalCartPrice] = useState<number>()
    const [finishPurchase, setFinishPurchase] = useState<boolean>(false)
    const handleStorage: any = () => {
        let totalPrice: number = 0
        let checkStorage = localStorage.getItem("cart")
        let storage = checkStorage ? JSON.parse(checkStorage) : []
        storage.forEach((e: any) => {
            let price = currencyUnformat(e.price)
            totalPrice += price * Number(e.quantity)

        })
        totalPrice
        setTotalCartPrice(totalPrice)

    }
    
    useEffect(() => {
        handleStorage()
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, []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)

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 ">
            <VisualNavbar/>
            <div className="flex  flex-col items-center container h-[75%] bg-white ">
                <div className="flex flex-col items-center overflow-y-scroll  w-full">
                    {storageProducts.length === 0 ? <h1 className="m-auto">Carrinho Vazio...</h1> :
                        storageProducts.map((e: any) => {
                            return <ProductCard product={e} key={e.name} storageProducts={storageProducts} setStorageProducts={setStorageProducts}></ProductCard>
                        })
                    }
                </div>
                <div className="m-10" >
                    <div className="flex gap-4">
                        <button onClick={() => {setFinishPurchase(true)}}className="btn btn-accent">Finalizar Compra</button>
                        <Link to="/" className="btn btn-warning">Voltar</Link>
                    </div>
                    <span>Preço Final: R$ {currencyFormatter(String(totalCartPrice))}</span>
                </div>
            </div>
            {finishPurchase &&
                <div className="fixed w-52 lg:w-[23%] h-52 lg:h-[23%] bg-slate-200 drop-shadow-lg border-4  flex flex-col justify-between p-10 gap-4 transform -translate-52 ">
                    Funcionalidade ainda não foi implementada...
                    <button onClick={() => {setFinishPurchase(false)}} className="btn btn-accent">Fechar</button>
                </div>
            }
        </div>

    )
}

const ProductCard = ({ product, storageProducts, setStorageProducts }: any) => {
    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        const storage = JSON.parse(localStorage.cart)
        storage.forEach((e: any) => {
            if (product.name === e.name) e.quantity = quantity

        })

        localStorage.setItem("cart", JSON.stringify(storage))
    }, [quantity])
    const price = currencyUnformat(product.price)
    const total = price * quantity
    const outputPrice = currencyFormatter(String(total))

    const increment = async () => {
        if (quantity < 10) await setQuantity(quantity + 1)
        window.dispatchEvent(new Event('storage'))
    }
    const decrement = async () => {
        if (quantity > 1) await setQuantity(quantity - 1)
        window.dispatchEvent(new Event('storage'))
    }
    const handleDelete = () => {
        const filteredProducts = storageProducts.filter((e: any) => {
            return e.name !== product.name

        })
        http.post("/delete_product", product)
            .then((req) => {
                CreateAlert(req.data, "alert-success")
            })
            .catch((err) => {
                console.log(err);
            })
        setStorageProducts(filteredProducts)
        window.location.reload
    }
    return (
        <div className="flex justify-evenly items-center w-[90%] xl:w-[66%] py-4  border-b-2 border-slate-300 ">
            <div className="flex flex-col sm:flex-row items-center ">
                <h1 className="w-12 self-start sm:w-32">{product.name}</h1>
                <img src={product.photo} className="w-32 sm:w-52" />
            </div>
            <div className="w-22">{product.price}</div>
            <div className="flex flex-col">

                <div className="flex">
                    <button onClick={increment} className="btn btn-sm">+</button>
                    <input value={quantity} className="appearance-none  w-10 text-center" type="text" readOnly />
                    <button onClick={decrement} className="btn btn-sm">-</button>
                </div>
                <div className="flex  gap-4 " >
                    <span className="sm:w-32">Total: R$ {outputPrice}</span>
                </div>
            </div>
            <button onClick={handleDelete} className="self-end w-6">
                <svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>Deletar</title><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.016 8q0 0.832 0.576 1.44t1.408 0.576v16q0 2.496 1.76 4.224t4.256 1.76h12q2.464 0 4.224-1.76t1.76-4.224v-16q0.832 0 1.408-0.576t0.608-1.44-0.608-1.408-1.408-0.576h-5.984q0-2.496-1.76-4.256t-4.256-1.76-4.256 1.76-1.728 4.256h-6.016q-0.832 0-1.408 0.576t-0.576 1.408zM8 26.016v-16h16v16q0 0.832-0.576 1.408t-1.408 0.576h-12q-0.832 0-1.44-0.576t-0.576-1.408zM10.016 26.016h1.984v-14.016h-1.984v14.016zM14.016 26.016h4v-14.016h-4v14.016zM14.016 6.016q0-0.832 0.576-1.408t1.408-0.608 1.408 0.608 0.608 1.408h-4zM20 26.016h2.016v-14.016h-2.016v14.016z"></path> </g></svg>
            </button>
        </div>
    )
}


const VisualNavbar = () => {

    return (
(
        <div className="bg-neutral fixed top-0 w-full">
            <div className="text-white flex justify-between p-4 items-center   md:container m-auto ">
                <a href="/" className="text-russo text-2xl underline decoration-accent ">E-Cart</a>
            </div>
        </div>
    )

    )
}
