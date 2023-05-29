import React, { ChangeEventHandler, FormEvent } from "react";
import { currencyFormatter } from "../components/products_service/currencyFormatter";
import http from "../services/axios";
import { CreateAlert } from "../components/AlertModal";

export const CreateProducts = () => {
    const [productInputState, setProductInputState] = React.useState({ product_name: "", product_price: "", product_description: "", product_photo: "" })


    const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProductInputState({ ...productInputState, [ev.target.name]: ev.target.value })
    }


    const submitChange = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        http.post('/add_product', productInputState)
            .then(res => {
                CreateAlert(res.data.msg, "alert-warning")
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="flex flex-col shrink-0 gap-3 border-2 bg-slate-200 shadow-2xl h-full sm:h-[66%] p-10 rounded-lg">
                <form onSubmit={submitChange} className="flex flex-col h-full">
                    <div className="flex flex-col sm:flex-row gap-10 basis-10/12">
                        <div className="flex flex-col gap-2">

                            <label htmlFor="product_name">Nome do Produto</label>
                            <input onChange={handleChange} id="product_name" name="product_name" type="text" className="input input-secondary" maxLength={24} />

                            <label htmlFor="product_price">Preço</label>
                            <input id="product_price" name="product_price" value={productInputState.product_price} type="text" maxLength={12} className="input input-secondary" onChange={(ev) => { handleChange(currencyFormatter(ev)) }} />

                            <label htmlFor="product_description">Descrição</label>

                            <textarea onChange={handleChange} id="product_description" name="product_description" maxLength={50} className="textarea textarea-secondary h-[40%]  " />
                        </div>

                        <div className="flex flex-col h-96  m-2 gap-4 p-1">
                            <img id="tela" className="w-[300px] border-2 border-neutral  p-1" src={productInputState.product_photo || "/product_placeholder.svg"} />
                            <div className="flex gap-4 items-center">
                                <label htmlFor="product_photo">URL</label>
                                <input onChange={handleChange} type="text" name="product_photo" id="product_photo" accept="image/*" className="input input-secondary" />
                            </div>

                        </div>
                    </div>

                    <div className="flex gap-4 justify-center m-4 justify-self-end ">
                        <label htmlFor="submit">
                        </label>
                        <input value="Adicionar" type="submit" id="submit" name="submit" className="btn btn-accent basis-1/3" />
                        <a href="/" className="btn btn-warning basis-1/3">
                            Voltar
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};
