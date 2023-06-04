import { useEffect, useState } from "react"
import { currencyFormatter, currencyUnformat } from "../components/products_service/currencyFormatter"
import { Link } from "react-router-dom"
import useLocalStorage from "../components/StorageHandler"
import http from "../services/axios"
import { CreateAlert } from "../components/AlertModal"
import { TrashSvg } from "../svgs/trash"

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
    }, [])

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 ">
            <VisualNavbar />
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
                        {storageProducts.length > 0 &&<button onClick={() => { setFinishPurchase(true) }} className="btn btn-accent">Finalizar Compra</button>
                        }
                        <Link to="/" className="btn btn-warning">Voltar</Link>
                    </div>
                    <span>Preço Final: R$ {currencyFormatter(String(totalCartPrice))}</span>
                </div>
            </div>
            {finishPurchase &&
                <div className="fixed w-52 lg:w-[23%] h-52 lg:h-[23%] bg-slate-200 drop-shadow-lg border-4  flex flex-col justify-between p-10 gap-4 transform -translate-52 ">
                    Funcionalidade ainda não foi implementada...
                    <button onClick={() => { setFinishPurchase(false) }} className="btn btn-accent">Fechar</button>
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
                <TrashSvg />
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
