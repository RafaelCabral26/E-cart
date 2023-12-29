import React from 'react';
import ReactDOM from 'react-dom'

import { createRoot, hydrateRoot } from 'react-dom/client';


export const AlertModal = ({message, type}:{message:string, type:string}) => {
function AddToCart() {

    return (
        <button>
            
        </button>
    )
}
  const ref = React.useRef(null)
        return (
            <div ref={ref} className={`alert ${type} fixed right-10 top-10 w-[80%] sm:w-96`}>
                <div>{message}</div>
            </div>
        );
};

export const CreateAlert = (message:string,type:"alert-success" | "alert-warning") => {
    let div = document.getElementById("alert-container") as Element
    
    if(!div) {
        div = document.createElement('div');
        div.setAttribute('id', "alert-container");
        div.classList.add("fixed", "top-20", "right-2", "h-16", "w-full", "w-[80%]", "sm:w-96");
        document.body.appendChild(div);
        
    }
    if (div.hasChildNodes()) {
    return hydrateRoot(div,<AlertModal message={message} type={type}/>);
    }
    const container = createRoot(div)
    container.render(<AlertModal message={message} type={type}/>)
    setTimeout(() => {
        container.unmount()
    }, 1500)
};

