import React from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { useEffect } from 'react'

export const adminDataContext = createContext()

function AdminContext({ children }) {
    let [adminData, setAdminData] = useState(null)
    let { serverUrl } = useContext(authDataContext)

    const getAdmin = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/admin/dashboard",
                { withCredentials: true }
            )

            setAdminData(result.data)
            console.log(result.data);

        } catch (error) {
            setAdminData(null)
            console.log(error);

        }
    }

    useEffect(() => {
        getAdmin()
    },[])
   let value = {
    adminData,
    setAdminData,
    getAdmin,
    serverUrl
}
    return (
        <div>
            <adminDataContext.Provider value={value}>
                {children}
            </adminDataContext.Provider>

        </div>
    )
}

export default AdminContext
