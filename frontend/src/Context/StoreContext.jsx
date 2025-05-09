import { createContext, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
    const [sellerid,setSellerid] = useState("")
    const [sellerdetails,setSellerdetails] = useState([])

    const contextValue = {
        sellerdetails,setSellerdetails,
        sellerid,setSellerid
    }
    return (
        <StoreContext.Provider value={contextValue} >
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider