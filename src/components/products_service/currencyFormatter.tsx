

export const currencyFormatter = (ev:any) => {
    let price = ev;
    if (ev.target) {
        price = ev.target.value
        price = price.replace(/\D/g, "");
        price = price.replace(/(\d)(\d{2})$/, "$1. $2");
        price = price.replace(/(?=(\d{3})+(\D))\B/g, ",");
        ev.target.value = price;
        return ev
    }

    price = price.replace(/\D/g, "");
    price = price.replace(/(\d)(\d{2})$/, "$1. $2");
    price = price.replace(/(?=(\d{3})+(\D))\B/g, ",");
    return price 
};

export const currencyUnformat = (price:string) => {
    const unformattedPrice = Number(price.replace(/(.)( )/g, ""))
    return unformattedPrice
}
