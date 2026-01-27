import React,{createContext, useContext, useState, useMemo} from "react";

export interface AppContextType{
    data: string,
    setData: ()=> void,
}

export const AppContext = createContext(undefined);


export const useAppContext = ()=>{
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppContextProvider");
    }
  return context;
}

export const AppContextProvider = ({children}:{children : React.ReactNode})=>{
    const [totalSale, setTotalSale] = useState();
    

    const value = useMemo(()=>({
        totalSale,
        setTotalSale
    }),[totalSale, setTotalSale])

     return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
