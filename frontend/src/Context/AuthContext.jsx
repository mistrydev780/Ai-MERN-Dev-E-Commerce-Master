import React, { createContext } from 'react'

export const authDataContext = createContext()

function AuthContextProvider({ children }) {
    const serverUrl = "https://ai-mern-dev-e-commerce-master.onrender.com"

    const value = {
        serverUrl
    }

    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContextProvider
